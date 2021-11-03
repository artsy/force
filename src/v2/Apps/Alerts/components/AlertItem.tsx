import {
  BorderBox,
  Clickable,
  Column,
  Flex,
  Spacer,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AlertItem_item } from "v2/__generated__/AlertItem_item.graphql"

interface AlertItemProps {
  item: AlertItem_item
}

const FALLBACK_TITLE = "Untitled Alert"

export const AlertItem: React.FC<AlertItemProps> = ({ item }) => {
  return (
    <Column span={[12, 12, 6]}>
      <BorderBox>
        <Flex flex={1} justifyContent="space-between" alignItems="center">
          <Text color="black80" variant="sm">
            {item.userAlertSettings.name ?? FALLBACK_TITLE}
          </Text>
        </Flex>
        <Flex flexDirection="row">
          <Clickable textDecoration="underline">
            <Text variant="sm">Edit</Text>
          </Clickable>
          <Spacer ml={2} />
          <Clickable textDecoration="underline" color="red100">
            <Text variant="sm">Delete</Text>
          </Clickable>
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
