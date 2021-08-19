import { Button, FullBleed, Text } from "@artsy/palette"
import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

export const BecomePartner: React.FC = () => {
  return (
    <FullBleed bg="black100" color="white100">
      <AppContainer>
        <HorizontalPadding py={[2, 4]}>
          <Text variant="xl" mb={2}>
            Are you a gallerist or art dealer?
          </Text>

          <Text variant="sm" mb={4}>
            Become a partner to sell with Artsy and gain access to the largest
            global online art marketplace.
          </Text>

          <Button
            variant="primaryWhite"
            // @ts-ignore
            as="a"
            href="https://partners.artsy.net/gallery-partnerships"
          >
            Learn More
          </Button>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
