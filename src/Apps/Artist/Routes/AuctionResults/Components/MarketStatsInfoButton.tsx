import { Box, Clickable, Join, ModalDialog, Spacer, Text } from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import InfoIcon from "@artsy/icons/InfoIcon"

interface MarketStatsInfoButtonProps {
  onClick?: () => void
}

export const MarketStatsInfoButton: React.FC<MarketStatsInfoButtonProps> = ({
  onClick,
}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Clickable
        onClick={() => {
          setShowModal(true)
          onClick?.()
        }}
      >
        <InfoIcon />
      </Clickable>

      {showModal && (
        <ModalDialog title="Market Signals" onClose={() => setShowModal(false)}>
          <Text variant="sm">
            <Join separator={<Spacer y={2} />}>
              <Box>
                The following data points provide an overview of an artist’s
                auction market for a specific medium (e.g., photography,
                painting) over the past 36 months.
              </Box>

              <Box>
                These market signals bring together data from top auction houses
                around the world, including Christie’s, Sotheby’s, Phillips,
                Bonhams, and Heritage.
              </Box>

              <Box>
                In this data set, please note that the sale price includes the
                hammer price and buyer’s premium, as well as any other
                additional fees (e.g., Artist’s Resale Rights).
              </Box>

              <Box>
                <Box as="strong">Yearly lots sold</Box>

                <Spacer y={0.5} />

                <Box>
                  The average number of lots sold per year at auction over the
                  past 36 months.
                </Box>
              </Box>

              <Box>
                <Box as="strong">Sell-through rate</Box>

                <Spacer y={0.5} />

                <Box>
                  The percentage of lots in auctions that sold over the past 36
                  months.
                </Box>
              </Box>

              <Box>
                <Box as="strong">Average sale price</Box>

                <Spacer y={0.5} />

                <Box>
                  The average sale price of lots sold at auction over the past
                  36 months.
                </Box>
              </Box>

              <Box>
                <Box as="strong">Sale price over estimate</Box>

                <Spacer y={0.5} />

                <Box>
                  The average percentage difference of the sale price over the
                  mid-estimate (the midpoint of the low and high estimates set
                  by the auction house before the auction takes place) for lots
                  sold at auction over the past 36 months.
                </Box>
              </Box>
            </Join>
          </Text>
        </ModalDialog>
      )}
    </>
  )
}
