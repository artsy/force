import { graphql } from "react-relay"

export const NavigationGroupsQuery = graphql`
  query useNavigationGroupsQuery(
    $requstedVersionState: NavigationVersionState!
  ) {
    whatsNewNavigation: navigationVersion(
      groupID: "whats-new"
      state: $requstedVersionState
    ) {
      ...NavBarSubMenuServer_navigationVersion
      ...NavBarMobileSubMenuServer_navigationVersion
    }

    artistsNavigation: navigationVersion(
      groupID: "artists"
      state: $requstedVersionState
    ) {
      ...NavBarSubMenuServer_navigationVersion
      ...NavBarMobileSubMenuServer_navigationVersion
    }

    artworksNavigation: navigationVersion(
      groupID: "artworks"
      state: $requstedVersionState
    ) {
      ...NavBarSubMenuServer_navigationVersion
      ...NavBarMobileSubMenuServer_navigationVersion
    }

    whatsNewFeaturedLink: orderedSets(key: "nav-visual:whats-new") {
      ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData
    }

    artistsFeaturedLink: orderedSets(key: "nav-visual:artists") {
      ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData
    }

    artworksFeaturedLink: orderedSets(key: "nav-visual:artworks") {
      ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData
    }
  }
`
