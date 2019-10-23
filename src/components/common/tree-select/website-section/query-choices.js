import gql from 'graphql-tag';
import siteFragment from '../website-site/fragment';
import sectionFragment from './fragment';

export default gql`

query TreeSelectWebsiteSectionChoices(
  $siteInput: WebsiteSitesQueryInput = { sort: { field: name, order: asc }, pagination: { limit: 0 } },
  $rootSectionInput: WebsiteSiteRootSectionsInput = { sort: { field: name, order: asc }, pagination: { limit: 0 } },
  $childSectionInput: WebsiteSectionChildrenInput = { sort: { field: name, order: asc }, pagination: { limit: 0 } },
) {
  websiteSites(input: $siteInput) {
    edges {
      node {
        ...TreeSelectWebsiteSiteNode
        rootSections(input: $rootSectionInput) {
          edges {
            node {
              ...TreeSelectWebsiteSectionNode
              children(input: $childSectionInput) {
                edges {
                  node {
                    ...TreeSelectWebsiteSectionNode
                    children(input: $childSectionInput) {
                      edges {
                        node {
                          ...TreeSelectWebsiteSectionNode
                          children(input: $childSectionInput) {
                            edges {
                              node {
                                ...TreeSelectWebsiteSectionNode
                                children(input: $childSectionInput) {
                                  edges {
                                    node {
                                      ...TreeSelectWebsiteSectionNode
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
