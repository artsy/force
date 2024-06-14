import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ExampleApp_system$data } from "__generated__/ExampleApp_system.graphql"
import { Box, Flex, Join, Separator, Spacer, Text } from "@artsy/palette"
import {
  RouterLink as BaseRouteLink,
  RouterLinkProps,
} from "System/Components/RouterLink"
import { ExampleAppMeta } from "./Components/ExampleAppMeta"
import styled from "styled-components"

export interface ExampleAppProps {
  system: ExampleApp_system$data
}

const ExampleApp: React.FC<ExampleAppProps> = ({ system, children }) => {
  if (!system?.time) return null

  const { month, day, year } = system.time

  return (
    <>
      <ExampleAppMeta />

      <Box mt={2}>
        <Text variant="xl">Hello Artsy Dev!</Text>
        <Text>
          Wecome to our framework example app. See the links below for a few
          possibilities.
        </Text>
      </Box>

      <Flex mt={2}>
        <Join separator={<Spacer x={4} />}>
          <RouterLink to="/example" exact>
            <Text>Welcome</Text>
          </RouterLink>
          <RouterLink to="/example/artist/andy-warhol">
            <Text>Artist page</Text>
          </RouterLink>
          <RouterLink to="/example/artwork/andy-warhol-poinsettias-19">
            <Text>Artwork page</Text>
          </RouterLink>
          <RouterLink to="/example/artwork-filter">
            <Text>Artwork Filter Example</Text>
          </RouterLink>
          <RouterLink to="/example/add-to-collection">
            <Text>Add To Collection</Text>
          </RouterLink>
          <RouterLink to="/example/search">
            <Text>Search</Text>
          </RouterLink>
        </Join>
      </Flex>

      <Text my={2}>
        Today is {day}/{month}/{year}.
      </Text>

      <Separator />

      <Box my={2}>{children}</Box>
    </>
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

const RouterLink = styled<{ activeClassName?: string } & RouterLinkProps>(
  BaseRouteLink
).attrs({
  activeClassName: "active",
})`
  &.active {
    font-weight: bold;
  }
`
