import gql from 'graphql-tag';

export default gql`

fragment CommonWebsiteSite on WebsiteSite {
  id
  title
  name
  shortName
}

`;
