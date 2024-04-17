import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ApolloProvider>
);
