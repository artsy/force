import { Button, Column, Flex, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
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
    return (
      <SectionContainer title="Registration for Upcoming Auctions"></SectionContainer>
    )
  }

  return (
    <SectionContainer title="Registration for Upcoming Auctions">
      {saleRegistrations.map((sale, i, a) => {
        if (!sale?.sale) {
          return null
        }

        return (
          <Column
            key={i}
            span={12}
            pb={2}
            display="flex"
            justifyContent="space-between"
            borderBottom={i + 1 < a.length ? "1px solid" : ""}
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
                width="150px"
              >
                Register
              </Button>
            </Flex>
          </Column>
        )
      })}
    </SectionContainer>
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
