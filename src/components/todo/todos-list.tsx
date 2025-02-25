import { JSX } from "react";
import { Todo } from "../../types";

type TodosListProps = {
  todos: Todo[];
  onToggele: (id: number) => void;
}

export const TodosList = ({todos, onToggele}: TodosListProps): JSX.Element => {
  return (<ul>
    {todos.map((todo: Todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggele(todo.id)}
              />
              {todo.text}
            </li>
          ))}
  </ul>);
};
