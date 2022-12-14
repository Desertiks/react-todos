import React, {
  useContext, useEffect,
} from 'react';
import { getTodos } from './api/todos';
import { AddTodo } from './components/Auth/AddTodo/AddTodo';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorWindow } from './components/Auth/ErrorWindow/ErrorWindow';
import {
  FilterComponent,
} from './components/Auth/FilterComponent/FilterComponent';
import { TodoList } from './components/Auth/TodoList/TodoList';
import { TodoContext } from './context/TodoContext';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const {
    setFiltredTodos,
    todos,
    setTodos,
    loadError,
    setLoadError,
    setErrorMessage,
    handleFilter,
    filterState,
  } = useContext(TodoContext);

  useEffect(() => {
    if (todos) {
      handleFilter();
    }
  }, [todos, filterState]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        if (user) {
          const todoData = await getTodos(user.id);

          setTodos(todoData);
          setFiltredTodos(todoData);
        }
      } catch (_) {
        setLoadError(true);
        setErrorMessage(Error.get);
      }
    };

    loadTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AddTodo />

        <TodoList />

        {todos.length > 0 && (
          <FilterComponent />
        )}
      </div>
      {loadError && (
        <ErrorWindow />
      )}

    </div>
  );
};
