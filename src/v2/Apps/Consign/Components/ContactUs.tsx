import React from "react"
import { Box, Button, Text } from "@artsy/palette"

export const ContactUs: React.FC = () => {
  return (
    <Box>
      <Box>
        <Text variant="title">Need to speak to a specialist? Contact us.</Text>
        <Text variant="text">
          Schedule a call with one of our specialist team members for more
          information on how Artsy can sell your artwork.{" "}
        </Text>
      </Box>
      <Button variant="secondaryGray">Book an appointment</Button>
    </Box>
  )
}
