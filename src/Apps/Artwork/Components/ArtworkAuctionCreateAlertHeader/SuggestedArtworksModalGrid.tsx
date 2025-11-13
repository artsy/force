import { SuggestedArtworksModalFooter } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalFooter"
import ArtworkGrid, {
  ArtworkGridPlaceholder,
} from "Components/ArtworkGrid/ArtworkGrid"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import type { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Media } from "Utils/Responsive"
import {
  Column,
  Flex,
  GridColumns,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import type {
  SuggestedArtworksModalGridQuery,
  SuggestedArtworksModalGridQuery$data,
} from "__generated__/SuggestedArtworksModalGridQuery.graphql"
import type { FC } from "react"
import { graphql } from "react-relay"

export const NUMBER_OF_ARTWORKS_TO_SHOW = 10

interface SuggestedArtworksModalGridProps {
  artworksConnection: SuggestedArtworksModalGridQuery$data["artworksConnection"]
  onClose: () => void
}

export const SuggestedArtworksModalGrid: FC<
  React.PropsWithChildren<SuggestedArtworksModalGridProps>
> = ({ artworksConnection, onClose }) => {
  const artworksCount = artworksConnection?.counts?.total ?? 0

  if (artworksCount === 0) {
    return (
      <Text mb={2} p={2} bg="mono10" color="mono60">
        There aren’t any works available that meet the criteria at this time.
      </Text>
    )
  }

  return (
    <>
      <Media greaterThan="xs">
        <Text variant="sm-display" color="mono60">
          {artworksCount === 1 ? "1 Artwork:" : `${artworksCount} Artworks:`}
        </Text>
        <Spacer y={2} />
      </Media>

      <ArtworkGridContextProvider saveOnlyToDefaultList>
        <GridColumns>
          <Column span={12}>
            {artworksConnection && (
              <ArtworkGrid artworks={artworksConnection} columnCount={2} />
            )}
          </Column>
        </GridColumns>
      </ArtworkGridContextProvider>

      <Spacer y={2} />

      <SuggestedArtworksModalFooter
        artworksCount={artworksCount}
        onClose={onClose}
      />
    </>
  )
}

interface SuggestedArtworksModalGridQueryRendererProps
  extends SearchCriteriaAttributes {
  onClose: () => void
}

export const SuggestedArtworksModalGridQueryRenderer: FC<
  React.PropsWithChildren<SuggestedArtworksModalGridQueryRendererProps>
> = props => {
  const { onClose, ...inputProps } = props

  return (
    <SystemQueryRenderer<SuggestedArtworksModalGridQuery>
      placeholder={<ContentPlaceholder />}
      query={graphql`
        query SuggestedArtworksModalGridQuery($input: FilterArtworksInput) {
          artworksConnection(input: $input) {
            counts {
              total
            }
            ...ArtworkGrid_artworks
          }
        }
      `}
      variables={{
        input: {
          first: NUMBER_OF_ARTWORKS_TO_SHOW,
          sort: "-published_at",
          forSale: true,
          ...inputProps,
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
          <SuggestedArtworksModalGrid
            artworksConnection={relayProps.artworksConnection}
            onClose={onClose}
          />
        )
      }}
    />
  )
}

const ContentPlaceholder: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Flex flexDirection="column">
      <SkeletonText>300 Artworks:</SkeletonText>

      <Spacer y={2} />

      <GridColumns>
        <Column span={12}>
          <ArtworkGridPlaceholder
            columnCount={2}
            amount={NUMBER_OF_ARTWORKS_TO_SHOW}
          />
        </Column>
      </GridColumns>
    </Flex>
  )
}
