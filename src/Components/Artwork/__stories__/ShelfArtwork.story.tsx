import { States } from "storybook-states"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
  ShelfArtworkProps,
} from "Components/Artwork/ShelfArtwork"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { graphql } from "react-relay"

export default {
  title: "Components/ShelfArtwork",
}

export const Default = () => {
  return (
    <States<Partial<ShelfArtworkProps>>
      states={[
        { id: "morris-louis-gamma-delta" },
        {
          id: "morris-louis-gamma-delta",
        },
        {
          id: "morris-louis-gamma-delta",
        },
        { id: "roni-horn-best-witchcraft-is-geometry" },
        {
          id: "roni-horn-best-witchcraft-is-geometry",
        },
        {
          id: "roni-horn-best-witchcraft-is-geometry",
        },
        // Very tall + narrow
        { id: "barnett-newman-the-moment-from-four-on-plexiglas" },
        // No sale message
        { id: "clyfford-still-ph-950-1" },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<any>
            variables={{ id }}
            placeholder={<ShelfArtworkPlaceholder index={1} {...rest} />}
            query={graphql`
              query ShelfArtworkStoryQuery($id: String!) {
                artwork(id: $id) {
                  ...ShelfArtwork_artwork
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.artwork) {
                return <ShelfArtworkPlaceholder index={1} {...rest} />
              }

              return (
                <ShelfArtworkFragmentContainer
                  artwork={props.artwork}
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
