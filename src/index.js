import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import { Router } from 'react-router'
import { Route } from 'react-router-dom'
import history from './history';

const GRAPHCMS_API = 'https://api-useast.graphcms.com/v1/cjkkctz8c074201dl2fnnstuj/master'



const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <Router history={history}>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker();
