import gql from 'graphql-tag';
import fragment from '../fragments/email-schedule-list';

export default gql`

query ListEmailSchedules($input: ContentEmailSchedulesQueryInput!) {
  contentEmailSchedules(input: $input) {
    totalCount
    edges {
      node {
        ...EmailScheduleList
      }
    }
  }
}

${fragment}

`;
