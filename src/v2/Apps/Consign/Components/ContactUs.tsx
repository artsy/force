import React from "react"
import { Button, Flex, Link, Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"
import { Media } from "v2/Utils/Responsive"

export const ContactUs: React.FC<{ darkVariant?: boolean }> = ({
  darkVariant,
}) => {
  return (
    <SectionContainer background={darkVariant ? "black100" : "black5"}>
      <Text
        width="100%"
        textAlign="left"
        mb={3}
        variant="largeTitle"
        color={darkVariant ? "white100" : "black100"}
      >
        Questions? Speak to an Artsy Specialist
      </Text>
      <Flex flexDirection="row" flexWrap="wrap" mb={3}>
        <Text variant="text" color={darkVariant ? "black5" : "black60"}>
          Email us at <b>consign@artsy.net</b> or call <b>+1-646-797-3423</b>{" "}
          for more information on how Artsy can sell your artwork.
        </Text>
      </Flex>
      <Media greaterThanOrEqual="sm">
        <Link href="mailto:consign@artsy.net">
          <Button variant="secondaryOutline">Send an email</Button>
        </Link>
      </Media>
      <Media lessThan="sm">
        <Link href="mailto:consign@artsy.net">
          <Button variant="secondaryOutline" size="large" block width="100%">
            Send an email
          </Button>
        </Link>
      </Media>
    </SectionContainer>
  )
}
