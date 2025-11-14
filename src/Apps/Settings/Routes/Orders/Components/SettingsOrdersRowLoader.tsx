import { Text } from "@artsy/palette"
import type { SettingsOrdersRowLoaderQuery } from "__generated__/SettingsOrdersRowLoaderQuery.graphql"
import type { FC } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { SettingsOrdersRowFragmentContainer } from "./SettingsOrdersRow"

interface SettingsOrdersRowLoaderProps {
  orderInternalID: string
}

export const SettingsOrdersRowLoader: FC<SettingsOrdersRowLoaderProps> = ({
  orderInternalID,
}) => {
  const data = useLazyLoadQuery<SettingsOrdersRowLoaderQuery>(QUERY, {
    orderID: orderInternalID,
  })

  if (!data.me?.order) {
    return <Text>Order not found</Text>
  }

  return <SettingsOrdersRowFragmentContainer order={data.me.order} />
}

const QUERY = graphql`
  query SettingsOrdersRowLoaderQuery($orderID: ID!) {
    me {
      order(id: $orderID) {
        ...SettingsOrdersRow_order
      }
    }
  }
`
