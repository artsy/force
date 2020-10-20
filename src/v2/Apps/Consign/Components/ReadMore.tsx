import React from "react"
import { Box, Flex, Image, Text } from "@artsy/palette"

export const ReadMore: React.FC = () => {
  return (
    <Box>
      <Box>
        <Text variant="title">Read more about selling your artwork</Text>
      </Box>
      <Flex>
        <Box>
          <Box>
            <Text variant="text">
              A Beginner’s Guide to Consigning Your Art for Sale
            </Text>
            <Text variant="text">Artsy Editorial</Text>
          </Box>
          <Box>
            <Image src="" />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
