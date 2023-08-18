import { Flex, Skeleton } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FC } from "react"
import { graphql } from "react-relay"
import {
  SuggestedArtworksShelfQuery,
  SuggestedArtworksShelfQuery$data,
} from "__generated__/SuggestedArtworksShelfQuery.graphql"
import { Media } from "Utils/Responsive"
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
    <>
      <Media greaterThan="xs">
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          gap={1}
          justifyContent="center"
        >
          {artworks.map(artwork => (
            <ShelfArtworkFragmentContainer
              artwork={artwork}
              key={artwork.internalID}
              data-testid="ShelfSuggestedArtworks"
            />
          ))}
        </Flex>
      </Media>
    </>
  )
}

export const SuggestedArtworksShelfQueryRenderer: FC<SearchCriteriaAttributes> = props => {
  return (
    <SystemQueryRenderer<SuggestedArtworksShelfQuery>
      placeholder={<ContentPlaceholder />}
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
          return <ContentPlaceholder />
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

const ContentPlaceholder: FC = () => {
  return (
    <Skeleton>
      <Flex flexDirection="row" flexWrap="wrap" gap={1} justifyContent="center">
        {[...new Array(5)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })}
      </Flex>
    </Skeleton>
  )
}
