import CloseIcon from "@artsy/icons/CloseIcon"
import { Clickable, type ClickableProps } from "@artsy/palette"
import type * as React from "react"

interface DeepZoomCloseButtonProps extends ClickableProps {}

export const DeepZoomCloseButton: React.FC<
  React.PropsWithChildren<DeepZoomCloseButtonProps>
> = props => (
  <Clickable {...props}>
    <CloseIcon width={40} height={40} fill="mono0" />
  </Clickable>
)
