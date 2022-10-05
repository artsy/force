import { Shelf } from "@artsy/palette"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { graphql } from "react-relay"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { ShelfStoryQuery } from "__generated__/ShelfStoryQuery.graphql"

export default {
  title: "Components/Shelf",
}

export const Example = () => {
  return (
    <States<{ id: string }>
      states={[
        { id: "roni-horn" },
        { id: "andy-warhol" },
        { id: "cy-twombly" },
        { id: "john-m-armleder" },
        { id: "chris-ofili" },
      ]}
    >
      {({ id }) => {
        return (
          <SystemQueryRenderer<ShelfStoryQuery>
            variables={{ id }}
            query={graphql`
              query ShelfStoryQuery($id: String!) {
                artist(id: $id) {
                  filterArtworksConnection(
                    first: 15
                    sort: "-weighted_iconicity"
                  ) {
                    edges {
                      node {
                        ...ShelfArtwork_artwork
                        internalID
                      }
                    }
                  }
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.artist) {
                return <div>loading</div>
              }

              const arworks = extractNodes(
                props.artist.filterArtworksConnection
              )

              return (
                <Shelf>
                  {arworks.map(artwork => {
                    return (
                      <ShelfArtworkFragmentContainer
                        key={artwork.internalID}
                        artwork={artwork}
                      />
                    )
                  })}
                </Shelf>
              )
            }}
          />
        )
      }}
    </States>
  )
}
