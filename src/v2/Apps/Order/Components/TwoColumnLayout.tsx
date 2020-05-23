import { Box, Col, Flex, Row, Spacer } from "@artsy/palette"
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
  <Row>
    <Col col={CONTENT_SPAN}>{Content}</Col>
    <Col col={1} />
    <Col col={SIDEBAR_SPAN}>{Sidebar}</Col>
  </Row>
)

const XsLayout = ({ Content, Sidebar }) => (
  <Row>
    <Col>{Content}</Col>
    <Col>{Sidebar}</Col>
  </Row>
)
