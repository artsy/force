import React from "react"
import styled, { css, keyframes } from "styled-components"

export type MenuAnchor = "left" | "right" | "center" | "full"

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
  const animation = visible ? ANIMATION_STATES.visible : ANIMATION_STATES.hidden

  return (
    <AnimatedPanel
      animation={animation}
      data-menuanchor={menuAnchor}
      data-offsetleft={relativeTo.current?.offsetLeft}
    >
      {children}
    </AnimatedPanel>
  )
}

const AnimatedPanel = styled.div<{
  "data-menuanchor": MenuAnchor
  "data-offsetleft"?: number
  animation: any
}>`
  position: absolute;
  top: 100%;
  z-index: 1;
  ${({ ...props }) =>
    ({
      right: css`
        right: 0;
        animation: ${props.animation};
      `,
      left: css`
        left: 0;
        animation: ${props.animation};
      `,
      center: css`
        left: 0;
        margin-left: -50%;
        animation: ${props.animation};
      `,
      full: css`
        left: 0;
        right: 0;
        margin-left: -${props["data-offsetleft"] ?? 0}px;
        animation: ${props.animation};
      `,
    }[props["data-menuanchor"]])}
`

const fadein = keyframes`
  0% {
    transform: translate3d(0, -25px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`

const fadeout = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -25px, 0);
    opacity: 0;
  }
`

const ANIMATION_STATES = {
  hidden: css`
    ${fadeout} 0.1s linear;
    display: none;
  `,
  visible: css`
    ${fadein} 0.1s linear;
    display: block;
  `,
}
