import { Button, Column, Flex, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import React from "react"

interface UserRegistrationAuctionsProps {
  // TODO
  sale: any
  shouldDisplayBorderBottom: boolean
}

export const UserRegistrationAuctions: React.FC<UserRegistrationAuctionsProps> = ({
  sale,
  shouldDisplayBorderBottom,
}) => {
  return (
    <Column
      span={8}
      pb={2}
      display="flex"
      justifyContent="space-between"
      borderBottom={shouldDisplayBorderBottom ? "1px solid" : ""}
      borderColor="black10"
    >
      <Flex flexDirection="column">
        <Text>{sale.name}</Text>
        <Text>{sale.startAt}</Text>
      </Flex>

      <Flex>
        <RouterLink to={sale.href} noUnderline>
          <Button size="medium">Register</Button>
        </RouterLink>
      </Flex>
    </Column>
  )
}
