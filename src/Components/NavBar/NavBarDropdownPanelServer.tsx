import { ActionType } from "@artsy/cohesion"
import type * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Dropdown } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import { useEffect, useRef } from "react"
import { useTracking } from "react-tracking"
import { NavBarSubMenuServer } from "./Menus/NavBarSubMenuServer"
import { NavBarItemButton, NavBarItemUnfocusableAnchor } from "./NavBarItem"
import type { NavBarSubMenuServer_navigationVersion$key } from "__generated__/NavBarSubMenuServer_navigationVersion.graphql"
import type { NavBarMenuItemFeaturedLinkColumn_featuredLinkData$key } from "__generated__/NavBarMenuItemFeaturedLinkColumn_featuredLinkData.graphql"

interface NavBarDropdownPanelServerProps {
  navigationData: NavBarSubMenuServer_navigationVersion$key
  featuredLinkData?: ReadonlyArray<
    NavBarMenuItemFeaturedLinkColumn_featuredLinkData$key | null | undefined
  > | null
  label: string
  href: string
  contextModule: string
  menuType: "whatsNew" | "artists" | "artworks"
  onMenuEnter?: () => void
  handleClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  shouldTransition?: boolean
}

export const NavBarDropdownPanelServer: React.FC<
  NavBarDropdownPanelServerProps
> = ({
  navigationData,
  featuredLinkData,
  label,
  href,
  contextModule,
  menuType,
  onMenuEnter,
  handleClick,
  shouldTransition,
}) => {
  const { prefetch } = usePrefetchRoute()
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  // Filter out null/undefined from featured link data
  const validFeaturedLinkData = featuredLinkData?.filter(
    (item): item is NavBarMenuItemFeaturedLinkColumn_featuredLinkData$key =>
      item != null,
  )

  return (
    <Dropdown
      zIndex={Z.navDropdown}
      keepInDOM
      placement="bottom"
      offset={0}
      delay={shouldTransition ? 100 : 0}
      transition={shouldTransition}
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdown={({ setVisible, visible }) => {
        return (
          <NavBarSubMenuServer
            navigationVersion={navigationData}
            featuredLinkData={validFeaturedLinkData}
            label={label}
            menuType={menuType}
            contextModule={
              contextModule as DeprecatedAnalyticsSchema.ContextModule
            }
            onClick={() => setVisible(false)}
            isVisible={visible}
          />
        )
      }}
    >
      {({ anchorRef, anchorProps, visible, setVisible }) => {
        const { onMouseEnter, ...restAnchorProps } = anchorProps
        const hasTrackedRef = useRef(false)
        const timeoutRef = useRef<NodeJS.Timeout | null>(null)

        // Track when dropdown becomes visible (once per page load, with 500ms delay)
        // biome-ignore lint/correctness/useExhaustiveDependencies: only track once per page load based on visibility
        useEffect(() => {
          if (visible && !hasTrackedRef.current) {
            // Only fire if dropdown stays open for at least 500ms
            timeoutRef.current = setTimeout(() => {
              trackEvent({
                action: ActionType.navigationDropdownViewed,
                context_module: "header" as any,
                context_page_owner_type: contextPageOwnerType!,
                context_page_owner_id: contextPageOwnerId,
                context_page_owner_slug: contextPageOwnerSlug,
                navigation_item: label,
                level: 0,
                interaction_type: "hover",
              })
              hasTrackedRef.current = true
            }, 500)
          } else if (!visible && timeoutRef.current) {
            // Cancel tracking if dropdown closes before delay
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }

          return () => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
          }
        }, [visible])

        return (
          <NavBarItemButton
            ref={anchorRef as any}
            active={visible}
            onMouseEnter={e => {
              onMouseEnter?.(e)
              onMenuEnter?.()
            }}
            {...restAnchorProps}
          >
            <NavBarItemUnfocusableAnchor
              href={href}
              onMouseOver={() => prefetch(href)}
              onClick={event => {
                handleClick?.(event)
                setTimeout(() => setVisible(false), 100)
              }}
              data-label={label}
            />
            {label}
          </NavBarItemButton>
        )
      }}
    </Dropdown>
  )
}
