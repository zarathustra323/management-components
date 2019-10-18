import gql from 'graphql-tag';

export default gql`

fragment CommonTaxonomy on Taxonomy {
  id
  name
}

`;
