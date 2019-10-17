import gql from 'graphql-tag';
import siteFragment from './website-site';
import sectionFragment from './website-section';
import optionFragment from './website-option';

export default gql`

fragment WebsiteScheduleList on WebsiteSchedule {
  id
  site {
    ...WebsiteSiteScheduleList
  }
  section {
    ...WebsiteSectionScheduleList
    hierarchy {
      id
    }
  }
  option {
    ...WebsiteOptionScheduleList
  }
  startDate
  endDate
}

${siteFragment}
${sectionFragment}
${optionFragment}

`;
