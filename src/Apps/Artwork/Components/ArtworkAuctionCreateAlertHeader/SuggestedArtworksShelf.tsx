import { ContextModule } from "@artsy/cohesion"
import { Column, Flex, Skeleton, Spacer } from "@artsy/palette"
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
import { ArtworkAuctionCreateAlertTooltip } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertTooltip"
import { SuggestedArtworksButton } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksButton"

export const NUMBER_OF_ARTWORKS_TO_SHOW = 5

interface SuggestedArtworksShelfProps {
  artworksConnection: SuggestedArtworksShelfQuery$data["artworksConnection"]
}

export const SuggestedArtworksShelf: FC<SuggestedArtworksShelfProps> = ({
  artworksConnection,
}) => {
  const artworks = extractNodes(artworksConnection)
  const suggestedArtworksCount = artworksConnection?.counts?.total ?? 0
  const displaySuggestedArtworksSection = suggestedArtworksCount > 0
  const displaySeeMoreButton =
    suggestedArtworksCount > NUMBER_OF_ARTWORKS_TO_SHOW

  if (!displaySuggestedArtworksSection) return null

  return (
    <>
      <Column span={12} display={["none", "block"]}>
        <Spacer y={4} />
        <ArtworkAuctionCreateAlertTooltip />
      </Column>

      <Column span={12} display={["none", "block"]}>
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
          overflow="hidden"
          height="350px"
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
      </Column>

      {!!displaySeeMoreButton && (
        <Column span={2} start={6}>
          <SuggestedArtworksButton />
        </Column>
      )}
    </>
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
