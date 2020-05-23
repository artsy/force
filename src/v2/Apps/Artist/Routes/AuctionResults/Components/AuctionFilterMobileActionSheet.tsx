import { Box, Button, Sans } from "@artsy/palette"
import { MobileTopBar } from "v2/Components/MobileTopBar"
import React, { SFC } from "react"
import styled from "styled-components"
import { useAuctionResultsFilterContext } from "../AuctionResultsFilterContext"

export const AuctionFilterMobileActionSheet: SFC<{
  children: JSX.Element
  onClose: () => void
}> = ({ children, onClose }) => {
  const filterContext = useAuctionResultsFilterContext()

  return (
    <Container mt={6}>
      <MobileTopBar>
        <Button
          variant="noOutline"
          size="small"
          onClick={() => filterContext.resetFilters()}
        >
          Reset
        </Button>
        <Sans size="3" weight="medium">
          Filter
        </Sans>
        <Button variant="primaryBlack" size="small" onClick={() => onClose()}>
          Apply
        </Button>
      </MobileTopBar>

      <Box p={2} mt={2}>
        {children}
      </Box>
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
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`
