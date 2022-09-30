import {
  Clickable,
  ClickableProps,
  Flex,
  FlexProps,
  Image,
  ImageProps,
  ResponsiveBox,
  ResponsiveBoxProps,
  Text,
  TextProps,
} from "@artsy/palette"
import styled from "styled-components"
import { grid, GridProps } from "styled-system"

// TODO: grid-enable our base Box component in palette
export const GridClickable = styled(Clickable)<ClickableProps & GridProps>`
  ${grid}
`
export const GridImage = styled(Image)<ImageProps & GridProps>`
  ${grid}
`
export const GridText = styled(Text)<TextProps & GridProps>`
  ${grid}
`
export const GridFlex = styled(Flex)<FlexProps & GridProps>`
  ${grid}
`
export const GridResponsiveBox = styled(ResponsiveBox)<
  ResponsiveBoxProps & GridProps
>`
  ${grid}
`
