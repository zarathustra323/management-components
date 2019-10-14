import gql from 'graphql-tag';

export default gql`

fragment MagazineScheduleList on MagazineSchedule {
  id
  publication {
    id
    name
  }
  issue {
    id
    name
  }
  section {
    id
    name
  }
}

`;
