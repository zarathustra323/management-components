import gql from 'graphql-tag';

export default gql`

mutation DeleteWebsiteSchedule($input: DeleteWebsiteScheduleMutationInput!) {
  deleteWebsiteSchedule(input: $input)
}

`;
