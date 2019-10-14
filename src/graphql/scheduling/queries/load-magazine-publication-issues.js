import gql from 'graphql-tag';
import publicationFragment from '../fragments/magazine-publication';
import issueFragment from '../fragments/magazine-issue';

export default gql`

query LoadMagazinePublicationIssues {
  magazinePublications(input: {
    pagination: { limit: 0 },
    sort: { field: name, order: asc },
  }) {
    edges {
      node {
        ...MagazinePublicationScheduleList
        issues(input: {
          pagination: { limit: 0 },
          sort: { field: mailDate, order: desc },
        }) {
          edges {
            node {
              ...MagazineIssueScheduleList
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
