import { Button, Column, Flex, GridColumns, Text } from "@artsy/palette"
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

  if (!saleRegistrations) {
    return null
  }

  return (
    <>
      <Text variant={["sm", "lg"]} mt={4} mb={[2, 4]}>
        Registration for Upcoming Auctions
      </Text>

      <GridColumns mb={6}>
        {saleRegistrations.map((sale, i) => {
          if (!sale?.sale) {
            return null
          }

          return (
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
                  {sale.sale.name ?? ""}
                </Text>
                <Text color="black60" variant="sm">
                  {sale.sale.startAt ?? ""}
                </Text>
              </Flex>

              <Flex>
                <Button
                  // @ts-ignore
                  as={RouterLink}
                  to={sale.sale.href ?? ""}
                  size="medium"
                >
                  Register
                </Button>
              </Flex>
            </Column>
          )
        })}
      </GridColumns>
    </>
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
