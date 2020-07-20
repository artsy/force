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
import { animated, config, useSpring } from "react-spring"
import styled, { css } from "styled-components"
import { position } from "styled-system"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

const Container = styled(Flex)`
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
    text-decoration: underline;
    z-index: 1;
  }
`

type MenuAnchor = "left" | "right" | "center" | "full"

const AnimatedPanel = styled(animated.div)<{
  menuAnchor: MenuAnchor
}>`
  position: absolute;
  top: 100%;
  ${({ menuAnchor }) =>
    ({
      right: css`
        right: 0;
      `,
      left: css`
        left: 0;
      `,
      center: css`
        left: 0;
        margin-left: -50%;
      `,
      full: css`
        left: 0;
        right: 0;
      `,
    }[menuAnchor])}
`

const UnfocusableAnchor = styled(RouterLink).attrs({ tabIndex: -1 })`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`

interface NavItemProps extends BoxProps {
  Menu?: React.FC<{
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  }>
  Overlay?: React.FC
  active?: boolean
  className?: string
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
  className,
  display = "block",
  href,
  label,
  menuAnchor = "left",
  onClick,
  ...rest
}) => {
  const navItemLabel = children

  const { trackEvent } = useTracking()
  const [isVisible, setIsVisible] = useState(active)

  const showMenu = Boolean(Menu && isVisible)
  const showOverlay = Boolean(Overlay)
  const color = isVisible ? "purple100" : "black100"

  const getAnimation = (hover: boolean) => ({
    opacity: hover ? 0 : 1,
    transform: `translate3d(0, ${hover ? -25 : 0}px, 0)`,
  })

  const animatedStyle = useSpring({
    from: getAnimation(isVisible),
    ...getAnimation(!isVisible),
    config: name =>
      name === "opacity"
        ? config.stiff
        : {
            friction: 10,
            mass: 0.1,
          },
  })

  const trackClick = () => {
    if (href && isString(navItemLabel)) {
      trackEvent({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: navItemLabel, // Text passed into the NavItem
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
      // When fullscreen: position relative to outer container
      // When not fullscreen: position relative to immediate container
      position={menuAnchor === "full" ? undefined : "relative"}
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
        className={className}
        display={display}
        onClick={handleClick}
        aria-label={label}
      >
        {!!Menu && href && <UnfocusableAnchor to={href} />}
        <Text variant="text" lineHeight="solid" color={color}>
          <NavItemInner height={25}>
            {isFunction(navItemLabel)
              ? // NavItem children can be called as renderProps so that contents
                // can operate on UI behaviors (such as changing the color of an
                // icon on hover).
                navItemLabel({ hover: isVisible })
              : navItemLabel}
          </NavItemInner>
        </Text>
      </HitArea>

      {showMenu && (
        <AnimatedPanel style={animatedStyle} menuAnchor={menuAnchor}>
          <Menu setIsVisible={setIsVisible} />
        </AnimatedPanel>
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
