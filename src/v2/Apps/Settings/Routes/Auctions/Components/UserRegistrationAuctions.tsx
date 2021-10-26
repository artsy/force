import { Box, Button, Column, Flex, GridColumns, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import React from "react"
import { extractNodes } from "v2/Utils/extractNodes"
import { SettingsAuctionsRoute_me } from "v2/__generated__/SettingsAuctionsRoute_me.graphql"

interface UserRegistrationAuctionsProps {
  saleRegistrationsConnection: SettingsAuctionsRoute_me["saleRegistrationsConnection"]
}

export const UserRegistrationAuctions: React.FC<UserRegistrationAuctionsProps> = ({
  saleRegistrationsConnection,
}) => {
  const saleRegistrations = extractNodes(saleRegistrationsConnection)

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
