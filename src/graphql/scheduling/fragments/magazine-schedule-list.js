import gql from 'graphql-tag';
import publicationFragment from './magazine-publication';
import issueFragment from './magazine-issue';
import sectionFragment from './magazine-section';

export default gql`

fragment MagazineScheduleList on MagazineSchedule {
  id
  publication {
    ...MagazinePublicationScheduleList
  }
  issue {
    ...MagazineIssueScheduleList
  }
  section {
    ...MagazineSectionScheduleList
  }
}

${publicationFragment}
${issueFragment}
${sectionFragment}

`;
