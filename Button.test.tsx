import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './components/ui/Button';
import React from 'react';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeDefined();
  });

  it('applies variant classes', () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    expect(container.firstChild).toHaveClass('bg-rose-600');
  });
});
