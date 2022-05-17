import React, { FC } from "react"
import { MetaTags } from "v2/Components/MetaTags"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NewForYouApp_viewer } from "v2/__generated__/NewForYouApp_viewer.graphql"
import { NewForYouArtworksGridFragmentContainer } from "v2/Apps/NewForYou/Components/NewForYouArtworksGrid"

interface NewForYouAppProps {
  viewer: NewForYouApp_viewer
}

export const NewForYouApp: FC<NewForYouAppProps> = ({ viewer }) => {
  return (
    <>
      <Spacer mt={2} />
      <MetaTags title="New For You" />
      <GridColumns>
        <Column span={6}>
          <Text variant="xl" mt={4}>
            New Works For You
          </Text>
        </Column>
        <Column span={6}>
          <Text variant={"md"} mt={6}>
            Description Here Explaining Stuff
          </Text>
        </Column>
      </GridColumns>
      <Spacer mt={4} />
      {viewer && <NewForYouArtworksGridFragmentContainer viewer={viewer} />}
    </>
  )
}

export const NewForYouAppFragmentContainer = createFragmentContainer(
  NewForYouApp,
  {
    viewer: graphql`
      fragment NewForYouApp_viewer on Viewer {
        ...NewForYouArtworksGrid_viewer
      }
    `,
  }
)
