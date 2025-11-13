import { AuctionFilters } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters"
import { Z } from "Apps/Components/constants"
import { Box, Drawer, Flex, ModalClose, Spacer, Text } from "@artsy/palette"
import type { FC } from "react"

interface ArtistAuctionResultsDrawerProps {
  open: boolean
  onClose: () => void
  showUpcomingAuctionResults: boolean
}

export const ArtistAuctionResultsDrawer: FC<
  React.PropsWithChildren<ArtistAuctionResultsDrawerProps>
> = ({ open, onClose, showUpcomingAuctionResults }) => {
  return (
    <Drawer zIndex={Z.dropdown} open={open} onClose={onClose} anchor="left">
      <Box p={2} minWidth={375} position="relative">
        <Flex alignItems="center">
          <Text variant="xs" flex={1}>
            Filters
          </Text>

          <ModalClose onClick={onClose} />
        </Flex>

        <Spacer y={4} />

        <AuctionFilters
          showUpcomingAuctionResults={showUpcomingAuctionResults}
        />
      </Box>
    </Drawer>
  )
}
