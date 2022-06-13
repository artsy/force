import { FC, useEffect, useRef } from "react"
import { isEqual, omit } from "lodash"
import styled from "styled-components"
import {
  useAuctionResultsFilterContext,
  initialAuctionResultsFilterState,
} from "../AuctionResultsFilterContext"
import { Box, Button, Clickable, Flex, ModalBase, Text } from "@artsy/palette"

export const AuctionFilterMobileActionSheet: FC<{
  children: JSX.Element
  onClose: () => void
}> = ({ children, onClose }) => {
  const filterContext = useAuctionResultsFilterContext()

  const contentRef = useRef<HTMLDivElement | null>(null)

  // This reflects our zero state for this UI which doesn't include the keyword
  const isReset = isEqual(
    omit(filterContext.stagedFilters, "reset", "keyword"),
    initialAuctionResultsFilterState
  )

  const handleScrollToTop = () => {
    if (!contentRef.current) return
    contentRef.current.scrollTop = 0
  }

  const isFiltersChanged = !isEqual(
    filterContext.filters,
    filterContext.stagedFilters
  )

  useEffect(() => {
    // While mobile sheet is mounted, the effect of the user's filter selections
    // should be merely staged until the Apply button is pressed, rather than
    // applied immediately. Therefore…
    //
    // On mount, enter staged mode, and initialize a set of staged filter
    // changes from the current filter choices.
    filterContext.setShouldStageFilterChanges?.(true)
    filterContext.setStagedFilters?.(filterContext.filters ?? {})

    // On unmount, exit staged mode.
    return () => {
      filterContext.setShouldStageFilterChanges?.(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const applyFilters = () => {
    // On apply, replace the actual filter state with the
    // hitherto staged filters
    filterContext.setFilters?.(filterContext.stagedFilters ?? {}, {
      force: true,
    })
    onClose()
  }

  return (
    <ModalBase
      onClose={onClose}
      dialogProps={{
        width: "100%",
        height: "100%",
        bg: "white100",
        flexDirection: "column",
      }}
    >
      <Flex
        p={1}
        width="100%"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="black10"
      >
        <Button
          variant="tertiary"
          size="small"
          onClick={() => {
            // On close, abandon any staged filter changes
            filterContext.setStagedFilters?.({})
            onClose()
          }}
        >
          Cancel
        </Button>

        <Clickable flex={1} width="100%" onClick={handleScrollToTop}>
          <Text variant="xs" textAlign="center" fontWeight="bold">
            Filter
          </Text>
        </Clickable>

        <Button
          size="small"
          variant="primaryGray"
          disabled={isReset}
          onClick={() => {
            // On clear, reset (staged) filter changes to initial state
            filterContext.resetFilters?.()
          }}
        >
          Clear all
        </Button>
      </Flex>

      <Content ref={contentRef as any} px={2} pt={2}>
        {children}
      </Content>

      <Flex p={1} width="100%">
        <Button
          variant="primaryBlack"
          width="100%"
          disabled={!isFiltersChanged}
          onClick={applyFilters}
        >
          Show Results
        </Button>
      </Flex>
    </ModalBase>
  )
}

const Content = styled(Box)`
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`
