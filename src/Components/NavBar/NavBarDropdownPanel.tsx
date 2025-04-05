import type * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Dropdown } from "@artsy/palette"
import composeRefs from "@seznam/compose-react-refs"
import { Z } from "Apps/Components/constants"
import type { MenuData } from "Components/NavBar/menuData"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import { useWindowSize } from "Utils/Hooks/useWindowSize"
import { useEffect, useRef } from "react"
import { useState } from "react"
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

  // Calculate max height based on the distance between anchor and bottom of viewport
  const [maxHeight, setMaxHeight] = useState<number>(0)

  const { height: viewportHeight } = useWindowSize()

  const positionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!positionRef.current) return

    const { top, height } = positionRef.current.getBoundingClientRect()
    const availableHeight = viewportHeight - top - height - 2 // 2px for border

    setMaxHeight(availableHeight)
  }, [viewportHeight])

  return (
    <Dropdown
      zIndex={Z.dropdown}
      keepInDOM
      placement="bottom"
      offset={0}
      transition={shouldTransition}
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdown={({ setVisible }) => (
        <NavBarSubMenu
          menu={menu}
          contextModule={
            contextModule as DeprecatedAnalyticsSchema.ContextModule
          }
          onClick={() => setVisible(false)}
          maxHeight={maxHeight}
        />
      )}
    >
      {({ anchorRef, anchorProps, visible, setVisible }) => {
        const { onMouseEnter, ...restAnchorProps } = anchorProps

        return (
          <NavBarItemButton
            ref={composeRefs(anchorRef, positionRef) as any}
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
