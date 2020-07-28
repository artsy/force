import React from "react"
import { animated, config, useSpring } from "react-spring"
import styled, { css } from "styled-components"

export type MenuAnchor = "left" | "right" | "center" | "full"

const AnimatedPanel = styled(animated.div)<{
  menuAnchor: MenuAnchor
  offsetLeft?: number
}>`
  position: absolute;
  top: 100%;
  ${({ menuAnchor, offsetLeft = 0 }) =>
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
        margin-left: -${offsetLeft}px;
      `,
    }[menuAnchor])}
`

const ANIMATION_STATES = {
  in: {
    opacity: 0,
    transform: "translate3d(0, -25px, 0)",
  },
  out: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
  },
}

interface NavItemPanelProps {
  menuAnchor: MenuAnchor
  relativeTo: React.MutableRefObject<HTMLDivElement>
}

export const NavItemPanel: React.FC<NavItemPanelProps> = ({
  menuAnchor,
  relativeTo,
  children,
}) => {
  const animation = useSpring({
    ...ANIMATION_STATES.out,
    from: ANIMATION_STATES.in,
    config: name =>
      name === "opacity"
        ? config.stiff
        : {
            friction: 10,
            mass: 0.1,
          },
  })

  return (
    <AnimatedPanel
      style={animation}
      menuAnchor={menuAnchor}
      offsetLeft={relativeTo.current?.offsetLeft}
    >
      {children}
    </AnimatedPanel>
  )
}
