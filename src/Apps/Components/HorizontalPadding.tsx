import { Box, BoxProps } from "@artsy/palette"
import styled from "styled-components"

export interface HorizontalPaddingProps extends BoxProps {}

/**
 * Handles the outer padding of the app. That's it!
 */
export const HorizontalPadding = styled(Box)<HorizontalPaddingProps>``

HorizontalPadding.defaultProps = {
  px: [2, 4],
  mx: "auto",
}
