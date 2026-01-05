import { ActionType } from "@artsy/cohesion"
import type * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Dropdown } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import type { MenuData } from "Components/NavBar/menuData"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import { useEffect, useRef } from "react"
import { useTracking } from "react-tracking"
import { NavBarSubMenu } from "./Menus"
import { NavBarItemButton, NavBarItemUnfocusableAnchor } from "./NavBarItem"

interface NavBarDropdownPanelProps {
  href: string
  label: string
  menu: MenuData
  contextModule: string
  onMenuEnter: () => void
  handleClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  shouldTransition: boolean
}

export const NavBarDropdownPanel: React.FC<NavBarDropdownPanelProps> = ({
  href,
  label,
  menu,
  contextModule,
  onMenuEnter,
  handleClick,
  shouldTransition,
}) => {
  const { prefetch } = usePrefetchRoute()
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  return (
    <Dropdown
      zIndex={Z.dropdown}
      keepInDOM
      placement="bottom"
      offset={0}
      transition={shouldTransition}
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdown={({ setVisible }) => {
        return (
          <NavBarSubMenu
            menu={menu}
            contextModule={
              contextModule as DeprecatedAnalyticsSchema.ContextModule
            }
            onClick={() => setVisible(false)}
            parentNavigationItem={label}
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
              onMenuEnter()
            }}
            {...restAnchorProps}
          >
            <NavBarItemUnfocusableAnchor
              href={href}
              onMouseOver={() => prefetch(href)}
              onClick={event => {
                handleClick(event)
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
