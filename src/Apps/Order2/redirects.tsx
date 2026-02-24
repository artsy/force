import { newCheckoutEnabled } from "Apps/Order/redirects"
import type { RedirectPredicate, RedirectRecord } from "Apps/Order/getRedirect"
import type { SystemContextProps } from "System/Contexts/SystemContext"
import type { redirects_order2$data } from "__generated__/redirects_order2.graphql"
import { graphql } from "react-relay"

interface Order2Query {
  order: redirects_order2$data
  featureFlags: SystemContextProps["featureFlags"]
}

type Order2Predicate = RedirectPredicate<Order2Query>

const goToDetailsIfOrderIsNotIncomplete: Order2Predicate = ({ order }) => {
  if (order.buyerState !== "INCOMPLETE") {
    return {
      path: `/orders/${order.internalID}/details`,
      reason: "Order is not incomplete",
    }
  }
}

const goToOldCheckoutIfNotEnabled: Order2Predicate = ({
  order,
  featureFlags,
}) => {
  if (!newCheckoutEnabled({ order, featureFlags })) {
    const path =
      order.mode === "OFFER"
        ? `/orders/${order.internalID}/offer`
        : `/orders/${order.internalID}/shipping`
    return {
      path,
      reason: "Order2 checkout is not enabled for this order",
    }
  }
}

const goToCheckoutIfNotOfferOrder: Order2Predicate = ({ order }) => {
  if (order.mode !== "OFFER") {
    return {
      path: `/orders2/${order.internalID}/checkout`,
      reason: "Order is not an offer order",
    }
  }
}

export const order2Redirects: RedirectRecord<Order2Query> = {
  path: "",
  rules: [],
  children: [
    {
      path: "checkout",
      rules: [goToDetailsIfOrderIsNotIncomplete, goToOldCheckoutIfNotEnabled],
    },
    {
      path: "offer",
      rules: [
        goToCheckoutIfNotOfferOrder,
        goToDetailsIfOrderIsNotIncomplete,
        goToOldCheckoutIfNotEnabled,
      ],
    },
  ],
}

graphql`
  fragment redirects_order2 on Order {
    internalID
    mode
    buyerState
  }
`
