import { Clickable, ClickableProps } from "@artsy/palette"
import * as React from "react"
import CloseIcon from "@artsy/icons/CloseIcon"

interface DeepZoomCloseButtonProps extends ClickableProps {}

export const DeepZoomCloseButton: React.FC<DeepZoomCloseButtonProps> = props => (
  <Clickable {...props}>
    <CloseIcon width={40} height={40} fill="white100" />
  </Clickable>
)
