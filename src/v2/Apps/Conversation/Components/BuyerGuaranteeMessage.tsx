import React from "react"
import { Flex, Text } from "@artsy/palette"

export const BuyerGuaranteeMessage: React.FC = () => {
  return (
    <Flex
      maxWidth="445px"
      bg="black5"
      p={2}
      m={1}
      mb={3}
      flexDirection="column"
    >
      <Text color="black60" fontWeight="bold" variant="sm">
        Be Protected by The Artsy Guarantee
      </Text>
      <Text color="black60" variant="xs" my={0.5}>
        To remain eligible for our buyer protections:
      </Text>
      <Text color="black60" variant="xs">
        • Keep all communications on Artsy
      </Text>
      <Text color="black60" variant="xs">
        • Never type sensitive information into this chat
      </Text>
      <Text color="black60" variant="xs">
        • Complete your purchase with Artsy’s secure checkout
      </Text>
    </Flex>
  )
}
