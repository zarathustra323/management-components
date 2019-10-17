import gql from 'graphql-tag';
import siteFragment from './website-site';

export default gql`

fragment WebsiteSectionScheduleList on WebsiteSection {
  id
  name
  fullName
  site {
    ...WebsiteSiteScheduleList
  }
}

${siteFragment}

`;
