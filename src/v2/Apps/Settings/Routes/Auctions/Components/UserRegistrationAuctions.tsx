import { Box, Button, Column, Flex, GridColumns, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { UserRegistrationAuctions_me } from "v2/__generated__/UserRegistrationAuctions_me.graphql"

interface UserRegistrationAuctionsProps {
  me: UserRegistrationAuctions_me
}

export const UserRegistrationAuctions: React.FC<UserRegistrationAuctionsProps> = ({
  me,
}) => {
  const saleRegistrations = extractNodes(me?.saleRegistrationsConnection)

  return (
    <Box mt={16} mb={16}>
      <Text variant={["sm", "lg"]} mt={4} mb={[2, 4]}>
        Registration for Upcoming Auctions
      </Text>

      {saleRegistrations.length ? (
        <GridColumns mb={6}>
          {saleRegistrations.map((sale, i) => (
            <Column
              key={i}
              span={8}
              pb={2}
              display="flex"
              justifyContent="space-between"
              borderBottom={i + 1 < saleRegistrations.length ? "1px solid" : ""}
              borderColor="black10"
            >
              <Flex flexDirection="column">
                <Text color="black80" variant="sm">
                  {sale?.sale?.name}
                </Text>
                <Text color="black60" variant="sm">
                  {sale?.sale?.startAt}
                </Text>
              </Flex>

              <Flex>
                <RouterLink to={sale?.sale?.href ?? ""} noUnderline>
                  <Button size="medium">Register</Button>
                </RouterLink>
              </Flex>
            </Column>
          ))}
        </GridColumns>
      ) : (
        <Text mb={4} color="black60" variant="sm">
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
        saleRegistrationsConnection(
          published: true
          isAuction: true
          sort: CREATED_AT_DESC
          first: 10
          registered: false
        ) {
          edges {
            node {
              sale {
                id
                name
                href
                startAt(format: "MMMM D, h:mmA")
                isClosed
              }
            }
          }
        }
      }
    `,
  }
)
