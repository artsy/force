import { Box, Button, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { RouterLink } from "System/Router/RouterLink"

export const InquiryConfirmation: React.FC = () => {
  const { next } = useInquiryContext()

  return (
    <Box>
      <Text variant="lg-display" mb={2} pr={2}>
        Your message has been sent
      </Text>

      <Spacer mt={4} />

      <Box p={1} backgroundColor="black10">
        <Text variant="sm">
          The seller should respond to your inquiry within 3 days.
        </Text>
      </Box>

      <Text variant="sm" my={2}>
        Conversation with the gallery will continue{" "}
        <RouterLink to="/user/conversations" onClick={next}>
          in the Inbox.
        </RouterLink>
      </Text>

      <Button onClick={next} width="100%">
        Continue Browsing
      </Button>
    </Box>
  )
}
