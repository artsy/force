import { Column, GridColumns, Text } from "@artsy/palette"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeApp_homePage } from "v2/__generated__/HomeApp_homepage.graphql"

interface HomeAppProps {
  homePage: HomeApp_homePage
}

export const HomeApp: React.FC<HomeAppProps> = ({ homePage }) => {
  return (
    <>
      <Title>Artsy - Discover & Buy Art</Title>

      <GridColumns my={4}>
        <Column span={6}>
          <Text variant="xl" as="h1">
            Hello World
          </Text>

          <Text variant="xs" as="pre">
            {JSON.stringify({ homePage }, null, 2)}
          </Text>
        </Column>
      </GridColumns>
    </>
  )
}

export const HomeAppFragmentContainer = createFragmentContainer(HomeApp, {
  homePage: graphql`
    fragment HomeApp_homePage on HomePage {
      heroUnits(platform: DESKTOP) {
        mode
        heading
        title
      }
    }
  `,
})
