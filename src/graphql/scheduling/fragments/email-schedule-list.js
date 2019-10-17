import gql from 'graphql-tag';
import newsletterFragment from '../../common/fragments/email-newsletter';
import sectionFragment from '../../common/fragments/email-section';

export default gql`

fragment EmailScheduleList on EmailSchedule {
  id
  newsletter {
    ...CommonEmailNewsletter
  }
  section {
    ...CommonEmailSection
  }
  deploymentDate
  sequence
}

${newsletterFragment}
${sectionFragment}

`;
