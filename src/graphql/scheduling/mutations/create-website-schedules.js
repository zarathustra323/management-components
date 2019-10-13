import gql from 'graphql-tag';

export default gql`

mutation CreateWebsiteSchedules($input: QuickCreateWebsiteSchedulesMutationInput!) {
  quickCreateWebsiteSchedules(input: $input) {
    id
  }
}

`;
