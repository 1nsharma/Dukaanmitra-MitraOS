
export interface SystemManifest {
  version: string;
  codename: string;
  lastUpdated: string;
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    ai: string[];
  };
  services: {
    name: string;
    description: string;
    protocol: string;
  }[];
  designSystem: {
    theme: string;
    primaryColors: string[];
    fontFamily: string;
    principles: string[];
  };
  branding: {
    name: string;
    tagline: string;
    voice: string;
  };
}

export interface Customer {
  phone: string;
  name: string;
  storeId: string;
  joinDate: string;
  trialEndDate: string;
  paidStatus: 'Trial' | 'Active' | 'Expired';
  totalLTV: number;
}

export interface Transaction {
  transId: string;
  storeId: string;
  phone: string;
  amount: number;
  items: string;
  date: string;
  customerName: string;
  intent?: 'NEW_BILL' | 'PAYMENT_RECEIVED' | 'SKIP' | 'ADD_ENTRY' | 'RECOVERY_NUDGE';
  runId?: string;
}

export interface ProjectHealthData {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  avgCompletionTime: number; // in hours
  history: { name: string; count: number }[];
}

export interface StrategyMetric {
  feature: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  score: number;
}

export interface SystemLog {
  timestamp: string;
  errorSource: string;
  payloadReceived: string;
  resolution: string;
  severity?: 'LOW' | 'CRITICAL' | 'INFO';
  shardId?: string;
}

export interface AppliedPatch {
  id: string;
  timestamp: string;
  diagnosis: string;
  diff: string;
  impact: string;
  status: 'DEPLOYED' | 'FAILED' | 'REVERTED';
}

export interface ShardHealth {
  id: string;
  region: string;
  load: number;
  latency: number;
  status: 'Healthy' | 'Hot' | 'Warning' | 'Idle';
  color: string;
}

export interface DatabaseConfig {
  sheetId: string;
  webhookUrl: string;
  status: 'CONNECTED' | 'DISCONNECTED';
  lastSync: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot' | 'system';
  text: string;
  isImage?: boolean;
  imageData?: string;
  timestamp: string;
}

export interface OpsHealthSnapshot {
  latency: string;
  throughput: number;
  errorRate: string;
  activeShards: number;
  aiAccuracy: string;
  summary: string;
  cpuLoad?: string;
  memoryUsage?: string;
}

export interface ParsedBill {
  action: 'add_entry' | 'modify_entry' | 'get_summary' | 'add_bulk_entries' | 'clarification_required' | 'marketing_gen' | 'analyze_data';
  customer_name?: string;
  item?: string;
  items?: string;
  quantity?: number;
  unit?: string;
  amount?: number;
  date?: string;
  confidence: number;
  user_message: string;
  next_suggested_actions?: string[];
  intent?: 'NEW_BILL' | 'PAYMENT_RECEIVED' | 'SKIP';
  strategic_intent?: string;
  uncertainty_hypotheses?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  date: string;
  imageUrl?: string;
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type View = 
  | 'landing' 
  | 'superadmin' 
  | 'shop_panel' 
  | 'dashboard' 
  | 'architecture' 
  | 'customers' 
  | 'transactions' 
  | 'logs' 
  | 'simulator' 
  | 'build' 
  | 'deployment' 
  | 'operations' 
  | 'reliability' 
  | 'scaling' 
  | 'platform' 
  | 'founder' 
  | 'sales' 
  | 'assets' 
  | 'recovery' 
  | 'optimization' 
  | 'sheets_db'
  | 'training'
  | 'blog_engine'
  | 'ai_tools'
  | 'customer_portal'
  | 'project_health'
  | 'project_detail'
  | 'product_strategy'
  | 'jan_sunwai';
