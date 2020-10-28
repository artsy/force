import React from "react"
import { Button, Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const ContactUs: React.FC = () => {
  return (
    <SectionContainer background="black5">
      <Text width="100%" textAlign="left" mb={3} variant="largeTitle">
        Need to speak to a specialist? Contact us.
      </Text>

      <Text variant="text" color="black60" mb={4}>
        Schedule a call with one of our specialist team members for <br />
        more information on how Artsy can sell your artwork.
      </Text>

      <Button variant="secondaryOutline">Book an appointment</Button>
    </SectionContainer>
  )
}
