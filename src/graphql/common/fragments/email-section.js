import gql from 'graphql-tag';
import newsletterFragment from './email-newsletter';

export default gql`

fragment CommonEmailSection on EmailSection {
  id
  name
  newsletter {
    ...CommonEmailNewsletter
  }
}

${newsletterFragment}

`;
