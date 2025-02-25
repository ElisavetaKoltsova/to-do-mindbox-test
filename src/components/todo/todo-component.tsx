import { JSX, useState } from 'react';
import { Todo } from '../../types';
import { TodosList } from './todos-list';

export const TodoComponent = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  // Добавление новой задачи
  const handleAddTodoButtonClick = () => {
    if (newTodo.trim()) {
      const newTask: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo('');
    }
  };

  // Обновление статуса выполнения задачи
  const handleTodoCompletionCheckBoxToggle = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Очистка выполненных задач
  const handleClearCompletedButtonClick = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Количество оставшихся задач
  const remainingTasks = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-app">
      <h1>todos</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button onClick={handleAddTodoButtonClick}>Add</button>
      </div>
      <div>
        {TodosList({todos, onToggele: handleTodoCompletionCheckBoxToggle})}
      </div>
      <footer>
        <p>{remainingTasks} todos left</p>
        <div>
          <button>All</button>
          {/* <button onClick={}>Active</button> */}
          <button>Completed</button>
        </div>
        <button onClick={handleClearCompletedButtonClick}>Clear completed</button>
      </footer>
    </div>
  );
};
