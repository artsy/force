import { Box, Button, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { RouterLink } from "System/Components/RouterLink"

export const InquiryConfirmation: React.FC = () => {
  const { context, dispatchCreateAlert, next } = useInquiryContext()

  return (
    <Box>
      <Text variant="lg-display" mb={2} pr={2}>
        Your message has been sent
      </Text>

      <Spacer y={4} />

      <Box p={1} backgroundColor="black10">
        <Text variant="sm-display">
          We'll send you an email if the gallery replies to your inquiry.
        </Text>
      </Box>

      <Text variant="sm-display" my={2}>
        Conversation with the gallery will continue{" "}
        <RouterLink inline to="/user/conversations" onClick={next}>
          in the Inbox.
        </RouterLink>
      </Text>

      <Button onClick={next} width="100%">
        Continue Browsing
      </Button>

      {context.current?.enableCreateAlert && (
        <Button
          onClick={dispatchCreateAlert}
          width="100%"
          mt={1}
          variant="secondaryBlack"
        >
          Create Alert
        </Button>
      )}
    </Box>
  )
}
