import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { Meta, Title } from "react-head"
import { ExampleApp_system } from "v2/__generated__/ExampleApp_system.graphql"
import { data as sd } from "sharify"
import { Box, Flex, Join, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

export interface ExampleAppProps {
  system: ExampleApp_system
}

const ExampleApp: React.FC<ExampleAppProps> = ({ system, children }) => {
  const { month, day, year } = system.time

  return (
    <AppContainer>
      <Title>Example App | Artsy</Title>
      <Meta property="og:title" content="Example App" />
      <Meta name="description" content="Fill this with a proper description" />
      <Meta
        property="og:description"
        content="Fill this with a proper description"
      />
      <Meta
        property="twitter:description"
        content="Fill this with a proper description"
      />
      <Meta property="og:url" href={`${sd.APP_URL}/example`} />
      <Meta property="og:type" href={`${sd.FACEBOOK_APP_NAMESPACE}:example`} />

      <Flex mt={2}>
        <Join separator={<Spacer mx={2} />}>
          <RouterLink to="/example">
            <Text>Welcome</Text>
          </RouterLink>
          <RouterLink to="/example/artist/andy-warhol">
            <Text>Artist page</Text>
          </RouterLink>
          <RouterLink to="/example/artwork/andy-warhol-dollar-sign-144">
            <Text>Artwork page</Text>
          </RouterLink>
        </Join>
      </Flex>
      <Box>
        <Text my={2}>
          Today is day number {day} of month number {month} in the year {year}.
        </Text>
      </Box>
      <Box>{children}</Box>
    </AppContainer>
  )
}

export const ExampleAppFragmentContainer = createFragmentContainer(ExampleApp, {
  system: graphql`
    fragment ExampleApp_system on System {
      time {
        day
        month
        year
      }
    }
  `,
})
