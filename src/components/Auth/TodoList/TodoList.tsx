import { useContext } from 'react';
import { TodoContext } from '../../../context/TodoContext';
import { LoadingTodo } from '../LoadingTodo/LoadingTodo';
import { TodoRender } from '../TodoRender/TodoRender';

export const TodoList = () => {
  const {
    filtredTodos,
    showLoadingTodo,
  } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filtredTodos.map(todo => (
        <TodoRender
          key={todo.id}
          todo={todo}
        />
      )) }
      {showLoadingTodo && (
        <LoadingTodo />
      )}

    </section>
  );
};
