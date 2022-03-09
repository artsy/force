import React from "react"
import { Separator, Spacer, Flex, Button, BellIcon, Text } from "@artsy/palette"

export const CreateArtworkAlertSection: React.FC = () => {
  return (
    <>
      <Separator />
      <Spacer m={2} />
      <Flex
        flexDirection="row"
        py={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex flex={1} justifyContent="flex-start">
          <Text variant="xs">
            Be notified when a similar piece is available
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          <Button variant="secondaryOutline" size="small">
            <BellIcon mr={0.5} fill="currentColor" />
            <Text variant="xs">Create Alert</Text>
          </Button>
        </Flex>
      </Flex>
      <Spacer m={2} />
    </>
  )
}
