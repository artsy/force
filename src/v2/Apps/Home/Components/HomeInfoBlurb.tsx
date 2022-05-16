import * as React from "react"
import { Button, Flex, Join, Text, Spacer, ArtsyLogoIcon } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const HomeInfoBlurb: React.FC = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bg="black5"
      p={4}
    >
      <Join separator={<Spacer mt={2} />}>
        {/* TODO: Unable to adjust width, height, fill, etc... */}
        <ArtsyLogoIcon name="Artsy" />

        <Text as="h1" variant={["lg-display", "xl"]}>
          Collect art from leading galleries, fairs, and auctions
        </Text>

        <Text as="h2" variant={["sm-display", "lg-display"]}>
          Sign up to get updates about your favorite artists
        </Text>

        <Button
          // @ts-ignore
          as={RouterLink}
          to="/signup"
        >
          Sign up
        </Button>
      </Join>
    </Flex>
  )
}
