import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: "https://tranquil-shore-09537.herokuapp.com/" //'http://localhost:5000'
});

const authLint = setContext(()=>{
  const token = localStorage.getItem('jwtToken');
  console.log(`token ${token}`);
  return{
    headers:{
      Authorization: token ? `Bearer ${token}`: ''
    }
  }
});

const client = new ApolloClient({
  link: authLint.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );


//export default apolloProvider;