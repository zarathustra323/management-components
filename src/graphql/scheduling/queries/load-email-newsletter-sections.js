import gql from 'graphql-tag';
import newsletterFragment from '../../common/fragments/email-newsletter';
import sectionFragment from '../../common/fragments/email-section';

export default gql`

query LoadEmailNewsletterSections {
  emailNewsletters(input: {
    pagination: { limit: 0 },
    sort: { field: name, order: asc },
  }) {
    edges {
      node {
        ...CommonEmailNewsletter
        sections(input: {
          pagination: { limit: 0 },
          sort: { field: name, order: asc },
        }) {
          edges {
            node {
              ...CommonEmailSection
            }
          }
        }
      }
    }
  }
}

${newsletterFragment}
${sectionFragment}

`;
