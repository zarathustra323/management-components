import gql from 'graphql-tag';
import publicationFragment from './magazine-publication';

export default gql`

fragment CommonMagazineIssue on MagazineIssue {
  id
  name
  publication {
    ...CommonMagazinePublication
  }
}

${publicationFragment}

`;
