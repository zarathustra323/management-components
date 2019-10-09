import gql from 'graphql-tag';

export default gql`

query BMCSchedulingSelectWebsiteSections(
  $siteInput: WebsiteSitesQueryInput!,
  $rootSectionInput: WebsiteSiteRootSectionsInput!,
  $childSectionInput: WebsiteSectionChildrenInput!,
) {
  websiteSites(input: $siteInput) {
    edges {
      node {
        id
        title
        name
        shortName
        rootSections(input: $rootSectionInput) {
          edges {
            node {
              id
              name
              fullName
              children(input: $childSectionInput) {
                edges {
                  node {
                    id
                    name
                    fullName
                    children(input: $childSectionInput) {
                      edges {
                        node {
                          id
                          name
                          fullName
                          children(input: $childSectionInput) {
                            edges {
                              node {
                                id
                                name
                                fullName
                                children(input: $childSectionInput) {
                                  edges {
                                    node {
                                      id
                                      name
                                      fullName
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

`;
