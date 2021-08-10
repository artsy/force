import { Box, Spinner } from "@artsy/palette"
import React from "react"
import { graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtworkInquiryExistingUserQuery } from "v2/__generated__/ArtworkInquiryExistingUserQuery.graphql"
import { Screen, useArtworkInquiryContext } from "./ArtworkInquiryContext"

const ArtworkInquiryExistingUserPlaceholder: React.FC = () => {
  return (
    <Box height={400}>
      <Spinner />
    </Box>
  )
}

export const ArtworkInquiryExistingUserQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()
  const { inquiry, navigateTo } = useArtworkInquiryContext()

  return (
    <SystemQueryRenderer<ArtworkInquiryExistingUserQuery>
      environment={relayEnvironment!}
      variables={{ email: inquiry.email }}
      query={graphql`
        query ArtworkInquiryExistingUserQuery($email: String!) {
          user(email: $email) {
            internalID
          }
        }
      `}
      placeholder={<ArtworkInquiryExistingUserPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          navigateTo(Screen.SignUp)
          return null
        }

        // Loading
        if (!props) {
          return <ArtworkInquiryExistingUserPlaceholder />
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
