import gql from 'graphql-tag';

export default gql`

mutation UpdateWebsiteSchedule($input: UpdateWebsiteScheduleMutationInput!) {
  updateWebsiteSchedule(input: $input) {
    # @todo make this a common fragment
    id
    site {
      id
      title
      name
      shortName
    }
    section {
      id
      name
      fullName
      # @todo Load the section on edit to get this data.
      hierarchy {
        id
      }
      # @todo Load the section on edit to get this data.
      site {
        id
        title
        name
        shortName
      }
    }
    option {
      id
      name
    }
    startDate
    endDate
  }
}

`;
