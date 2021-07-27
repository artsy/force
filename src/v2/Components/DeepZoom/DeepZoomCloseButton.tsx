import { Clickable, ClickableProps, CloseIcon } from "@artsy/palette"
import React from "react"

interface DeepZoomCloseButtonProps extends ClickableProps {}

export const DeepZoomCloseButton: React.FC<DeepZoomCloseButtonProps> = props => (
  <Clickable {...props}>
    <CloseIcon width={40} height={40} fill="white100" />
  </Clickable>
)
