import gql from 'graphql-tag';
import taxonomyFragment from './fragment';

export default gql`

query TreeSelectSelectedTaxonomies(
  $input: TaxonomiesQueryInput!,
) {
  taxonomies(input: $input) {
    edges {
      node {
        ...TreeSelectTaxonomyNode
        hierarchy {
          id
        }
      }
    }
  }
}

${taxonomyFragment}

`;
