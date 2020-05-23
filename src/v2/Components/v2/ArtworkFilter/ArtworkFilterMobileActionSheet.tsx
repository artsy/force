import { Box, Button, Sans, Flex, color } from "@artsy/palette"
import React, { SFC } from "react"
import styled from "styled-components"
import {
  useArtworkFilterContext,
  initialArtworkFilterState,
} from "./ArtworkFilterContext"
import { isEqual, omit } from "lodash"

export const ArtworkFilterMobileActionSheet: SFC<{
  children: JSX.Element
  onClose: () => void
}> = ({ children, onClose }) => {
  const filterContext = useArtworkFilterContext()

  // This reflects our zero state for this UI which doesn't include the keyword
  const isReset = isEqual(
    omit(filterContext.filters, "reset", "keyword"),
    initialArtworkFilterState
  )

  return (
    <Container>
      <Header p={1}>
        <Button variant="noOutline" size="small" onClick={onClose}>
          Close
        </Button>

        <Title size="3" weight="medium" textAlign="center">
          Filter
        </Title>

        <Button
          size="small"
          variant="secondaryGray"
          disabled={isReset}
          onClick={() => filterContext.resetFilters()}
        >
          Clear all
        </Button>
      </Header>

      <Content>
        <Box width="100%" p={2}>
          {children}
        </Box>
      </Content>

      <Footer p={1}>
        <Button variant="primaryBlack" width="100%" onClick={onClose}>
          Apply
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled(Box)`
  position: fixed;

  /* The z-index after Force's mobile top-nav header */
  z-index: 971;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Header = styled(Flex)`
  width: 100%;
  align-items: center;
  border-bottom: 1px solid ${color("black10")};
`

const Footer = styled(Flex)`
  width: 100%;
`

const Content = styled(Flex)`
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

const Title = styled(Sans)`
  flex: 1;
`
