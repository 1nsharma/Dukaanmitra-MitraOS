import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Check, Clock, AlertCircle } from 'lucide-react';
import { parseWhatsAppMessage } from '../services/geminiService';
import { ParsedTransaction } from '../types';
import { logTransaction } from '../services/storeService';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  parsed?: ParsedTransaction;
}

export const WhatsAppSimulation: React.FC<{ storeId: string }> = ({ storeId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste! I'm your Munim AI. Send me your daily transactions like 'Sold 2kg sugar for 100' or 'Gave 500 udhaar to Ramesh'.",
      sender: 'bot',
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      status: 'read'
    },
    {
      id: '2',
      text: "Rahul ko 500 ka udhaar diya (Chini aur tel)",
      sender: 'user',
      timestamp: new Date(Date.now() - 3600000 * 1.5),
      status: 'read'
    },
    {
      id: '3',
      text: "Got it! Logged a udhaar of ₹500 for Rahul.",
      sender: 'bot',
      timestamp: new Date(Date.now() - 3600000 * 1.5 + 5000),
      status: 'read'
    },
    {
      id: '4',
      text: "Ajeet ne 1500 diye purana hisaab",
      sender: 'user',
      timestamp: new Date(Date.now() - 3600000 * 1),
      status: 'read'
    },
    {
      id: '5',
      text: "Got it! Logged a payment of ₹1500 for Ajeet. His new balance is updated.",
      sender: 'bot',
      timestamp: new Date(Date.now() - 3600000 * 1 + 6000),
      status: 'read'
    },
    {
      id: '6',
      text: "Bikri 300 (Doodh aur bread)",
      sender: 'user',
      timestamp: new Date(Date.now() - 1800000), // 30 mins ago
      status: 'read'
    },
    {
      id: '7',
      text: "Got it! Logged a sale of ₹300.",
      sender: 'bot',
      timestamp: new Date(Date.now() - 1800000 + 4000),
      status: 'read'
    },
    {
      id: '8',
      text: "Try your turn now! Type a message below 👇",
      sender: 'bot',
      timestamp: new Date(),
      status: 'read'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // AI Parsing
    const parsed = await parseWhatsAppMessage(input);
    setIsTyping(false);

    if (parsed) {
      // Log to Firestore if not demo mode
      try {
        if (storeId !== 'demo-mode') {
          await logTransaction(storeId, parsed);
        } else {
          // Fake delay for demo mode
          await new Promise(r => setTimeout(r, 800));
        }
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Got it! Logged a ${parsed.type} of ₹${parsed.amount}${parsed.customerName ? ` for ${parsed.customerName}` : ''}.`,
          sender: 'bot',
          timestamp: new Date(),
          status: 'read',
          parsed
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error("Error logging transaction:", error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I couldn't log that transaction. Please check your connection.",
          sender: 'bot',
          timestamp: new Date(),
          status: 'read'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } else {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I didn't quite catch that. Could you please rephrase? For example: 'Sold sugar for 50' or 'Received 200 from Rahul'.",
        sender: 'bot',
        timestamp: new Date(),
        status: 'read'
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };



  return (
    <div className="flex flex-col h-full w-full bg-[#e5ddd5] overflow-hidden">
      {/* Header */}
      <div className="bg-[#075e54] p-4 flex items-center gap-3 text-white">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-[#075e54]">
          <Bot size={24} />
        </div>
        <div>
          <h3 className="font-bold">Munim AI (DukaanMitra)</h3>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "max-w-[80%] p-3 rounded-lg shadow-sm relative",
              msg.sender === 'user' 
                ? "bg-[#dcf8c6] ml-auto rounded-tr-none" 
                : "bg-white mr-auto rounded-tl-none"
            )}
          >
            <p className="text-sm text-gray-800">{msg.text}</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] text-gray-500">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {msg.sender === 'user' && (
                <Check size={12} className={cn(msg.status === 'read' ? "text-blue-500" : "text-gray-400")} />
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="bg-white p-3 rounded-lg shadow-sm w-16 flex justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-[#f0f0f0] p-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-white p-2 px-4 rounded-full border-none focus:ring-2 focus:ring-[#075e54] text-sm"
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-[#075e54] text-white rounded-full flex items-center justify-center hover:bg-[#054d44] transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
