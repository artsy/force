import { Box, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { UserRegistrationAuctions_me } from "v2/__generated__/UserRegistrationAuctions_me.graphql"

interface UserRegistrationAuctionsProps {
  me?: UserRegistrationAuctions_me
}

export const UserRegistrationAuctions: React.FC<UserRegistrationAuctionsProps> = ({
  me,
}) => {
  const sales = me?.saleRegistrationsConnection?.edges ?? []

  console.log({ sales })

  return (
    <Box mb={4}>
      {sales?.length ? (
        sales.map(sale => <Text>{sale?.node?.sale?.isClosed?.toString()}</Text>)
      ) : (
        <Text color="black60" variant="sm">
          Nothing to Show
        </Text>
      )}
    </Box>
  )
}

export const UserRegistrationAuctionsFragmentContainer = createFragmentContainer(
  UserRegistrationAuctions,
  {
    me: graphql`
      fragment UserRegistrationAuctions_me on Me {
        saleRegistrationsConnection {
          edges {
            node {
              isRegistered
              sale {
                name
                href
                id
                isClosed
                startAt
              }
            }
          }
        }
      }
    `,
  }
)
