import type { ClickedNavigationDropdownItem } from "@artsy/cohesion"
import type * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { NavBarMenuItemLink } from "./NavBarMenuItem"
import { graphql, useFragment } from "react-relay"
import type { NavBarSubMenuServer_navigationVersion$key } from "__generated__/NavBarSubMenuServer_navigationVersion.graphql"
import type { NavBarMenuItemFeaturedLinkColumn_featuredLinkData$key } from "__generated__/NavBarMenuItemFeaturedLinkColumn_featuredLinkData.graphql"
import { NavBarMenuItemFeaturedLinkColumn } from "./NavBarMenuItemFeaturedLinkColumn"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

interface NavBarSubMenuServerProps {
  navigationVersion: NavBarSubMenuServer_navigationVersion$key
  featuredLinkData?: ReadonlyArray<NavBarMenuItemFeaturedLinkColumn_featuredLinkData$key> | null
  label: string
  menuType: "whatsNew" | "artists" | "artworks"
  contextModule: DeprecatedAnalyticsSchema.ContextModule
  /** Detect any click to possibly close the menu */
  onClick?(): void
  /** Whether the dropdown is currently visible */
  isVisible?: boolean
}

/** Component for full-width sub-menus (Artworks, Artists, What’s New) - Server-driven version */
export const NavBarSubMenuServer: React.FC<NavBarSubMenuServerProps> = ({
  navigationVersion: navigationVersionProp,
  featuredLinkData,
  label,
  menuType,
  contextModule,
  onClick,
  isVisible,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const navigationVersion = useFragment(
    NAVIGATION_VERSION_FRAGMENT,
    navigationVersionProp,
  )

  if (!navigationVersion?.items) {
    return null
  }

  const isArtistsDropdown = menuType === "artists"

  // Sort sections by position
  const sortedSections = [...navigationVersion.items].sort(
    (a, b) => (a?.position ?? 0) - (b?.position ?? 0),
  )

  // Show featured link if data is available (no extra flag needed for server-driven nav)
  const shouldShowFeaturedLink = featuredLinkData && featuredLinkData.length > 0

  const columnSpan = 3

  // Determine header text for featured link based on menu type
  const featuredLinkHeaderText =
    menuType === "whatsNew"
      ? "What’s Next"
      : menuType === "artists"
        ? "Artists to Discover"
        : "Get Inspired"

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    dropdownGroup?: string,
  ) => {
    const link = event.currentTarget
    const text = link.textContent?.trim() || link.innerText
    const href = link.getAttribute("href") || ""

    trackEvent({
      action: "click",
      flow: "Header",
      // @ts-expect-error - ContextModule types between deprecated and new schema
      context_module: contextModule,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      parent_navigation_item: label,
      dropdown_group: dropdownGroup,
      subject: text || "",
      destination_path: href || "",
    } satisfies ClickedNavigationDropdownItem)

    onClick?.()
  }

  return (
    <Text width="100vw" variant={["xs", "xs", "sm"]} onClick={onClick}>
      <AppContainer>
        <HorizontalPadding>
          <GridColumns
            py={6}
            gridColumnGap={0}
            gridAutoRows={shouldShowFeaturedLink ? "1fr" : "auto"}
          >
            {/* Left outer column: contains nav columns and bottom elements */}
            <Column span={shouldShowFeaturedLink ? 8 : 12}>
              <GridColumns gridColumnGap={0}>
                {sortedSections.map((section, sectionIndex) => {
                  if (!section?.title || !section.children) return null

                  // Sort items within section by position
                  const sortedItems = [...section.children].sort(
                    (a, b) => (a?.position ?? 0) - (b?.position ?? 0),
                  )

                  return (
                    <Column key={sectionIndex} span={columnSpan}>
                      <Text variant="xs" px={2} color="mono60">
                        {section.title}
                      </Text>

                      <Spacer y={1} />

                      {sortedItems.map((item, itemIndex) => {
                        if (!item?.title || !item.href) return null

                        return (
                          <NavBarMenuItemLink
                            key={itemIndex}
                            to={item.href}
                            onClick={e => handleClick(e, section.title)}
                          >
                            {item.title}
                          </NavBarMenuItemLink>
                        )
                      })}
                    </Column>
                  )
                })}

                {/* View All Artists + Browse by Name (Artists dropdown only) */}
                {isArtistsDropdown && (
                  <>
                    <Column span={3}>
                      <NavBarMenuItemLink
                        to="/artists"
                        onClick={e => handleClick(e)}
                      >
                        View All Artists
                      </NavBarMenuItemLink>
                    </Column>
                    <Column span={8}>
                      <Text variant="xs" py={1} px={2} color="mono60">
                        Browse by name
                      </Text>

                      <Text variant="sm" lineHeight="16px" mx={1}>
                        {LETTERS.map(letter => {
                          return (
                            <RouterLink
                              key={letter}
                              to={`/artists/artists-starting-with-${letter.toLowerCase()}`}
                              title={`View artists starting with "${letter}"`}
                              display="inline-block"
                              textDecoration="none"
                              p={1}
                              onClick={e => handleClick(e)}
                            >
                              {letter}
                            </RouterLink>
                          )
                        })}
                      </Text>
                    </Column>
                  </>
                )}

                {/* View All Artworks (Artworks dropdown only) */}
                {menuType === "artworks" && (
                  <Column span={9}>
                    <NavBarMenuItemLink
                      to="/collect"
                      onClick={e => handleClick(e)}
                    >
                      View All Artworks
                    </NavBarMenuItemLink>
                  </Column>
                )}
              </GridColumns>
            </Column>

            {/* Right outer column: visual component */}
            {shouldShowFeaturedLink && (
              <NavBarMenuItemFeaturedLinkColumn
                orderedSet={featuredLinkData[0]}
                contextModule={contextModule}
                label={label}
                headerText={featuredLinkHeaderText}
                isVisible={isVisible}
              />
            )}
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </Text>
  )
}

const NAVIGATION_VERSION_FRAGMENT = graphql`
  fragment NavBarSubMenuServer_navigationVersion on NavigationVersion {
    items {
      title
      position
      children {
        title
        href
        position
      }
    }
  }
`
