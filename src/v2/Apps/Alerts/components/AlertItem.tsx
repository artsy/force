import { BorderBox, Button, Column, Flex, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AlertItem_item } from "v2/__generated__/AlertItem_item.graphql"

interface AlertItemProps {
  item: AlertItem_item
}

export const AlertItem: React.FC<AlertItemProps> = ({ item }) => {
  return (
    <Column span={[12, 12, 6, 4]}>
      <BorderBox>
        <Flex flex={1} justifyContent="space-between" alignItems="center">
          <Text color="black80" variant="sm">
            {item.userAlertSettings.name}
          </Text>
        </Flex>
        <Flex flexDirection="row" ml={1}>
          <Button variant="secondaryOutline" size="small">
            Delete
          </Button>
          <Spacer ml={1} />
          <Button size="small">Edit</Button>
        </Flex>
      </BorderBox>
    </Column>
  )
}

export const AlertItemFragmentContainer = createFragmentContainer(AlertItem, {
  item: graphql`
    fragment AlertItem_item on SearchCriteria {
      internalID
      userAlertSettings {
        name
      }
    }
  `,
})
