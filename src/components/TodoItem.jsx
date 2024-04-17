import { Checkbox, Text, CloseButton, HStack } from '@chakra-ui/react';

const TodoItem = ({ id, title, completed, onToggleTodo, onDelete }) => {
  return (
    <HStack spacing={3}>
      <Checkbox
        isChecked={completed}
        onChange={() =>
          onToggleTodo({ variables: { id, completed: !completed } })
        }
      />
      <Text>{title}</Text>
      <CloseButton onClick={() => onDelete({ variables: { id } })} />
    </HStack>
  );
};

export { TodoItem };
