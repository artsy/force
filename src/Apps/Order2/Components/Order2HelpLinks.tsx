import type { ContextModule } from "@artsy/cohesion"
import MessageIcon from "@artsy/icons/MessageIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { useOrder2Tracking } from "Apps/Order2/Hooks/useOrder2Tracking"
import {
  type WithInquiryProps,
  withInquiry,
} from "Components/Inquiry/useInquiry"
import type { Order2HelpLinks_order$key } from "__generated__/Order2HelpLinks_order.graphql"
import type React from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"

interface Order2HelpLinksProps extends WithInquiryProps {
  order: Order2HelpLinks_order$key
  contextModule: ContextModule
}

export const Order2HelpLinks: React.FC<
  React.PropsWithChildren<Order2HelpLinksProps>
> = ({ showInquiry, order, inquiryComponent, contextModule }) => {
  const orderData = useFragment(fragment, order)
  const tracking = useOrder2Tracking(orderData.source, orderData.mode)

  const onClickReadFAQ = () => {
    tracking.clickedVisitHelpCenter(contextModule)
    window.open(
      "https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy",
      "_blank",
    )
  }

  const onClickAskSpecialist = () => {
    tracking.clickedAskSpecialist(contextModule)
    showInquiry({ askSpecialist: true })
  }

  return (
    <>
      {inquiryComponent}

      <Box px={[2, 4]} py={2} backgroundColor={["mono5", "mono5", "mono0"]}>
        <Flex>
          <MessageIcon fill="mono100" mt={0.5} />

          <Spacer x={1} />

          <Box>
            <Text variant="sm" color="mono100" fontWeight="medium">
              Need help?
            </Text>

            <Text variant="xs" color="mono60">
              <Clickable
                data-test="help-center-link"
                data-context={orderData.internalID}
                textDecoration="underline"
                onClick={onClickReadFAQ}
              >
                Visit our help center
              </Clickable>
              {" or "}
              <Clickable
                data-test="ask-question-link"
                data-context={orderData.internalID}
                textDecoration="underline"
                onClick={onClickAskSpecialist}
              >
                ask a question
              </Clickable>
              .
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

const fragment = graphql`
  fragment Order2HelpLinks_order on Order {
    internalID
    mode
    source
  }
`

export const Order2HelpLinksWithInquiry = withInquiry(Order2HelpLinks)
