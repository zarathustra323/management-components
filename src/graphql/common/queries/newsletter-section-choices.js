import gql from 'graphql-tag';
import newsletterFragment from '../fragments/email-newsletter';
import sectionFragment from '../fragments/email-section';

export default gql`

query NewsletterSectionChoices {
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
