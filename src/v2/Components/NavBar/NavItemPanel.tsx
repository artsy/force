import React from "react"
import { animated, config, useSpring } from "react-spring"
import styled, { css } from "styled-components"

export type MenuAnchor = "left" | "right" | "center" | "full"

const AnimatedPanel = styled(animated.div)<{
  "data-menuanchor": MenuAnchor
  "data-offsetleft"?: number
}>`
  position: absolute;
  top: 100%;
  ${({ ...props }) =>
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
        margin-left: -${props["data-offsetleft"] ?? 0}px;
      `,
    }[props["data-menuanchor"]])}
`

const ANIMATION_STATES = {
  hidden: {
    display: "none",
    opacity: 0,
    transform: "translate3d(0, -25px, 0)",
  },
  visible: {
    display: "block",
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
  },
}

interface NavItemPanelProps {
  visible: boolean
  menuAnchor: MenuAnchor
  relativeTo: React.MutableRefObject<HTMLDivElement>
}

export const NavItemPanel: React.FC<NavItemPanelProps> = ({
  visible,
  menuAnchor,
  relativeTo,
  children,
}) => {
  const animation = useSpring({
    ...(visible ? ANIMATION_STATES.visible : ANIMATION_STATES.hidden),
    config: name =>
      name === "opacity" ? config.stiff : { friction: 10, mass: 0.1 },
  })

  return (
    <AnimatedPanel
      style={animation}
      data-menuanchor={menuAnchor}
      data-offsetleft={relativeTo.current?.offsetLeft}
    >
      {children}
    </AnimatedPanel>
  )
}
