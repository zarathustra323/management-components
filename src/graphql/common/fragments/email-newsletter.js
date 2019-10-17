import gql from 'graphql-tag';

export default gql`

fragment CommonEmailNewsletter on EmailNewsletter {
  id
  name
}

`;
