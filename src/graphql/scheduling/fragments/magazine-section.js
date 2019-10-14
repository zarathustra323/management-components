import gql from 'graphql-tag';

export default gql`

fragment MagazineSectionScheduleList on MagazineSection {
  id
  name
  isGlobal
}

`;
