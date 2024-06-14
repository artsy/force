import { Button, Column, Separator, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { extractNodes } from "Utils/extractNodes"
import { UserRegistrationAuctions_me$data } from "__generated__/UserRegistrationAuctions_me.graphql"

interface UserRegistrationAuctionsProps {
  me: UserRegistrationAuctions_me$data
}

export const UserRegistrationAuctions: React.FC<UserRegistrationAuctionsProps> = ({
  me,
}) => {
  const saleRegistrations = extractNodes(me?.saleRegistrationsConnection)

  if (!saleRegistrations) {
    return <SectionContainer title="Registration for Upcoming Auctions" />
  }

  return (
    <SectionContainer title="Registration for Upcoming Auctions">
      {saleRegistrations.map(({ isRegistered, sale }, i) => {
        if (!sale || sale.isClosed || sale.isRegistrationClosed) {
          return null
        }

        return (
          <React.Fragment key={i}>
            <Column span={10}>
              <RouterLink to={sale.href} display="block" textDecoration="none">
                {sale.name && <Text variant="sm">{sale.name}</Text>}

                {sale.startAt && (
                  <Text color="black60" variant="sm">
                    {sale.startAt}
                  </Text>
                )}
              </RouterLink>
            </Column>

            <Column span={2}>
              <Button
                width="100%"
                // @ts-ignore
                as={RouterLink}
                to={sale.href}
                disabled={!!isRegistered}
              >
                {isRegistered ? "Registered" : "Register"}
              </Button>
            </Column>

            {i !== saleRegistrations.length - 1 && (
              <Column span={12}>
                <Separator />
              </Column>
            )}
          </React.Fragment>
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
              isRegistered
              sale {
                id
                name
                href
                startAt(format: "MMMM D, h:mmA")
                isClosed
                isRegistrationClosed
              }
            }
          }
        }
      }
    `,
  }
)
