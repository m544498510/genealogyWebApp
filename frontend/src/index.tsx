import * as React from 'react';
import {render} from 'react-dom';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {ApolloProvider} from 'react-apollo';
import Test from './test';
import InputPanel from './Input';
import './test.css';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

render(
  (
    <ApolloProvider client={client}>
      <div>
        <Test/>
        <InputPanel />
      </div>
    </ApolloProvider>
  ),
  document.getElementById('root')
);
