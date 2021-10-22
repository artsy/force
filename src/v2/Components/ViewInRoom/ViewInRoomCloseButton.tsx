import { Clickable, ClickableProps, CloseIcon } from "@artsy/palette"
import * as React from "react";

interface ViewInRoomCloseButtonProps extends ClickableProps {}

export const ViewInRoomCloseButton: React.FC<ViewInRoomCloseButtonProps> = props => (
  <Clickable {...props}>
    <CloseIcon width={40} height={40} fill="black60" />
  </Clickable>
)
