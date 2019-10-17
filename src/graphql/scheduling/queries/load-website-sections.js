import gql from 'graphql-tag';
import siteFragment from '../../common/fragments/website-site';
import sectionFragment from '../../common/fragments/website-section';

export default gql`

query LoadWebsiteSections(
  $siteInput: WebsiteSitesQueryInput!,
  $rootSectionInput: WebsiteSiteRootSectionsInput!,
  $childSectionInput: WebsiteSectionChildrenInput!,
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
