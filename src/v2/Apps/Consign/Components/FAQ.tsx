import React from "react"
import { Box, Text, Toggle } from "@artsy/palette"

export const FAQ: React.FC = () => {
  return (
    <Box>
      <Box>
        <Text variant="title">Frequently Asked Questions</Text>
      </Box>
      <Box>
        <Toggle label="How does selling on Artsy work?">
          <Text variant="text">
            Artsy helps you find the best sales solution for works in your
            collection. We review the works you’re interested in selling,
            determine the strength of the secondary market demand, and suggest
            an appropriate sales strategy. This can involve matching you with
            the right seller (e.g., an auction house or a gallery), selling
            qualified works via Artsy’s online marketplace, or selling the work
            privately through our network of trusted partners and collectors.
            This service is free, and the nominal, pre-agreed seller’s
            commission is due only when your work sells. Artsy specialists guide
            you along the way and help you choose the right sales strategy. To
            get started, submit works you’re interested in selling here.
          </Text>
        </Toggle>
      </Box>
    </Box>
  )
}
