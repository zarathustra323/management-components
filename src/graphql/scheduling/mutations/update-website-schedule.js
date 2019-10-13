import gql from 'graphql-tag';
import fragment from '../fragments/website-schedule-list';

export default gql`

mutation UpdateWebsiteSchedule($input: UpdateWebsiteScheduleMutationInput!) {
  updateWebsiteSchedule(input: $input) {
    ...WebsiteScheduleList
  }
}

${fragment}

`;
