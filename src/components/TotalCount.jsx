import { Flex } from '@chakra-ui/react';
import { GET_TODOS } from '../apollo/todos';
import { useQuery } from '@apollo/client';

const TotalCount = () => {
  const { data } = useQuery(GET_TODOS);

  return (
    <Flex justifyContent={'center'} borderTop={'2px'} mt="5">
      {data?.todos && <b>Total todos: {data.todos.length}</b>}
    </Flex>
  );
};

export { TotalCount };
