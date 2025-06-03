import MessageIcon from "@artsy/icons/MessageIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import type { Order2DetailsHelpLinks_order$key } from "__generated__/Order2DetailsHelpLinks_order.graphql"
import { withInquiry, WithInquiryProps } from "Components/Inquiry/useInquiry"
import type React from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"

interface Order2DetailsHelpLinksProps extends WithInquiryProps {
  order: Order2DetailsHelpLinks_order$key
}

export const Order2DetailsHelpLinks: React.FC<
  React.PropsWithChildren<Order2DetailsHelpLinksProps>
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

            <Text variant="xs" color="mono100">
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
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

const fragment = graphql`
  fragment Order2DetailsHelpLinks_order on Order {
    internalID
  }
`

export const Order2DetailsHelpLinksWithInquiry = withInquiry(
  Order2DetailsHelpLinks,
)
