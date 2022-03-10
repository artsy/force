import React from "react"
import {
  Separator,
  Spacer,
  Flex,
  Button,
  BellIcon,
  Text,
  Box,
} from "@artsy/palette"

export const CreateArtworkAlertSection: React.FC = () => {
  return (
    <Box my={2}>
      <Separator />
      <Spacer m={2} />
      <Flex
        flexDirection="row"
        py={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text variant="xs" mr={2}>
          Be notified when a similar piece is available
        </Text>
        <Button variant="secondaryOutline" size="small">
          <BellIcon mr={0.5} fill="currentColor" />
          <Text variant="xs">Create Alert</Text>
        </Button>
      </Flex>
    </Box>
  )
}
