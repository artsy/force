import { Box, Column, Flex, GridColumns, Spacer } from "@artsy/palette"
import { Children, FC, ReactNode } from "react"
import { Media } from "Utils/Responsive"

const CONTENT_SPAN = 7
const SIDEBAR_SPAN = 4
const ROW_SPACE = 2
const COL_SPACE = 2

const columnRatioWidth = (spans, size) => Math.round((spans / size) * 100) + "%"

export const TwoColumnSplit = ({ children, ...props }) => {
  const [firstColumn, secondColumn] = Children.toArray(children)

  return (
    <>
      <Media at="xs">
        <Flex flexDirection={"column"} {...props}>
          <Box width="100%">{firstColumn}</Box>
          <Spacer y={ROW_SPACE} />
          <Box width="100%">{secondColumn}</Box>
        </Flex>
      </Media>

      <Media greaterThan="xs">
        <Flex flexDirection="row" {...props}>
          <Box width={columnRatioWidth(4, CONTENT_SPAN)}>{firstColumn}</Box>
          <Spacer x={COL_SPACE} />
          <Box width={columnRatioWidth(3, CONTENT_SPAN)}>{secondColumn}</Box>
        </Flex>
      </Media>
    </>
  )
}

export interface TwoColumnLayoutProps {
  Content: ReactNode
  Sidebar: ReactNode
  noRowGap?: boolean
}

export const TwoColumnLayout: FC<TwoColumnLayoutProps> = ({
  Content,
  Sidebar,
  noRowGap,
}) => (
  <GridColumns gridRowGap={noRowGap ? 0 : undefined}>
    <Column span={[12, CONTENT_SPAN]}>{Content}</Column>
    <Column display={["none", "block"]} span={1} />
    <Column span={[12, SIDEBAR_SPAN]}>{Sidebar}</Column>
  </GridColumns>
)
