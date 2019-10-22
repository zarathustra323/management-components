import gql from 'graphql-tag';
import taxonomyFragment from './fragment';

export default gql`

query TreeSelectTaxonomyChoices(
  $input: TaxonomiesQueryInput!,
  $childrenInput: TaxonomyChildrenInput = { sort: { field: name, order: asc }, pagination: { limit: 0 } },
) {
  taxonomies(input: $input) {
    edges {
      node {
        ...TreeSelectTaxonomyNode
        children(input: $childrenInput) {
          edges {
            node {
              ...TreeSelectTaxonomyNode
              children(input: $childrenInput) {
                edges {
                  node {
                    ...TreeSelectTaxonomyNode
                    children(input: $childrenInput) {
                      edges {
                        node {
                          ...TreeSelectTaxonomyNode
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

${taxonomyFragment}

`;
