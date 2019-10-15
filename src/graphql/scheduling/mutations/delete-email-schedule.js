import gql from 'graphql-tag';

export default gql`

mutation DeleteEmailSchedule($input: DeleteEmailScheduleMutationInput!) {
  deleteEmailSchedule(input: $input)
}

`;
