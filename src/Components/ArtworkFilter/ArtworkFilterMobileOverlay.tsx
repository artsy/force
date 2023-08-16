import { Box, Button, Clickable, Flex, ModalBase, Text } from "@artsy/palette"
import { ReactNode, useEffect, useRef } from "react"
import styled from "styled-components"
import { useArtworkFilterContext } from "./ArtworkFilterContext"
import { isEqual, omit } from "lodash"
import { countChangedFilters } from "./Utils/countChangedFilters"

interface ArtworkFilterMobileOverlayProps {
  children: ReactNode
  onClose: () => void
}

export const ArtworkFilterMobileOverlay: React.FC<ArtworkFilterMobileOverlayProps> = ({
  children,
  onClose,
}) => {
  const filterContext = useArtworkFilterContext()

  const contentRef = useRef<HTMLDivElement | null>(null)

  // This reflects our zero state for this UI which doesn't include the keyword
  const isReset = isEqual(
    omit(filterContext.stagedFilters, "reset", "keyword"),
    filterContext.defaultFilters
  )

  const handleScrollToTop = () => {
    if (!contentRef.current) return
    contentRef.current.scrollTop = 0
  }

  useEffect(() => {
    // While mobile sheet is mounted, the effect of the user's filter selections
    // should be merely staged until the Apply button is pressed, rather than
    // applied immediately. Therefore…

    // On mount, enter staged mode, and initialize a set of staged filter
    // changes from the current filter choices.
    filterContext.setShouldStageFilterChanges?.(true)
    if (filterContext.filters) {
      filterContext.setStagedFilters?.(filterContext.filters)
    }

    // On unmount, exit staged mode.
    return () => {
      filterContext.setShouldStageFilterChanges?.(false)
    }
    // FIXME: Unclear how to unwind this hack at the moment; satisfying the deps causes
    // this to immediately un-apply the changes. Leaving it as-is for now.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Enumerate the difference between prior and currently selected filters
  const changedFilterCount =
    filterContext.filters && filterContext.stagedFilters
      ? countChangedFilters(filterContext.filters, filterContext.stagedFilters)
      : 0

  const applyFilters = () => {
    // On apply, replace the actual filter state with the
    // hitherto staged filters
    if (filterContext.stagedFilters) {
      filterContext.setFilters?.(filterContext.stagedFilters)
    }

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
            filterContext?.setStagedFilters?.({})
            onClose()
          }}
        >
          Cancel
        </Button>

        <Clickable width="100%" onClick={handleScrollToTop} flex={1}>
          <Text variant="xs" fontWeight="bold" textAlign="center">
            Filter
          </Text>
        </Clickable>

        <Button
          size="small"
          variant="primaryGray"
          disabled={isReset}
          onClick={() => {
            // On clear, reset (staged) filter changes to initial state
            filterContext.resetFilters()
          }}
        >
          Clear all
        </Button>
      </Flex>

      <Content ref={contentRef as any} width="100%" px={2} pt={2}>
        {children}
      </Content>

      <Flex p={1} width="100%">
        <Button
          variant="primaryBlack"
          width="100%"
          disabled={!changedFilterCount}
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
