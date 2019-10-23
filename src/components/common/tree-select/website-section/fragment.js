import gql from 'graphql-tag';
import siteFragment from '../website-site/fragment';

export default gql`

fragment TreeSelectWebsiteSectionNode on WebsiteSection {
  id
  name
  fullName
  site {
    ...TreeSelectWebsiteSiteNode
  }
}

${siteFragment}

`;
