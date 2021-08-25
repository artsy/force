import { CircleBlackCheckIcon, Flex, Link, Text } from "@artsy/palette"
import React from "react"

export const BUYER_GUARANTEE_URL =
  "https://support.artsy.net/hc/en-us/articles/360048946973-How-does-Artsy-protect-me"

export const BuyerGuarantee: React.FC = () => {
  return (
    <Flex p={2} my={1} backgroundColor="black10">
      <CircleBlackCheckIcon mr={1} />
      <Flex flexDirection="column">
        <Text fontWeight="bold" variant="md">
          Your purchase is protected.
        </Text>
        <Text variant="xs" color="black60">
          Learn more about{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={BUYER_GUARANTEE_URL}
          >
            Artsy’s buyer protection.
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}
