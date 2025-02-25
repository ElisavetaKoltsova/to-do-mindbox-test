import { render, screen, fireEvent } from '@testing-library/react';
import { TodosList } from './todos-list';

describe('TodosList', () => {
  const mockToggle = jest.fn();
  const todos = [
    { id: 1, text: 'Test Todo 1', completed: false },
    { id: 2, text: 'Test Todo 2', completed: true },
  ];

  it('renders todo list correctly', () => {
    render(<TodosList todos={todos} onToggele={mockToggle} />);
    
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('calls onToggele when checkbox is clicked', () => {
    render(<TodosList todos={todos} onToggele={mockToggle} />);
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it('applies "completed" class to completed todo', () => {
    render(<TodosList todos={todos} onToggele={mockToggle} />);
    
    const completedTodo = screen.getByText('Test Todo 2');
    expect(completedTodo).toHaveClass('completed');
  });
});
