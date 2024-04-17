import { useState } from 'react';
import { Button, FormControl, Input } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { ADD_TODO, GET_TODOS } from '../apollo/todos';

const AddTodo = () => {
  const [text, setText] = useState('');
  const [addTodo, { error }] = useMutation(ADD_TODO, {
    // refetchQueries: [{ query: GET_TODOS }],
    update(cache, { data: { newTodo } }) {
      const { todos } = cache.readQuery({ query: GET_TODOS });

      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: [newTodo, ...todos],
        },
      });
    },
  });

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({ variables: { title: text, completed: false, userId: 123 } });
      setText('');
    }
  };

  const handleKey = (event) => {
    if (event.key === 'Enter') handleAddTodo();
  };

  if (error) {
    return <p>Error...</p>;
  }

  return (
    <FormControl display={'flex'} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  );
};

export { AddTodo };
