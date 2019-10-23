import gql from 'graphql-tag';
import sectionFragment from './fragment';

export default gql`

query TreeSelectSelectedWebsiteSections(
  $input: WebsiteSectionsQueryInput!,
) {
  websiteSections(input: $input) {
    edges {
      node {
        ...TreeSelectWebsiteSectionNode
        hierarchy {
          id
        }
      }
    }
  }
}

${sectionFragment}

`;
