import { VStack } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import { Spinner } from '@chakra-ui/react';

import { TodoItem } from './TodoItem';
import { TotalCount } from './TotalCount';
import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from '../apollo/todos';

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [toggleTodo, { error: toggleError }] = useMutation(UPDATE_TODO);
  const [removeTodo, { error: deleteError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo) => todo.__ref !== `Todo:${removeTodo.id}`
            );
          },
        },
      });
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error || toggleError || deleteError) {
    return <p>Error...</p>;
  }

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onToggleTodo={toggleTodo}
            onDelete={removeTodo}
          />
        ))}
      </VStack>
      <TotalCount />
    </>
  );
};

export { TodoList };
