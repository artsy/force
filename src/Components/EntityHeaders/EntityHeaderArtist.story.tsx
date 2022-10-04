import { graphql } from "react-relay"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  EntityHeaderArtistFragmentContainer,
  EntityHeaderArtistProps,
} from "./EntityHeaderArtist"
import { EntityHeaderPlaceholder } from "./EntityHeaderPlaceholder"
import { EntityHeaderArtistStoryQuery } from "__generated__/EntityHeaderArtistStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const EntityHeaderArtist = () => {
  return (
    <States<{ id: string } & Partial<Omit<EntityHeaderArtistProps, "artist">>>
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
          <SystemQueryRenderer<EntityHeaderArtistStoryQuery>
            variables={{ id }}
            placeholder={<EntityHeaderPlaceholder />}
            query={graphql`
              query EntityHeaderArtistStoryQuery($id: String!) {
                artist(id: $id) {
                  ...EntityHeaderArtist_artist
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.artist) {
                return <EntityHeaderPlaceholder />
              }

              return (
                <EntityHeaderArtistFragmentContainer
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

EntityHeaderArtist.story = {
  name: "EntityHeaderArtist",
}
