import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fragmentMatcher from './fragment-matcher';

export default ({ uri, headers }) => new ApolloClient({
  name: 'Management Components',
  link: createHttpLink({ uri, headers }),
  cache: new InMemoryCache({ fragmentMatcher }),
});
