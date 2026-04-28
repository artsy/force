import { Analytics } from "System/Contexts/AnalyticsContext"
import { OrderErrorApp } from "Apps/Order2/Components/Order2ErrorApp"
import { NOT_FOUND_ERROR } from "Apps/Order2/constants"
import { Order2RespondApp } from "Apps/Order2/Routes/Respond/Order2RespondApp"
import { Order2RespondContextProvider } from "Apps/Order2/Routes/Respond/RespondContext/Order2RespondContext"
import type { Order2RespondRoute_viewer$key } from "__generated__/Order2RespondRoute_viewer.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2RespondRouteProps {
  viewer: Order2RespondRoute_viewer$key
}

export const Order2RespondRoute: React.FC<Order2RespondRouteProps> = ({
  viewer,
}) => {
  const data = useFragment(FRAGMENT, viewer)
  const me = data.me
  const order = me?.order

  if (!(order && me)) {
    return <OrderErrorApp code={404} message={NOT_FOUND_ERROR} />
  }

  return (
    <Analytics contextPageOwnerId={order.internalID}>
      <Order2RespondContextProvider order={order}>
        <Order2RespondApp order={order} />
      </Order2RespondContextProvider>
    </Analytics>
  )
}

const FRAGMENT = graphql`
  fragment Order2RespondRoute_viewer on Viewer
  @argumentDefinitions(orderID: { type: "ID!" }) {
    me {
      order(id: $orderID) {
        internalID
        ...Order2RespondContext_order
        ...Order2RespondApp_order
      }
    }
  }
`
