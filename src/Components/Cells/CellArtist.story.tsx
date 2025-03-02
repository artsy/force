import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { CellArtistStoryQuery } from "__generated__/CellArtistStoryQuery.graphql"
import { graphql } from "react-relay"
import { States } from "storybook-states"
import {
  CellArtistFragmentContainer,
  CellArtistPlaceholder,
  type CellArtistProps,
} from "./CellArtist"

export default {
  title: "Components/Cell",
}

export const CellArtist = () => {
  return (
    <States<{ id: string } & Partial<Omit<CellArtistProps, "artist">>>
      states={[
        { id: "gerhard-richter" },
        { id: "gerhard-richter", displayCounts: true },
        { id: "gerhard-richter", mode: "GRID" },
        {
          id: "roni-horn",
        },
        { id: "roni-horn", mode: "GRID" },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<CellArtistStoryQuery>
            variables={{ id }}
            placeholder={<CellArtistPlaceholder {...rest} />}
            query={graphql`
              query CellArtistStoryQuery($id: String!) {
                artist(id: $id) {
                  ...CellArtist_artist
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.artist) {
                return <CellArtistPlaceholder {...rest} />
              }

              return (
                <CellArtistFragmentContainer artist={props.artist} {...rest} />
              )
            }}
          />
        )
      }}
    </States>
  )
}

CellArtist.story = {
  name: "CellArtist",
}
