import gql from 'graphql-tag';
import taxonomyFragment from '../fragments/taxonomy';

export default gql`

query TaxonomyChoices(
  $input: RootTaxonomiesOfTypeQueryInput!,
  $childrenInput: TaxonomyChildrenInput = { sort: { field: name, order: asc }, pagination: { limit: 0 } },
) {
  rootTaxonomiesOfType(input: $input) {
    edges {
      node {
        ...CommonTaxonomy
        children(input: $childrenInput) {
          edges {
            node {
              ...CommonTaxonomy
              children(input: $childrenInput) {
                edges {
                  node {
                    ...CommonTaxonomy
                    children(input: $childrenInput) {
                      edges {
                        node {
                          ...CommonTaxonomy
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
