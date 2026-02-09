import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useRouter } from "System/Hooks/useRouter"
import { NavBarItemLink } from "Components/NavBar/NavBarItem"
import { NavBarDropdownPanelServer } from "Components/NavBar/NavBarDropdownPanelServer"
import { NavigationGroupsQuery } from "Components/NavBar/Queries/useNavigationGroupsQuery"
import type { useNavigationGroupsQuery } from "__generated__/useNavigationGroupsQuery.graphql"

interface NavBarDynamicContentProps {
  onMenuEnter?: () => void
  handleClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  shouldTransition?: boolean
}

export const NavBarDynamicContent: React.FC<NavBarDynamicContentProps> = ({
  onMenuEnter,
  handleClick,
  shouldTransition,
}) => {
  const { match } = useRouter()

  // Detect DRAFT mode from query parameter
  const isDraftMode = match?.location?.query?.navigationVersion === "draft"
  const versionState = isDraftMode ? "DRAFT" : "LIVE"

  return (
    <SystemQueryRenderer<useNavigationGroupsQuery>
      query={NavigationGroupsQuery}
      variables={{
        requstedVersionState: versionState,
      }}
      fetchPolicy={isDraftMode ? "network-only" : "store-or-network"}
      cacheConfig={{ force: isDraftMode }} // Bypass cache for DRAFT mode
      render={({ props, error }) => {
        if (error) {
          console.error("Error loading navigation data:", error)
        }

        // Show placeholder (simple links) until data loads
        if (!props) {
          return (
            <>
              <NavBarItemLink href="/collection/new-this-week">
                What’s New
              </NavBarItemLink>
              <NavBarItemLink href="/artists">Artists</NavBarItemLink>
              <NavBarItemLink href="/collect">Artworks</NavBarItemLink>
            </>
          )
        }

        return (
          <>
            {props.whatsNewNavigation && (
              <NavBarDropdownPanelServer
                navigationData={props.whatsNewNavigation}
                featuredLinkData={props.whatsNewFeaturedLink}
                label="What's New"
                href="/collection/new-this-week"
                contextModule={
                  DeprecatedAnalyticsSchema.ContextModule.HeaderWhatsNewDropdown
                }
                menuType="whatsNew"
                onMenuEnter={onMenuEnter}
                handleClick={handleClick}
                shouldTransition={shouldTransition}
              />
            )}

            {props.artistsNavigation && (
              <NavBarDropdownPanelServer
                navigationData={props.artistsNavigation}
                featuredLinkData={props.artistsFeaturedLink}
                label="Artists"
                href="/artists"
                contextModule={
                  DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown
                }
                menuType="artists"
                onMenuEnter={onMenuEnter}
                handleClick={handleClick}
                shouldTransition={shouldTransition}
              />
            )}

            {props.artworksNavigation && (
              <NavBarDropdownPanelServer
                navigationData={props.artworksNavigation}
                featuredLinkData={props.artworksFeaturedLink}
                label="Artworks"
                href="/collect"
                contextModule={
                  DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
                }
                menuType="artworks"
                onMenuEnter={onMenuEnter}
                handleClick={handleClick}
                shouldTransition={shouldTransition}
              />
            )}
          </>
        )
      }}
    />
  )
}
