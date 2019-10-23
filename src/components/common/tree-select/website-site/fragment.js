import gql from 'graphql-tag';

export default gql`

fragment TreeSelectWebsiteSiteNode on WebsiteSite {
  id
  title
  name
  shortName
}

`;
