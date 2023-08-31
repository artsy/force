import { ContextModule } from "@artsy/cohesion"
import { Flex, Skeleton } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FC } from "react"
import { graphql } from "react-relay"
import {
  SuggestedArtworksShelfQuery,
  SuggestedArtworksShelfQuery$data,
} from "__generated__/SuggestedArtworksShelfQuery.graphql"

import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { extractNodes } from "Utils/extractNodes"

export const NUMBER_OF_ARTWORKS_TO_SHOW = 5

interface SuggestedArtworksShelfProps {
  artworksConnection: SuggestedArtworksShelfQuery$data["artworksConnection"]
}

export const SuggestedArtworksShelf: FC<SuggestedArtworksShelfProps> = ({
  artworksConnection,
}) => {
  const artworks = extractNodes(artworksConnection)

  return (
    <Flex
      flexDirection="row"
      flexWrap="wrap"
      gap={2}
      justifyContent="center"
      overflow="hidden"
      height="340px"
    >
      {artworks.map(artwork => (
        <ShelfArtworkFragmentContainer
          artwork={artwork}
          contextModule={ContextModule.artworkClosedLotHeader}
          key={artwork.internalID}
          data-testid="ShelfSuggestedArtworks"
        />
      ))}
    </Flex>
  )
}

export const SuggestedArtworksShelfQueryRenderer: FC<SearchCriteriaAttributes> = props => {
  return (
    <SystemQueryRenderer<SuggestedArtworksShelfQuery>
      placeholder={<SuggestedArtworksShelfPlaceholder />}
      query={graphql`
        query SuggestedArtworksShelfQuery($input: FilterArtworksInput) {
          artworksConnection(input: $input) {
            counts {
              total
            }
            edges {
              node {
                ...ShelfArtwork_artwork
                internalID
              }
            }
          }
        }
      `}
      variables={{
        input: {
          first: NUMBER_OF_ARTWORKS_TO_SHOW,
          sort: "-published_at",
          forSale: true,
          ...props,
        },
      }}
      render={({ props: relayProps, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!relayProps?.artworksConnection) {
          return <SuggestedArtworksShelfPlaceholder />
        }

        return (
          <SuggestedArtworksShelf
            artworksConnection={relayProps.artworksConnection}
          />
        )
      }}
    />
  )
}

const SuggestedArtworksShelfPlaceholder: FC = () => {
  return (
    <Skeleton>
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
        overflow="hidden"
        height="340px"
      >
        {[...new Array(5)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })}
      </Flex>
    </Skeleton>
  )
}
