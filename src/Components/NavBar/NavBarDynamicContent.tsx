import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { NavBarItemLink } from "Components/NavBar/NavBarItem"
import { NavBarDropdownPanelServer } from "Components/NavBar/NavBarDropdownPanelServer"
import type { buildAppRoutesQuery } from "__generated__/buildAppRoutesQuery.graphql"

interface NavBarDynamicContentProps {
  navigationData?: buildAppRoutesQuery["response"] | null
  onMenuEnter?: () => void
  handleClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  shouldTransition?: boolean
}

const Placeholder: React.FC = () => {
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

export const NavBarDynamicContent: React.FC<NavBarDynamicContentProps> = ({
  navigationData,
  onMenuEnter,
  handleClick,
  shouldTransition,
}) => {
  // If no navigation data provided (e.g., during hydration or error), show placeholder
  if (!navigationData) {
    return <Placeholder />
  }

  return (
    <>
      {navigationData.whatsNewNavigation && (
        <NavBarDropdownPanelServer
          navigationData={navigationData.whatsNewNavigation}
          featuredLinkData={navigationData.whatsNewFeaturedLink}
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

      {navigationData.artistsNavigation && (
        <NavBarDropdownPanelServer
          navigationData={navigationData.artistsNavigation}
          featuredLinkData={navigationData.artistsFeaturedLink}
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

      {navigationData.artworksNavigation && (
        <NavBarDropdownPanelServer
          navigationData={navigationData.artworksNavigation}
          featuredLinkData={navigationData.artworksFeaturedLink}
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
}
