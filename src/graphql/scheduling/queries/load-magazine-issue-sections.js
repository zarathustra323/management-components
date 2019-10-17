import gql from 'graphql-tag';
import sectionFragment from '../../common/fragments/magazine-section';

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
          ...CommonMagazineSection
        }
      }
    }
  }
}

${sectionFragment}

`;
