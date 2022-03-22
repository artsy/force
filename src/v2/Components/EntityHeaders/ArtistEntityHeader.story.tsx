import { graphql } from "relay-runtime"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  ArtistEntityHeaderFragmentContainer,
  ArtistEntityHeaderProps,
} from "./ArtistEntityHeader"
import { PlaceholderEntityHeader } from "./PlaceholderEntityHeader"
import { ArtistEntityHeaderStoryQuery } from "v2/__generated__/ArtistEntityHeaderStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const ArtistEntityHeader = () => {
  return (
    <States<{ id: string } & Partial<Omit<ArtistEntityHeaderProps, "artist">>>
      states={[
        { id: "damon-zucconi" },
        { id: "walid-raad", displayCounts: false },
        { id: "roni-horn" },
        { id: "roni-horn", displayCounts: false },
        { id: "damon-zucconi", FollowButton: <></> },
        { id: "damon-zucconi", displayAvatar: false },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<ArtistEntityHeaderStoryQuery>
            variables={{ id }}
            placeholder={<PlaceholderEntityHeader />}
            query={graphql`
              query ArtistEntityHeaderStoryQuery($id: String!) {
                artist(id: $id) {
                  ...ArtistEntityHeader_artist
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.artist) {
                return <PlaceholderEntityHeader />
              }

              return (
                <ArtistEntityHeaderFragmentContainer
                  artist={props.artist}
                  {...rest}
                />
              )
            }}
          />
        )
      }}
    </States>
  )
}

ArtistEntityHeader.story = {
  name: "ArtistEntityHeader",
}
