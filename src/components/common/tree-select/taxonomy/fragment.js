import gql from 'graphql-tag';

export default gql`

fragment TreeSelectTaxonomyNode on Taxonomy {
  id
  name
  fullName
}

`;
