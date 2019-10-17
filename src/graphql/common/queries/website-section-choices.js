import gql from 'graphql-tag';
import siteFragment from '../fragments/website-site';
import sectionFragment from '../fragments/website-section';

export default gql`

query WebsiteSectionChoices(
  $siteInput: WebsiteSitesQueryInput = { sort: { field: name, order: asc }, pagination: { limit: 0 } },
  $rootSectionInput: WebsiteSiteRootSectionsInput = { sort: { field: name, order: asc }, pagination: { limit: 0 } },
  $childSectionInput: WebsiteSectionChildrenInput = { sort: { field: name, order: asc }, pagination: { limit: 0 } },
) {
  websiteSites(input: $siteInput) {
    edges {
      node {
        ...CommonWebsiteSite
        rootSections(input: $rootSectionInput) {
          edges {
            node {
              ...CommonWebsiteSection
              children(input: $childSectionInput) {
                edges {
                  node {
                    ...CommonWebsiteSection
                    children(input: $childSectionInput) {
                      edges {
                        node {
                          ...CommonWebsiteSection
                          children(input: $childSectionInput) {
                            edges {
                              node {
                                ...CommonWebsiteSection
                                children(input: $childSectionInput) {
                                  edges {
                                    node {
                                      ...CommonWebsiteSection
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

${siteFragment}
${sectionFragment}

`;
