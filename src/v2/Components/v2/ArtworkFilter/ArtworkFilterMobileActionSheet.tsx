import {
  Box,
  Button,
  Clickable,
  Flex,
  ModalBase,
  Sans,
  color,
} from "@artsy/palette"
import React, { SFC, useRef } from "react"
import styled from "styled-components"
import {
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "./ArtworkFilterContext"
import { isEqual, omit } from "lodash"

export const ArtworkFilterMobileActionSheet: SFC<{
  children: JSX.Element
  onClose: () => void
}> = ({ children, onClose }) => {
  const filterContext = useArtworkFilterContext()

  const contentRef = useRef<HTMLDivElement | null>(null)

  // This reflects our zero state for this UI which doesn't include the keyword
  const isReset = isEqual(
    omit(filterContext.filters, "reset", "keyword"),
    initialArtworkFilterState
  )

  const handleScrollToTop = () => {
    if (!contentRef.current) return
    contentRef.current.scrollTop = 0
  }

  return (
    <ModalBase
      onClose={onClose}
      dialogProps={{
        width: "100%",
        height: "100%",
        background: color("white100"),
        flexDirection: "column",
      }}
    >
      <Header p={1}>
        <Button variant="noOutline" size="small" onClick={onClose}>
          Close
        </Button>

        {/* TODO: This extraneous Flex is not necessary, Clickable (and Box) should have Flex props*/}
        <Flex flex="1">
          <Clickable width="100%" onClick={handleScrollToTop}>
            <Title size="3" weight="medium" textAlign="center">
              Filter
            </Title>
          </Clickable>
        </Flex>

        <Button
          size="small"
          variant="secondaryGray"
          disabled={isReset}
          onClick={() => filterContext.resetFilters()}
        >
          Clear all
        </Button>
      </Header>

      <Content ref={contentRef as any}>
        <Box width="100%" p={2}>
          {children}
        </Box>
      </Content>

      <Footer p={1}>
        <Button variant="primaryBlack" width="100%" onClick={onClose}>
          Apply
        </Button>
      </Footer>
    </ModalBase>
  )
}

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
