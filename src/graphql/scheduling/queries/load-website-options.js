import gql from 'graphql-tag';

export default gql`

query LoadWebsiteOptions($input: WebsiteOptionsQueryInput!) {
  websiteOptions(input: $input) {
    edges {
      node {
        id
        name
      }
    }
  }
}

`;
