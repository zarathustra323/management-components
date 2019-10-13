import gql from 'graphql-tag';
import fragment from '../fragments/website-schedule-list';

export default gql`

query ListWebsiteSchedules($input: ContentWebsiteSchedulesQueryInput!) {
  contentWebsiteSchedules(input: $input) {
    totalCount
    edges {
      node {
        ...WebsiteScheduleList
      }
    }
  }
}

${fragment}

`;
