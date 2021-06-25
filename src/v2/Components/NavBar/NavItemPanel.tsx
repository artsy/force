import React from "react"
import styled, { css } from "styled-components"

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
  return (
    <AnimatedPanel
      className={visible ? "fadeIn" : ""}
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
}>`
  position: absolute;
  top: 100%;
  z-index: 1;

  /* Pre animation state */
  visibility: hidden;
  opacity: 0;
  transform: translateY(-15px);

  /* Animate in */
  &.fadeIn {
    visibility: visible;
    transition: all 500ms cubic-bezier(0.075, 0.82, 0.365, 1); /* easeOutCirc */
    transition-delay: 200ms;
    transform: translateY(0px);
    opacity: 1;
  }

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
