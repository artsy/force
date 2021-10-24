import { Column, Flex, Text } from "@artsy/palette"
import React from "react"

interface UserBidHistoryProps {
  // TODO
  closedSale: any
  shouldDisplayBorderBottom: boolean
}

export const UserBidHistory: React.FC<UserBidHistoryProps> = ({
  closedSale,
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
        <Text>{closedSale.name}</Text>
      </Flex>
    </Column>
  )
}
