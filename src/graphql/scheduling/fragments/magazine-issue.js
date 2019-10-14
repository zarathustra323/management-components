import gql from 'graphql-tag';
import publicationFragment from './magazine-publication';

export default gql`

fragment MagazineIssueScheduleList on MagazineIssue {
  id
  name
  publication {
    ...MagazinePublicationScheduleList
  }
}

${publicationFragment}

`;
