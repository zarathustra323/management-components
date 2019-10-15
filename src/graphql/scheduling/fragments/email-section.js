import gql from 'graphql-tag';
import newsletterFragment from './email-newsletter';

export default gql`

fragment EmailSectionScheduleList on EmailSection {
  id
  name
  newsletter {
    ...EmailNewsletterScheduleList
  }
}

${newsletterFragment}

`;
