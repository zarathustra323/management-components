import gql from 'graphql-tag';

export default gql`

query LoadMagazineIssueSections($input: MagazineIssueQueryInput!) {
  magazineIssue(input: $input) {
    id
    sections(input: {
      pagination: { limit: 0 },
      sort: { field: name, order: asc },
    }) {
      edges {
        node {
          id
          name
          isGlobal
        }
      }
    }
  }
}

`;
