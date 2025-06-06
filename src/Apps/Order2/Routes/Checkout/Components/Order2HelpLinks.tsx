import MessageIcon from "@artsy/icons/MessageIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
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
}

export const Order2HelpLinks: React.FC<
  React.PropsWithChildren<Order2HelpLinksProps>
> = ({ showInquiry, order, inquiryComponent }) => {
  const orderData = useFragment(fragment, order)

  const onClickReadFAQ = () => {
    // TODO: track event?
    window.open(
      "https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy",
      "_blank",
    )
  }

  const onClickAskSpecialist = () => {
    // TODO: track event?
    showInquiry({ askSpecialist: true })
  }

  return (
    <>
      {inquiryComponent}

      <Box p={2} backgroundColor={["mono5", "mono5", "mono0"]}>
        <Flex>
          <MessageIcon fill="mono100" mt={0.5} />

          <Spacer x={1} />

          <Box>
            <Text variant="sm" color="mono100" fontWeight="bold">
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
  }
`

export const Order2HelpLinksWithInquiry = withInquiry(Order2HelpLinks)
