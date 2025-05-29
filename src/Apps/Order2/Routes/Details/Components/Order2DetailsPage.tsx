import MessageIcon from "@artsy/icons/MessageIcon"

import {
  Box,
  Clickable,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { Order2DetailsFulfillmentInfo } from "Apps/Order2/Routes/Details/Components/Order2DetailsFulfillmentInfo"
import { Order2DetailsOrderSummary } from "Apps/Order2/Routes/Details/Components/Order2DetailsOrderSummary"
import { Order2DetailsPaymentInfo } from "Apps/Order2/Routes/Details/Components/Order2DetailsPaymentInfo"
import type { Order2DetailsPage_order$key } from "__generated__/Order2DetailsPage_order.graphql"
import { graphql, useFragment } from "react-relay"
import { Order2DetailsHeader } from "./Order2DetailsHeader"
import { Order2DetailsMessage } from "./Order2DetailsMessage"

interface Order2DetailsPageProps {
  order: Order2DetailsPage_order$key
}

export const Order2DetailsPage = ({ order }: Order2DetailsPageProps) => {
  const orderData = useFragment(FRAGMENT, order)

  return (
    <GridColumns backgroundColor="mono5">
      <Column span={[12]} maxWidth="754px">
        <Order2DetailsHeader order={orderData} />

        <Order2DetailsMessage order={orderData} />

        <Order2DetailsOrderSummary order={orderData} />

        <Spacer y={1} />

        <Order2DetailsFulfillmentInfo order={orderData} />

        <Spacer y={1} />

        <Order2DetailsPaymentInfo order={orderData} />

        {/* Help section */}
        <Box p={2}>
          <Flex>
            <MessageIcon fill="mono100" />
            <Spacer x={1} />
            <Box>
              <Text variant="sm" color="mono100" fontWeight={500}>
                Need help?
              </Text>
              <Text variant="xs" color="mono100">
                <Clickable
                  data-test="help-center-link"
                  textDecoration="underline"
                  onClick={onClickReadFAQ}
                >
                  {" "}
                  Visit our help center
                </Clickable>{" "}
                or{" "}
                <Clickable
                  data-test="ask-question-link"
                  textDecoration="underline"
                  onClick={onClickAskSpecialist}
                >
                  ask a question
                </Clickable>
              </Text>
            </Box>
          </Flex>
        </Box>
      </Column>
    </GridColumns>
  )
}

const FRAGMENT = graphql`
  fragment Order2DetailsPage_order on Order {
    ...Order2DetailsHeader_order
    ...Order2DetailsMessage_order
    ...Order2DetailsOrderSummary_order
    ...Order2PricingBreakdown_order
    ...Order2DetailsPaymentInfo_order
    ...Order2DetailsFulfillmentInfo_order
  }
`

const onClickReadFAQ = () => {
  // TODO: track event?
  window.open(
    "https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy",
    "_blank",
  )
}

const onClickAskSpecialist = () => {
  // TODO: track event?
  // What should it link to? On regular footer it's some inquiry question see StickyFooter.tsx
}
