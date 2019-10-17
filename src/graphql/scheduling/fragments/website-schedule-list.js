import gql from 'graphql-tag';
import siteFragment from '../../common/fragments/website-site';
import sectionFragment from '../../common/fragments/website-section';
import optionFragment from '../../common/fragments/website-option';

export default gql`

fragment WebsiteScheduleList on WebsiteSchedule {
  id
  site {
    ...CommonWebsiteSite
  }
  section {
    ...CommonWebsiteSection
    hierarchy {
      id
    }
  }
  option {
    ...CommonWebsiteOption
  }
  startDate
  endDate
}

${siteFragment}
${sectionFragment}
${optionFragment}

`;
