import gql from 'graphql-tag';

export default gql`

query LoadMagazinePublicationIssues {
  magazinePublications(input: {
    pagination: { limit: 0 },
    sort: { field: name, order: asc },
  }) {
    edges {
      node {
        id
        name
        issues(input: {
          pagination: { limit: 0 },
          sort: { field: mailDate, order: desc },
        }) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
}

`;
