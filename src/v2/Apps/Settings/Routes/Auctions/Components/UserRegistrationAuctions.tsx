import { Column, Flex, Text } from "@artsy/palette"
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
      <Flex>
        <Text>{sale.name}</Text>
      </Flex>
    </Column>
  )
}
