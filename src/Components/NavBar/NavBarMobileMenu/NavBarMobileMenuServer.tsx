import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useRouter } from "System/Hooks/useRouter"
import { NavigationGroupsQuery } from "Components/NavBar/Queries/useNavigationGroupsQuery"
import type { useNavigationGroupsQuery } from "__generated__/useNavigationGroupsQuery.graphql"
import { NavBarMobileSubMenuServer } from "./NavBarMobileSubMenuServer"
import { NavBarMobileMenuItemButton } from "./NavBarMobileMenuItem"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"

export const NavBarMobileMenuServer: React.FC = () => {
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
      cacheConfig={{ force: isDraftMode }} // Bypass cache for DRAFT mode
      render={({ props, error }) => {
        if (error) {
          console.error("Error loading navigation data:", error)
        }

        // Show placeholder (simple buttons) until data loads
        if (!props) {
          return (
            <>
              <NavBarMobileMenuItemButton>
                What’s New
                <ChevronRightIcon
                  fill="mono60"
                  height={14}
                  width={14}
                  ml={1}
                  aria-hidden
                />
              </NavBarMobileMenuItemButton>
              <NavBarMobileMenuItemButton>
                Artists
                <ChevronRightIcon
                  fill="mono60"
                  height={14}
                  width={14}
                  ml={1}
                  aria-hidden
                />
              </NavBarMobileMenuItemButton>
              <NavBarMobileMenuItemButton>
                Artworks
                <ChevronRightIcon
                  fill="mono60"
                  height={14}
                  width={14}
                  ml={1}
                  aria-hidden
                />
              </NavBarMobileMenuItemButton>
            </>
          )
        }

        // Show server-driven sub-menus when data is ready
        return (
          <>
            {props.whatsNewNavigation && (
              <NavBarMobileSubMenuServer
                navigationVersion={props.whatsNewNavigation}
                menuType="whatsNew"
              >
                What’s New
              </NavBarMobileSubMenuServer>
            )}

            {props.artistsNavigation && (
              <NavBarMobileSubMenuServer
                navigationVersion={props.artistsNavigation}
                menuType="artists"
              >
                Artists
              </NavBarMobileSubMenuServer>
            )}

            {props.artworksNavigation && (
              <NavBarMobileSubMenuServer
                navigationVersion={props.artworksNavigation}
                menuType="artworks"
              >
                Artworks
              </NavBarMobileSubMenuServer>
            )}
          </>
        )
      }}
    />
  )
}
