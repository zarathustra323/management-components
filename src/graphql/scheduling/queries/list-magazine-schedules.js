import gql from 'graphql-tag';
import fragment from '../fragments/magazine-schedule-list';

export default gql`

query ListMagazineSchedules($input: ContentMagazineSchedulesQueryInput!) {
  contentMagazineSchedules(input: $input) {
    totalCount
    edges {
      node {
        ...MagazineScheduleList
      }
    }
  }
}

${fragment}

`;
