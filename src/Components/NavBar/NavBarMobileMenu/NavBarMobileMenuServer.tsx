import { NavBarMobileSubMenuServer } from "./NavBarMobileSubMenuServer"
import { NavBarMobileMenuItemButton } from "./NavBarMobileMenuItem"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import type { buildAppRoutesQuery } from "__generated__/buildAppRoutesQuery.graphql"

const Placeholder: React.FC = () => {
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

export const NavBarMobileMenuServer: React.FC<{
  navigationData?: buildAppRoutesQuery["response"] | null
}> = ({ navigationData }) => {
  if (!navigationData) {
    return <Placeholder />
  }

  return (
    <>
      {navigationData.whatsNewNavigation && (
        <NavBarMobileSubMenuServer
          navigationVersion={navigationData.whatsNewNavigation}
          menuType="whatsNew"
        >
          What’s New
        </NavBarMobileSubMenuServer>
      )}

      {navigationData.artistsNavigation && (
        <NavBarMobileSubMenuServer
          navigationVersion={navigationData.artistsNavigation}
          menuType="artists"
        >
          Artists
        </NavBarMobileSubMenuServer>
      )}

      {navigationData.artworksNavigation && (
        <NavBarMobileSubMenuServer
          navigationVersion={navigationData.artworksNavigation}
          menuType="artworks"
        >
          Artworks
        </NavBarMobileSubMenuServer>
      )}
    </>
  )
}
