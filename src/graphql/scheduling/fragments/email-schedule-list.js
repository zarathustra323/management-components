import gql from 'graphql-tag';
import newsletterFragment from './email-newsletter';
import sectionFragment from './email-section';

export default gql`

fragment EmailScheduleList on EmailSchedule {
  id
  newsletter {
    ...EmailNewsletterScheduleList
  }
  section {
    ...EmailSectionScheduleList
  }
  deploymentDate
}

${newsletterFragment}
${sectionFragment}

`;
