import gql from 'graphql-tag';
import taxonomyFragment from './fragment';

export default gql`

query TreeSelectTaxonomyChoices(
  $input: TaxonomiesQueryInput!,
) {
  taxonomies(input: $input) {
    edges {
      node {
        ...TreeSelectTaxonomyNode
      }
    }
  }
}

${taxonomyFragment}

`;
