import {
  Box,
  BoxProps,
  Clickable,
  Flex,
  Link,
  Text,
  color,
} from "@artsy/palette"
import { AnalyticsSchema } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { isFunction, isString } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { position } from "styled-system"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { MenuAnchor, NavItemPanel } from "v2/Components/NavBar/NavItemPanel"

const Container = styled(Flex)`
  position: relative;
  height: 100%;
  align-items: center;
`

const HitArea = styled(Link)`
  ${position}
  display: flex;
  align-items: center;
  height: 100%;
  user-select: none;

  /* Utilize content-box sizing so that the bottom-border overlays
  the nav border, rather than stacking */
  box-sizing: content-box;
  border-bottom: 1px solid transparent;

  &:focus {
    outline: 0;
    border-bottom-color: ${color("black100")};
    z-index: 1;
  }
`

const UnfocusableAnchor = styled(RouterLink).attrs({
  tabIndex: -1,
  role: "presentation",
})`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`

interface NavItemProps extends BoxProps, React.HTMLAttributes<HTMLDivElement> {
  Menu?: React.FC<{
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  }>
  Overlay?: React.FC
  active?: boolean
  href?: string
  label?: string
  menuAnchor?: MenuAnchor
  onClick?: () => void
}

export const NavItem: React.FC<NavItemProps> = ({
  Menu,
  Overlay,
  active = false,
  children,
  href,
  label,
  menuAnchor = "left",
  tabIndex,
  role,
  onClick,
  ...rest
}) => {
  const { trackEvent } = useTracking()
  const [isVisible, setIsVisible] = useState(active)

  const showMenu = Boolean(Menu && isVisible)
  const showOverlay = Boolean(Overlay)
  const color = isVisible ? "purple100" : "black100"

  const trackClick = () => {
    if (href && isString(children)) {
      trackEvent({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: children, // Text passed into the NavItem
        destination_path: href,
      })
    }
  }

  const containerRef = useRef<null | HTMLDivElement>(null)
  const hitAreaRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null)

  // Close the subnav if it is open and our focus moves outside of it
  useEffect(() => {
    const checkFocus = () => {
      if (!containerRef?.current) return // Not mounted
      if (!isVisible) return // Isn't open
      if (containerRef.current.contains(document.activeElement)) return // Focus is within sub-nav

      setIsVisible(false)
    }

    document.addEventListener("focus", checkFocus, true)
    return () => {
      document.removeEventListener("focus", checkFocus)
    }
  }, [isVisible])

  const handleClick = () => {
    onClick && onClick()
    !!Menu && setIsVisible(prevIsVisible => !prevIsVisible)
    trackClick()
  }

  // Add a very short delay to avoid trapping the mouse and capturing intent
  const openDelayRef = useRef<null | ReturnType<typeof setTimeout>>(null)
  // Add a slightly longer delay to improve UX when moving at an angle off HitArea
  const closeDelayRef = useRef<null | ReturnType<typeof setTimeout>>(null)

  const handleMouseEnter = () => {
    openDelayRef.current = setTimeout(() => {
      setIsVisible(true)
    }, 50)
    closeDelayRef?.current && clearTimeout(closeDelayRef.current)
  }

  const handleMouseLeave = () => {
    openDelayRef?.current && clearTimeout(openDelayRef.current)
    closeDelayRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 150)
  }

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !hitAreaRef?.current) return
    setIsVisible(false) // Close panel
    hitAreaRef.current.focus() // Return focus
  }

  useEffect(() => {
    if (!isVisible) return // Only bind to open menus
    window.addEventListener("keydown", handleEscape)
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isVisible])

  return (
    <Container
      ref={containerRef as any}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <HitArea
        ref={hitAreaRef as any}
        {...(!!Menu
          ? {
              as: Clickable,
              "aria-haspopup": true,
              "aria-expanded": showMenu,
            }
          : { as: RouterLink, to: href })}
        color={color}
        underlineBehavior="none"
        px={1}
        aria-label={label}
        tabIndex={tabIndex}
        role={role}
        onClick={handleClick}
      >
        {!!Menu && href && <UnfocusableAnchor to={href} />}
        <Text variant="text" lineHeight="solid" color={color}>
          <NavItemInner height={25}>
            {isFunction(children)
              ? // NavItem children can be called as renderProps so that contents
                // can operate on UI behaviors (such as changing the color of an
                // icon on hover).
                children({ hover: isVisible })
              : children}
          </NavItemInner>
        </Text>
      </HitArea>

      {!!Menu && (
        <NavItemPanel
          menuAnchor={menuAnchor}
          relativeTo={containerRef}
          visible={showMenu}
        >
          <Menu setIsVisible={setIsVisible} />
        </NavItemPanel>
      )}

      {showOverlay && <Overlay />}
    </Container>
  )
}

const NavItemInner = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`
