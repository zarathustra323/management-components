import gql from 'graphql-tag';

export default gql`

fragment EmailNewsletterScheduleList on EmailNewsletter {
  id
  name
}

`;
