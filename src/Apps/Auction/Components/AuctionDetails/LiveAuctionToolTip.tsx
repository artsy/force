import { Box, Spacer, Text, Tooltip } from "@artsy/palette"
import HelpIcon from "@artsy/icons/HelpIcon"

interface LiveAuctionToolTipProps {
  show: boolean
}

export const LiveAuctionToolTip: React.FC<LiveAuctionToolTipProps> = ({
  show,
}) => {
  if (!show) {
    return null
  }

  return (
    <Box>
      <Text
        variant="sm-display"
        display="flex"
        alignItems="center"
        lineHeight={1}
      >
        Live Auction <Spacer x={0.5} />
        <Tooltip
          content="Participating in a live auction means you’ll be competing
					against bidders in real time on an auction room floor. You can
					place max bids which will be represented by Artsy in the
					auction room or you can bid live when the auction opens."
          placement="bottom"
        >
          {/* Icons don't forwardRefs so we have to wrap in a span */}
          <Box as="span" style={{ lineHeight: 0 }}>
            <HelpIcon width={25} height={25} />
          </Box>
        </Tooltip>
      </Text>
    </Box>
  )
}
