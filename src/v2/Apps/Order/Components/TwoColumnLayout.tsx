import { Box, Column, Flex, GridColumns, Spacer } from "@artsy/palette"
import React from "react"
import { Media } from "v2/Utils/Responsive"

const CONTENT_SPAN = 7
const SIDEBAR_SPAN = 4
const ROW_SPACE = 2
const COL_SPACE = 2

const columnRatioWidth = (spans, size) => Math.round((spans / size) * 100) + "%"

export const TwoColumnSplit = ({ children, ...props }) => {
  const [firstColumn, secondColumn] = React.Children.toArray(children)

  return (
    <>
      <Media at="xs">
        <Flex flexDirection={"column"} {...props}>
          <Box width="100%">{firstColumn}</Box>
          <Spacer mr={null} mb={ROW_SPACE} />
          <Box width="100%">{secondColumn}</Box>
        </Flex>
      </Media>

      <Media greaterThan="xs">
        <Flex flexDirection="row" {...props}>
          <Box width={columnRatioWidth(4, CONTENT_SPAN)}>{firstColumn}</Box>
          <Spacer mr={COL_SPACE} mb={null} />
          <Box width={columnRatioWidth(3, CONTENT_SPAN)}>{secondColumn}</Box>
        </Flex>
      </Media>
    </>
  )
}

export const TwoColumnLayout = props => (
  <>
    <Media at="xs">
      <XsLayout {...props} />
    </Media>
    <Media greaterThan="xs">
      <DefaultLayout {...props} />
    </Media>
  </>
)

const DefaultLayout = ({ Content, Sidebar }) => (
  <GridColumns>
    <Column span={CONTENT_SPAN}>{Content}</Column>
    <Column span={1} />
    <Column span={SIDEBAR_SPAN}>{Sidebar}</Column>
  </GridColumns>
)

const XsLayout = ({ Content, Sidebar }) => (
  <GridColumns>
    <Column span={12}>{Content}</Column>
    <Column span={12}>{Sidebar}</Column>
  </GridColumns>
)
