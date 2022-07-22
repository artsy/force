import { Box, InfoCircleIcon, Modal, Text } from "@artsy/palette"
import { useState } from "react";
import * as React from "react";

interface MarketStatsInfoButtonProps {
  onClick?: () => void
}
export const MarketStatsInfoButton: React.FC<MarketStatsInfoButtonProps> = ({
  onClick,
}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <InfoCircleIcon
        onClick={() => {
          setShowModal(true)
          onClick?.()
        }}
      />
      <Modal
        title="Market Signals"
        show={showModal}
        onClose={() => setShowModal(false)}
        isWide
      >
        <Box>
          <Box pb={2}>
            <Text variant="sm">
              <p>
                The following data points provide an overview of an artist’s
                auction market for a specific medium (e.g., photography,
                painting) over the past 36 months.
              </p>
              <p>
                These market signals bring together data from top auction houses
                around the world, including Christie’s, Sotheby’s, Phillips,
                Bonhams, and Heritage.
              </p>
              <p>
                In this data set, please note that the sale price includes the
                hammer price and buyer’s premium, as well as any other
                additional fees (e.g., Artist’s Resale Rights).
              </p>
            </Text>
          </Box>
          <Box>
            <Box pb={2}>
              <Text variant="sm" fontWeight="bold" pb={0.5}>
                Yearly lots sold
              </Text>
              <Text variant="sm">
                The average number of lots sold per year at auction over the
                past 36 months.
              </Text>
            </Box>
            <Box pb={2}>
              <Text variant="sm" fontWeight="bold" pb={0.5}>
                Sell-through rate
              </Text>
              <Text variant="sm">
                The percentage of lots in auctions that sold over the past 36
                months.
              </Text>
            </Box>
            <Box pb={2}>
              <Text variant="sm" fontWeight="bold" pb={0.5}>
                Average sale price
              </Text>
              <Text variant="sm">
                The average sale price of lots sold at auction over the past 36
                months.
              </Text>
            </Box>
            <Box pb={2}>
              <Text variant="sm" fontWeight="bold" pb={0.5}>
                Sale price over estimate
              </Text>
              <Text variant="sm">
                The average percentage difference of the sale price over the
                mid-estimate (the midpoint of the low and high estimates set by
                the auction house before the auction takes place) for lots sold
                at auction over the past 36 months.
              </Text>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
