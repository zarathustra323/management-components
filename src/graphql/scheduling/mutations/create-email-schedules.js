import gql from 'graphql-tag';

export default gql`

mutation CreateEmailSchedules($input: QuickCreateEmailSchedulesMutationInput!) {
  quickCreateEmailSchedules(input: $input) {
    id
  }
}

`;
