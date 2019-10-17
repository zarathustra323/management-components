import gql from 'graphql-tag';
import publicationFragment from '../../common/fragments/magazine-publication';
import issueFragment from '../../common/fragments/magazine-issue';
import sectionFragment from '../../common/fragments/magazine-section';

export default gql`

fragment MagazineScheduleList on MagazineSchedule {
  id
  publication {
    ...CommonMagazinePublication
  }
  issue {
    ...CommonMagazineIssue
  }
  section {
    ...CommonMagazineSection
  }
}

${publicationFragment}
${issueFragment}
${sectionFragment}

`;
