import gql from 'graphql-tag';
import optionFragment from '../fragments/website-option';

export default gql`

query LoadWebsiteOptions($input: WebsiteOptionsQueryInput!) {
  websiteOptions(input: $input) {
    edges {
      node {
        ...WebsiteOptionScheduleList
      }
    }
  }
}

${optionFragment}

`;
