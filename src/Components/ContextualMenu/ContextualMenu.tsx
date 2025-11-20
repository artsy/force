import MoreIcon from "@artsy/icons/MoreIcon"
import { Clickable, Dropdown, type DropdownActions, Text } from "@artsy/palette"
import React, { useCallback } from "react"

interface ContextualMenuProps {
  children: React.ReactNode
  placement?: "bottom-end" | "bottom-start" | "top-end" | "top-start"
  zIndex?: number
}

/**
 * Creates a contextual menu by composing a MoreIcon (⋯) trigger
 * and a Dropdown component from Palette.
 */
export const ContextualMenu: React.FC<
  React.PropsWithChildren<ContextualMenuProps>
> = ({ children, placement = "bottom-end", zIndex }) => {
  const dropdown = useCallback(
    ({ onHide }: DropdownActions) => {
      // Wrap onClick handlers to close the dropdown when clicked
      return (
        <Text variant="sm">
          {React.Children.map(children, child => {
            // If the child has an onClick prop, wrap it with onHide
            if (
              React.isValidElement(child) &&
              typeof child.props === "object" &&
              child.props !== null &&
              "onClick" in child.props
            ) {
              const originalOnClick = (child.props as any).onClick

              return React.cloneElement(child as any, {
                onClick: () => {
                  onHide()
                  originalOnClick?.()
                },
              })
            }

            return child
          })}
        </Text>
      )
    },
    [children],
  )

  return (
    <Dropdown
      minWidth={200}
      openDropdownByClick
      placement={placement}
      offset={0}
      zIndex={zIndex}
      dropdown={dropdown}
    >
      {({ anchorRef, anchorProps }) => {
        return (
          <Clickable
            ref={anchorRef as any}
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
