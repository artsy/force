import CloseIcon from "@artsy/icons/CloseIcon"
import { Clickable, type ClickableProps } from "@artsy/palette"
import type * as React from "react"

interface ViewInRoomCloseButtonProps extends ClickableProps {}

export const ViewInRoomCloseButton: React.FC<
  React.PropsWithChildren<ViewInRoomCloseButtonProps>
> = props => (
  <Clickable {...props}>
    <CloseIcon width={40} height={40} fill="black60" />
  </Clickable>
)
