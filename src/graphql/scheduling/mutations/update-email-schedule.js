import gql from 'graphql-tag';
import fragment from '../fragments/email-schedule-list';

export default gql`

mutation UpdateEmailSchedule($input: UpdateEmailScheduleMutationInput!) {
  updateEmailSchedule(input: $input) {
    ...EmailScheduleList
  }
}

${fragment}

`;
