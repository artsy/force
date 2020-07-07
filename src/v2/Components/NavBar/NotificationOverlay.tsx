import React, { FC } from "react"
import styled from "styled-components"
import { Flex, color, space } from "@artsy/palette"

interface NotificationOverlayProps {
  showOverlay: boolean
}

/** Displays the notification indicator over icons in the header */
export const NotificationOverlay: FC<NotificationOverlayProps> = ({
  showOverlay,
}) => {
  return showOverlay ? <FloatingDot /> : null
}

const FloatingDot = styled(Flex)`
  background-color: ${color("purple100")};
  border-radius: 50%;
  width: 6px;
  height: 6px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${space(2)}px;
  left: 25px;
`
