import gql from 'graphql-tag';
import publicationFragment from '../../common/fragments/magazine-publication';
import issueFragment from '../../common/fragments/magazine-issue';

export default gql`

query LoadMagazinePublicationIssues {
  magazinePublications(input: {
    pagination: { limit: 0 },
    sort: { field: name, order: asc },
  }) {
    edges {
      node {
        ...CommonMagazinePublication
        issues(input: {
          pagination: { limit: 0 },
          sort: { field: mailDate, order: desc },
        }) {
          edges {
            node {
              ...CommonMagazineIssue
            }
          }
        }
      }
    }
  }
}

${publicationFragment}
${issueFragment}

`;
