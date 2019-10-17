import gql from 'graphql-tag';
import optionFragment from '../../common/fragments/website-option';

export default gql`

query LoadWebsiteOptions($input: WebsiteOptionsQueryInput!) {
  websiteOptions(input: $input) {
    edges {
      node {
        ...CommonWebsiteOption
      }
    }
  }
}

${optionFragment}

`;
