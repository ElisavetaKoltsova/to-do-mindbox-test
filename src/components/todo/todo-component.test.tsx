import { render, screen, fireEvent } from '@testing-library/react';
import { TodoComponent } from './todo-component';

describe('TodoComponent', () => {
  it('adds a new todo', () => {
    render(<TodoComponent />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('filters todos by active', () => {
    render(<TodoComponent />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Active Todo' } });
    fireEvent.click(addButton);
    
    const activeButton = screen.getByText('Active');
    fireEvent.click(activeButton);

    expect(screen.getByText('Active Todo')).toBeInTheDocument();
  });

  it('filters todos by completed', () => {
    render(<TodoComponent />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Completed Todo' } });
    fireEvent.click(addButton);

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    
    const completedButton = screen.getByText('Completed');
    fireEvent.click(completedButton);

    expect(screen.getByText('Completed Todo')).toBeInTheDocument();
  });

  it('clears completed todos', () => {
    render(<TodoComponent />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Todo to clear' } });
    fireEvent.click(addButton);
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    
    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);

    expect(screen.queryByText('Todo to clear')).not.toBeInTheDocument();
  });
});
