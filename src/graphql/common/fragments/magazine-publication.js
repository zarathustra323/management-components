import gql from 'graphql-tag';

export default gql`

fragment CommonMagazinePublication on MagazinePublication {
  id
  name
}

`;
