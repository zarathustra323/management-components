import gql from 'graphql-tag';
import siteFragment from './website-site';

export default gql`

fragment CommonWebsiteSection on WebsiteSection {
  id
  name
  fullName
  site {
    ...CommonWebsiteSite
  }
}

${siteFragment}

`;
