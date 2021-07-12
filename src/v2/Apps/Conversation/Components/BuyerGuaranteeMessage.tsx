import { Flex, Text } from "@artsy/palette"
import React from "react"

export const BuyerGuaranteeMessage: React.FC = () => {
  return (
    <Flex
      maxWidth="415px"
      bg="black5"
      p={2}
      m={1}
      mb={3}
      flexDirection="column"
    >
      <Text color="black60" variant="mediumText">
        Be Protected by The Artsy Guarantee
      </Text>
      <Text color="black60" variant="small" my={0.5}>
        To remain eligible for our buyer protections:{" "}
      </Text>
      <Text color="black60" variant="small">
        • Keep all communications on Artsy
      </Text>
      <Text color="black60" variant="small">
        • Never type sensitive information into this chat
      </Text>
      <Text color="black60" variant="small">
        • Complete your purchase with Artsy’s secure checkout
      </Text>
    </Flex>
  )
}
