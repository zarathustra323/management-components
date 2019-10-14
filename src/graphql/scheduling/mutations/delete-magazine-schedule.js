import gql from 'graphql-tag';

export default gql`

mutation DeleteMagazineSchedule($input: DeleteMagazineScheduleMutationInput!) {
  deleteMagazineSchedule(input: $input)
}

`;
