import { Flex, Spacer, Text } from "@artsy/palette"
import * as React from "react"

export const HomeTrustedBy: React.FC = () => {
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <Text variant={"xl"}>Trusted by galleries the world over</Text>

      <Spacer my={[2, 4]} />

      <Flex
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        width={"100%"}
      >
        <Flex flex={1} justifyContent={"center"} mx={4}>
          <Text variant={"lg"}>White Cube</Text>
        </Flex>
        <Flex flex={1} justifyContent={"center"} mx={4}>
          <Text variant={"lg"}>David Zwirner</Text>
        </Flex>

        <Flex flex={1} justifyContent={"center"} mx={4}>
          <Text variant={"lg"}>Gagosian Gallery</Text>
        </Flex>

        <Flex flex={1} justifyContent={"center"} mx={4}>
          <Text variant={"lg"}>König Galerie</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
