import { ArtworkAuctionCreateAlertTooltip } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertTooltip"
import { SuggestedArtworksModal } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModal"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import type { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { ContextModule } from "@artsy/cohesion"
import {
  Button,
  Column,
  GridColumns,
  HorizontalOverflow,
  Skeleton,
  Stack,
} from "@artsy/palette"
import type {
  SuggestedArtworksShelfQuery,
  SuggestedArtworksShelfQuery$data,
} from "__generated__/SuggestedArtworksShelfQuery.graphql"
import { type FC, useState } from "react"
import { graphql } from "react-relay"

export const NUMBER_OF_ARTWORKS_TO_SHOW = 5

interface SuggestedArtworksShelfProps {
  artworksConnection: SuggestedArtworksShelfQuery$data["artworksConnection"]
}

export const SuggestedArtworksShelf: FC<
  React.PropsWithChildren<SuggestedArtworksShelfProps>
> = ({ artworksConnection }) => {
  const artworks = extractNodes(artworksConnection)
  const suggestedArtworksCount = artworksConnection?.counts?.total ?? 0
  const displaySuggestedArtworksSection = suggestedArtworksCount > 0
  const displaySeeMore = suggestedArtworksCount > NUMBER_OF_ARTWORKS_TO_SHOW

  const [open, setOpen] = useState(false)

  if (!displaySuggestedArtworksSection) return null

  return (
    <GridColumns>
      <Column span={12} display={["none", "block"]}>
        <ArtworkAuctionCreateAlertTooltip />
      </Column>

      <Column span={12} display={["none", "block"]}>
        <HorizontalOverflow justifyContent="center">
          <Stack gap={2} flexDirection="row">
            {artworks.map(artwork => (
              <ShelfArtworkFragmentContainer
                artwork={artwork}
                contextModule={ContextModule.artworkClosedLotHeader}
                key={artwork.internalID}
                data-testid="ShelfSuggestedArtworks"
              />
            ))}
          </Stack>
        </HorizontalOverflow>
      </Column>

      {displaySeeMore && (
        <Column span={12} display="flex">
          <Button
            variant="secondaryNeutral"
            size={["large", "small"]}
            m="auto"
            width={["100%", "auto"]}
            onClick={() => setOpen(true)}
          >
            See more
          </Button>

          {open && <SuggestedArtworksModal onClose={() => setOpen(false)} />}
        </Column>
      )}
    </GridColumns>
  )
}

export const SuggestedArtworksShelfQueryRenderer: FC<
  React.PropsWithChildren<SearchCriteriaAttributes>
> = props => {
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

const SuggestedArtworksShelfPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Skeleton>
      <GridColumns>
        <Column span={12} display={["none", "block"]}>
          <ArtworkAuctionCreateAlertTooltip />
        </Column>

        <Column span={12} display={["none", "block"]}>
          <HorizontalOverflow justifyContent="center">
            <Stack gap={2} flexDirection="row">
              {[...new Array(NUMBER_OF_ARTWORKS_TO_SHOW)].map((_, i) => {
                return <ShelfArtworkPlaceholder key={i} index={i} />
              })}
            </Stack>
          </HorizontalOverflow>
        </Column>

        <Column span={12} display="flex">
          <Button
            variant="secondaryNeutral"
            size={["large", "small"]}
            m="auto"
            width={["100%", "auto"]}
            disabled
          >
            Browse Similar Works
          </Button>
        </Column>
      </GridColumns>
    </Skeleton>
  )
}
