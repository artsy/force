import React, { FC } from "react"
import { Box, Button, Flex, MenuIcon, Separator, Text } from "@artsy/palette"

const Curator: FC = ({ children }) => {
  return (
    <Box mt={4}>
      <Flex justifyContent="space-between">
        <Text variant="xl">Curator</Text>
        <Button variant="noOutline" px={15} style={{}}>
          <MenuIcon />
        </Button>
      </Flex>
      <Separator my={4} />
      <Flex width="100%" alignItems="center" justifyContent="center">
        {children}
      </Flex>
    </Box>
  )
}

const CuratorAppFragmentContainer: FC = () => {
  return <Curator />
}

export { CuratorAppFragmentContainer }
