import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ExampleApp_system } from "v2/__generated__/ExampleApp_system.graphql"
import {
  Box,
  Flex,
  Join,
  Separator,
  Spacer,
  Text,
  ThemeProviderV3,
} from "@artsy/palette"
import {
  RouterLink as BaseRouteLink,
  RouterLinkProps,
} from "v2/System/Router/RouterLink"
import { ExampleAppMeta } from "./Components/ExampleAppMeta"
import styled from "styled-components"

export interface ExampleAppProps {
  system: ExampleApp_system
}

const ExampleApp: React.FC<ExampleAppProps> = ({ system, children }) => {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const { month, day, year } = system.time

  return (
    <ThemeProviderV3>
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
          <Join separator={<Spacer mx={2} />}>
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
          </Join>
        </Flex>
        <Text my={2}>
          Today is {day}/{month}/{year}.
        </Text>
        <Separator />
        <Box my={2}>{children}</Box>
      </>
    </ThemeProviderV3>
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
