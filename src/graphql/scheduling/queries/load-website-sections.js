import gql from 'graphql-tag';
import siteFragment from '../fragments/website-site';
import sectionFragment from '../fragments/website-section';

export default gql`

query LoadWebsiteSections(
  $siteInput: WebsiteSitesQueryInput!,
  $rootSectionInput: WebsiteSiteRootSectionsInput!,
  $childSectionInput: WebsiteSectionChildrenInput!,
) {
  websiteSites(input: $siteInput) {
    edges {
      node {
        ...WebsiteSiteScheduleList
        rootSections(input: $rootSectionInput) {
          edges {
            node {
              ...WebsiteSectionScheduleList
              children(input: $childSectionInput) {
                edges {
                  node {
                    ...WebsiteSectionScheduleList
                    children(input: $childSectionInput) {
                      edges {
                        node {
                          ...WebsiteSectionScheduleList
                          children(input: $childSectionInput) {
                            edges {
                              node {
                                ...WebsiteSectionScheduleList
                                children(input: $childSectionInput) {
                                  edges {
                                    node {
                                      ...WebsiteSectionScheduleList
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
