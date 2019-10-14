import gql from 'graphql-tag';

export default gql`

mutation CreateMagazineSchedule($input: CreateMagazineScheduleMutationInput!) {
  createMagazineSchedule(input: $input) {
    id
  }
}

`;
