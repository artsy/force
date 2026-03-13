import type * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Dropdown } from "@artsy/palette"
import type { MenuData } from "Components/NavBar/menuData"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import { useEffect, useRef } from "react"
import { NavBarSubMenu } from "./Menus"
import { useNavBarDropdown } from "./NavBarDropdownContext"
import { NavBarItemButton, NavBarItemUnfocusableAnchor } from "./NavBarItem"
import { useNavBarTracking } from "./useNavBarTracking"

interface NavBarDropdownPanelProps {
  href: string
  label: string
  menu: MenuData
  contextModule: string
  handleClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export const NavBarDropdownPanel: React.FC<NavBarDropdownPanelProps> = ({
  href,
  label,
  menu,
  contextModule,
  handleClick,
}) => {
  const { prefetch } = usePrefetchRoute()

  const tracking = useNavBarTracking()

  const { shouldTransition, handleMenuEnter, getZIndex } = useNavBarDropdown()

  return (
    <Dropdown
      zIndex={getZIndex(label)}
      keepInDOM
      placement="bottom"
      offset={0}
      delay={{ open: 100, close: 200 }}
      transition={shouldTransition}
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdown={({ setVisible, visible }) => {
        return (
          <NavBarSubMenu
            menu={menu}
            contextModule={
              contextModule as DeprecatedAnalyticsSchema.ContextModule
            }
            onClick={() => setVisible(false)}
            parentNavigationItem={label}
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
              tracking.navigationDropdownViewed({
                navigationItem: label,
                level: 0,
                interactionType: "hover",
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
            data-testid="static-dropdown"
            onMouseEnter={e => {
              onMouseEnter?.(e)
              handleMenuEnter(label)
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
