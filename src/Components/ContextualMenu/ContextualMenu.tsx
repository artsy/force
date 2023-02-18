import React, { ReactElement } from "react"

import MoreIcon from "@artsy/icons/MoreIcon"
import { Clickable, Dropdown } from "@artsy/palette"
import { ContextualMenuItem } from "Components/ContextualMenu/ContextualMenuItem"

interface ContextualMenuProps {
  /** Supply `ContextualMenuItem`s and `ContextualMenuDivider`s as needed  */
  children: React.ReactNode
}

/**
 * Creates a contextual menu by composing a MoreIcon (⋯) trigger
 * and a Dropdown component from Palette.
 */
export const ContextualMenu: React.FC<ContextualMenuProps> = ({ children }) => {
  return (
    <Dropdown
      openDropdownByClick
      placement="bottom-end"
      offset={0}
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
            px={2}
            pt={1}
            tras
            aria-label="Open contextual menu"
          >
            <MoreIcon width={[24, 32]} height={[24, 32]} />
          </Clickable>
        )
      }}
    </Dropdown>
  )
}
