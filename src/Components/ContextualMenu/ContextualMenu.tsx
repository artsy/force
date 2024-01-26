import React, { ReactElement } from "react"

import MoreIcon from "@artsy/icons/MoreIcon"
import { Clickable, Dropdown } from "@artsy/palette"
import {
  ContextualMenuDivider,
  ContextualMenuItem,
} from "Components/ContextualMenu/ContextualMenuItem"

interface ContextualMenuProps {
  /** Supply `ContextualMenuItem`s and `ContextualMenuDivider`s as needed  */
  children: React.ReactNode
  placement?: "bottom-end" | "bottom-start" | "top-end" | "top-start"
  zIndex?: number
}

const validateChildren = (children: React.ReactNode) => {
  const childTypes =
    React.Children.map(children, (child: ReactElement) => child.type) || []

  const hasOnlyValidChildren = childTypes.every(
    t => t === ContextualMenuItem || t === ContextualMenuDivider
  )

  if (!hasOnlyValidChildren)
    throw new Error(
      "ContextualMenu accepts only ContextualMenuItem and ContextualMenuDivider as children."
    )
}

/**
 * Creates a contextual menu by composing a MoreIcon (⋯) trigger
 * and a Dropdown component from Palette.
 */
export const ContextualMenu: React.FC<ContextualMenuProps> = ({
  children,
  placement = "bottom-end",
  zIndex,
}) => {
  validateChildren(children)

  return (
    <Dropdown
      minWidth={200}
      openDropdownByClick
      placement={placement}
      offset={0}
      zIndex={zIndex}
      dropdown={({ onHide }) => {
        /*
         * Each ContextualMenuItem must be able to close this
         * parent ContextualMenu's Dropdown when it is clicked.
         */
        return React.Children.map(children, (child: ReactElement) => {
          if (child.type === ContextualMenuItem) {
            const onClick = () => {
              onHide()
              child.props.onClick?.()
            }
            return React.cloneElement(child, {
              onClick,
            })
          } else {
            return child
          }
        })
      }}
    >
      {({ anchorRef, anchorProps }) => {
        return (
          <Clickable
            // @ts-expect-error TODO: fix this ref type error
            ref={anchorRef}
            {...anchorProps}
            p={1}
            aria-label="Open contextual menu"
          >
            <MoreIcon />
          </Clickable>
        )
      }}
    </Dropdown>
  )
}
