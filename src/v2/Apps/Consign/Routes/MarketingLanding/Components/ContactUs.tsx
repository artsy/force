import { Button, FullBleed, Text } from "@artsy/palette"
import * as React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

export const ContactUs: React.FC = () => {
  return (
    <FullBleed bg="black5">
      <AppContainer>
        <HorizontalPadding py={[2, 4]}>
          <Text variant="xl" mb={2}>
            Questions? Speak to an Artsy Specialist
          </Text>

          <Text data-testid="contactUsBody" variant="sm" mb={4}>
            Email us at <a href="mailto:sell@artsy.net">sell@artsy.net</a> or
            call <a href="tel:!1-646-797-3423">+1-646-797-3423</a> for more
            information on how Artsy can sell your artwork.
          </Text>

          <Button
            variant="secondaryOutline"
            // @ts-ignore
            as="a"
            href="mailto:sell@artsy.net"
          >
            Send an email
          </Button>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
