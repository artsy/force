import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Column,
  GridColumns,
  Separator,
  Spacer,
  breakpoints,
} from "@artsy/palette"
import { OrderErrorApp } from "Apps/Order2/Components/Order2ErrorApp"
import { Order2HelpLinksWithInquiry } from "Apps/Order2/Components/Order2HelpLinks"
import { Order2CollapsibleOrderSummary } from "Apps/Order2/Routes/Checkout/Components/Order2CollapsibleOrderSummary"
import { Order2RespondSummary } from "Apps/Order2/Routes/Respond/Components/Order2RespondSummary"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Order2RespondContext"
import { NOT_FOUND_ERROR } from "Apps/Order2/constants"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { Order2RespondApp_order$key } from "__generated__/Order2RespondApp_order.graphql"
import { Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"

interface Order2RespondAppProps {
  order: Order2RespondApp_order$key
}

export const Order2RespondApp: React.FC<Order2RespondAppProps> = ({
  order,
}) => {
  const { isEigen } = useSystemContext()
  const { checkoutTracking, artworkPath } = useRespondContext()

  const orderData = useFragment(ORDER_FRAGMENT, order)
  const artworkSlug = orderData?.lineItems[0]?.artwork?.slug

  if (!order) {
    return <OrderErrorApp code={404} message={NOT_FOUND_ERROR} />
  }

  return (
    <>
      <Title>Respond to Offer | Artsy</Title>
      <Meta
        name="viewport"
        content={
          isEigen
            ? "width=device-width, user-scalable=no"
            : "width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        }
      />
      <GridColumns px={[0, 0, 4]} py={[0, 4]}>
        <Column span={[12, 12, 6]} start={[1, 1, 2]}>
          <Box maxWidth={["100%", breakpoints.sm, "100%"]} mx={[0, "auto", 0]}>
            <Box display={["block", "block", "none"]}>
              <Order2CollapsibleOrderSummary
                order={orderData}
                checkoutTracking={checkoutTracking}
                artworkPath={artworkPath}
                contextModule={ContextModule.ordersRespond}
              />
            </Box>
            <Spacer y={2} />
            <Box>{/* Respond form will go here */}</Box>
          </Box>
        </Column>

        <Column
          span={[12, 12, 4]}
          start={[1, 1, 8]}
          display={["none", "none", "block"]}
        >
          <Box position={["initial", "initial", "sticky"]} top="100px">
            <Box>
              <Order2RespondSummary order={orderData} />
            </Box>
            <Separator as="hr" />
            <Order2HelpLinksWithInquiry
              order={orderData}
              artworkID={artworkSlug as string}
              contextModule={ContextModule.ordersRespond}
            />
          </Box>
        </Column>
      </GridColumns>
    </>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2RespondApp_order on Order {
    internalID
    mode
    lineItems {
      artwork {
        slug
      }
    }
    ...Order2CollapsibleOrderSummary_order
    ...Order2RespondSummary_order
    ...Order2HelpLinks_order
  }
`
