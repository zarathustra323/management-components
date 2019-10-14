import gql from 'graphql-tag';

export default gql`

fragment MagazinePublicationScheduleList on MagazinePublication {
  id
  name
}

`;
