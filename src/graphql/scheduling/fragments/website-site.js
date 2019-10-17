import gql from 'graphql-tag';

export default gql`

fragment WebsiteSiteScheduleList on WebsiteSite {
  id
  title
  name
  shortName
}

`;
