import {
  Join,
  Column,
  GridColumns,
  Spacer,
  Text,
  Separator,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowsIndex_featuredShows } from "v2/__generated__/ShowsIndex_featuredShows.graphql"
import { ShowsIndex_viewer } from "v2/__generated__/ShowsIndex_viewer.graphql"
import { ShowsFeaturedShowFragmentContainer } from "../Components/ShowsFeaturedShow"
import { ShowsHeaderFragmentContainer } from "../Components/ShowsHeader"
import { ShowsMeta } from "../Components/ShowsMeta"
import { ShowsCurrentShowsQueryRenderer } from "../Components/ShowsCurrentShows"

interface ShowsIndexProps {
  featuredShows: ShowsIndex_featuredShows
  viewer: ShowsIndex_viewer
}

export const ShowsIndex: React.FC<ShowsIndexProps> = ({
  featuredShows,
  viewer,
}) => {
  return (
    <>
      <ShowsMeta />

      <Spacer mt={4} />

      <Join separator={<Spacer mt={6} />}>
        <Text as="h1" variant="xl">
          {featuredShows.name}
        </Text>

        <ShowsHeaderFragmentContainer viewer={viewer} />

        <GridColumns gridRowGap={6}>
          {(featuredShows.items ?? []).map((show, i) => {
            if (!show) return null

            return (
              <Column key={show.id} span={i < 2 ? 6 : 4}>
                <ShowsFeaturedShowFragmentContainer
                  show={show}
                  size={i < 2 ? "large" : "small"}
                />
              </Column>
            )
          })}
        </GridColumns>

        <Separator my={6} />

        <Text as="h2" variant="xl">
          Current Museum & Gallery Shows
        </Text>

        <ShowsCurrentShowsQueryRenderer />
      </Join>
    </>
  )
}

export const ShowsIndexFragmentContainer = createFragmentContainer(ShowsIndex, {
  viewer: graphql`
    fragment ShowsIndex_viewer on Viewer {
      ...ShowsHeader_viewer
    }
  `,
  featuredShows: graphql`
    fragment ShowsIndex_featuredShows on OrderedSet {
      name
      items {
        ... on Show {
          id
          ...ShowsFeaturedShow_show
        }
      }
    }
  `,
})
