import * as React from "react"

import { Flex, Link, Text, Spacer } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const StickyFooter: React.FC = () => {
  return (
    <Flex
      position="fixed"
      bottom={0}
      left={0}
      height="46px"
      width="100%"
      borderTop="1px solid"
      borderColor="black10"
      alignItems="center"
      justifyContent="center"
      backgroundColor="white100"
    >
      <Text variant="xs" color="black60">
        Need help?{" "}
        <RouterLink to="mailto: sell@artsy.net">Ask a question</RouterLink>.
      </Text>
      <Spacer mb={2} />
    </Flex>
  )
}
