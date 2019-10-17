import gql from 'graphql-tag';

export default gql`

fragment CommonMagazineSection on MagazineSection {
  id
  name
  isGlobal
}

`;
