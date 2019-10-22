import gql from 'graphql-tag';

export default gql`

fragment TreeSelectTaxonomyNode on Taxonomy {
  id
  name
  fullName(input: { suppressType: true, suppressId: true })
  hierarchy {
    id
  }
}

`;
