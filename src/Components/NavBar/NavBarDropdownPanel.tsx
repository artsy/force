import type * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Dropdown } from "@artsy/palette"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import type { NavBarSubMenu_navigationVersion$key } from "__generated__/NavBarSubMenu_navigationVersion.graphql"
import { useEffect, useRef } from "react"
import { NavBarSubMenu } from "./Menus/NavBarSubMenu"
import { useNavBarDropdown } from "./NavBarDropdownContext"
import { NavBarItemButton, NavBarItemUnfocusableAnchor } from "./NavBarItem"
import { useNavBarTracking } from "./useNavBarTracking"
import {
  markDropdownHoverSuppressed,
  useSuppressedDropdownHover,
} from "./useSuppressedDropdownHover"

interface NavBarDropdownPanelProps {
  navigationData: NavBarSubMenu_navigationVersion$key
  label: string
  href: string
  contextModule: string
  menuType: "whatsNew" | "artists" | "artworks"
  handleClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export const NavBarDropdownPanel: React.FC<NavBarDropdownPanelProps> = ({
  navigationData,
  label,
  href,
  contextModule,
  menuType,
  handleClick,
}) => {
  const { prefetch } = usePrefetchRoute()
  const tracking = useNavBarTracking()
  const { shouldTransition, handleMenuEnter, getZIndex } = useNavBarDropdown()

  const buttonRef = useRef<HTMLElement | null>(null)

  // After clicking the trigger the page fully reloads with the pointer still
  // resting on it; keep hover disabled until the pointer leaves so the submenu
  // doesn't immediately reopen.
  const { isSuppressed, unsuppress } = useSuppressedDropdownHover({
    label,
    anchorRef: buttonRef,
  })

  return (
    <Dropdown
      zIndex={getZIndex(label)}
      keepInDOM
      // Palette only listens for hover when this is false
      openDropdownByClick={isSuppressed}
      placement="bottom"
      offset={0}
      delay={shouldTransition ? 100 : 0}
      transition={shouldTransition}
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdown={({ setVisible, visible }) => {
        return (
          <NavBarSubMenu
            navigationVersion={navigationData}
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
      data-testid="navbar-dropdown-panel"
    >
      {({ anchorRef, anchorProps, visible, setVisible }) => {
        const { onMouseEnter, onMouseLeave, ...restAnchorProps } = anchorProps
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
          }

          if (!visible && timeoutRef.current) {
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
            ref={(element: HTMLElement | null) => {
              // Palette types this as non-nullable but handles null on unmount
              anchorRef.current = element as HTMLElement
              buttonRef.current = element
            }}
            active={visible}
            data-testid="navbar-dropdown-button"
            onMouseEnter={e => {
              onMouseEnter?.(e)
              handleMenuEnter(label)
            }}
            onMouseLeave={e => {
              onMouseLeave?.(e)
              unsuppress()
            }}
            {...restAnchorProps}
          >
            <NavBarItemUnfocusableAnchor
              href={href}
              onMouseOver={() => prefetch(href)}
              onClick={event => {
                handleClick?.(event)

                if (isPlainLeftClick(event)) {
                  markDropdownHoverSuppressed(label)
                }

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

/** Only a plain left click navigates within the current tab */
const isPlainLeftClick = (event: React.MouseEvent) => {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}
