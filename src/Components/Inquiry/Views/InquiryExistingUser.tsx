import { Box, Spinner } from "@artsy/palette"
import * as React from "react"
import { graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { InquiryExistingUserQuery } from "__generated__/InquiryExistingUserQuery.graphql"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { Screen, useInquiryAccountContext } from "./InquiryAccount"

const InquiryExistingUserPlaceholder: React.FC = () => {
  return (
    <Box height={400}>
      <Spinner />
    </Box>
  )
}

export const InquiryExistingUserQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()
  const { inquiry } = useInquiryContext()
  const { navigateTo } = useInquiryAccountContext()

  return (
    <SystemQueryRenderer<InquiryExistingUserQuery>
      environment={relayEnvironment!}
      variables={{ email: inquiry.email }}
      query={graphql`
        query InquiryExistingUserQuery($email: String!) {
          user(email: $email) {
            internalID
          }
        }
      `}
      placeholder={<InquiryExistingUserPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          navigateTo(Screen.SignUp)
          return null
        }

        // Loading
        if (!props) {
          return <InquiryExistingUserPlaceholder />
        }

        // If there's a user that can be found; navigate to the login screen
        if (props.user && props.user.internalID) {
          navigateTo(Screen.Login)
          return null
        }

        // Otherwise navigate to sign up
        navigateTo(Screen.SignUp)
        return null
      }}
    />
  )
}
