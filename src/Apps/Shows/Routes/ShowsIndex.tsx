import {
  Column,
  GridColumns,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { ShowsCurrentShowsQueryRenderer } from "Apps/Shows/Components/ShowsCurrentShows"
import { ShowsFeaturedShowFragmentContainer } from "Apps/Shows/Components/ShowsFeaturedShow"
import { ShowsHeaderFragmentContainer } from "Apps/Shows/Components/ShowsHeader"
import { ShowsMeta } from "Apps/Shows/Components/ShowsMeta"
import type { ShowsIndex_featuredShows$data } from "__generated__/ShowsIndex_featuredShows.graphql"
import type { ShowsIndex_viewer$data } from "__generated__/ShowsIndex_viewer.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ShowsIndexProps {
  featuredShows: ShowsIndex_featuredShows$data
  viewer: ShowsIndex_viewer$data
}

export const ShowsIndex: React.FC<React.PropsWithChildren<ShowsIndexProps>> = ({
  featuredShows,
  viewer,
}) => {
  return (
    <>
      <ShowsMeta />

      <Spacer y={4} />

      <Join separator={<Spacer y={6} />}>
        <ShowsHeaderFragmentContainer viewer={viewer} />

        <Text as="h1" variant="xl">
          {featuredShows.name}
        </Text>

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
