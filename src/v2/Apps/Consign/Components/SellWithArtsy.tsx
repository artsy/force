import React from "react"
import { Box, Button, Flex, Image, Text } from "@artsy/palette"

export const SellWithArtsy: React.FC = () => {
  return (
    <Box>
      <Flex>
        <Box>
          <Text variant="title"> Sell with artsy</Text>
          <Text variant="text">Selling art differently</Text>
          <Button>Download the app</Button>
        </Box>
        <Box>
          <Image src="" />
        </Box>
      </Flex>
    </Box>
  )
}
