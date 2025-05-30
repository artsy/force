import MessageIcon from "@artsy/icons/MessageIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import type { Order2DetailsHelpLinks_order$key } from "__generated__/Order2DetailsHelpLinks_order.graphql"
import type React from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"

interface Order2DetailsHelpLinksProps {
  order: Order2DetailsHelpLinks_order$key
}

export const Order2DetailsHelpLinks: React.FC<Order2DetailsHelpLinksProps> = ({
  order,
}) => {
  const orderData = useFragment(fragment, order)

  return (
    <Box p={2}>
      <Flex>
        <MessageIcon fill="mono100" mt={0.5} />

        <Spacer x={1} />

        <Box>
          <Text variant="sm" color="mono100" fontWeight="bold">
            Need help?
          </Text>

          <Spacer y={0.5} />

          <Text variant="xs" color="mono100">
            <Clickable
              data-test="help-center-link"
              data-context={orderData.internalID}
              textDecoration="underline"
              onClick={onClickReadFAQ}
            >
              {" "}
              Visit our help center
            </Clickable>{" "}
            or{" "}
            <Clickable
              data-test="ask-question-link"
              data-context={orderData.internalID}
              textDecoration="underline"
              onClick={onClickAskSpecialist}
            >
              ask a question
            </Clickable>
          </Text>
        </Box>
      </Flex>
      <Spacer y={4} />
    </Box>
  )
}

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

const fragment = graphql`
  fragment Order2DetailsHelpLinks_order on Order {
    internalID
  }
`
