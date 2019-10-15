import gql from 'graphql-tag';
import fragment from '../fragments/magazine-schedule-list';

export default gql`

mutation UpdateMagazineSchedule($input: UpdateMagazineScheduleMutationInput!) {
  updateMagazineSchedule(input: $input) {
    ...MagazineScheduleList
  }
}

${fragment}

`;
