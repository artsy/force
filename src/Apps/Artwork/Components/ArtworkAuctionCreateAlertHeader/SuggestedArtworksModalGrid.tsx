import {
  Text,
  Column,
  Flex,
  GridColumns,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import ArtworkGrid, {
  ArtworkGridPlaceholder,
} from "Components/ArtworkGrid/ArtworkGrid"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { graphql } from "react-relay"
import {
  SuggestedArtworksModalGridQuery,
  SuggestedArtworksModalGridQuery$data,
} from "__generated__/SuggestedArtworksModalGridQuery.graphql"
import { Media } from "Utils/Responsive"
import { SuggestedArtworksModalFooter } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalFooter"

export const NUMBER_OF_ARTWORKS_TO_SHOW = 10

interface SuggestedArtworksModalGridProps {
  artworksConnection: SuggestedArtworksModalGridQuery$data["artworksConnection"]
  onClose: () => void
}

export const SuggestedArtworksModalGrid: FC<SuggestedArtworksModalGridProps> = ({
  artworksConnection,
  onClose,
}) => {
  const { t } = useTranslation()
  const artworksCount = artworksConnection?.counts?.total ?? 0

  if (artworksCount === 0) {
    return (
      <Text mb={2} p={2} bg="black10" color="black60">
        {t(
          "artworkPage.artworkAuctionCreateAlertHeader.suggestedArtworksModal.noMatches"
        )}
      </Text>
    )
  }

  return (
    <>
      <Media greaterThan="xs">
        <Text variant="sm-display" color="black60">
          {t(
            "artworkPage.artworkAuctionCreateAlertHeader.suggestedArtworksModal.artworksCount",
            { count: artworksCount }
          )}
        </Text>
        <Spacer y={2} />
      </Media>

      <ArtworkGridContextProvider saveOnlyToDefaultList>
        <GridColumns>
          <Column span={12}>
            <ArtworkGrid artworks={artworksConnection!} columnCount={2} />
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

export const SuggestedArtworksModalGridQueryRenderer: FC<SuggestedArtworksModalGridQueryRendererProps> = props => {
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

const ContentPlaceholder: FC = () => {
  const { t } = useTranslation()

  return (
    <Flex flexDirection="column">
      <SkeletonText>
        {t(
          "artworkPage.artworkAuctionCreateAlertHeader.suggestedArtworksModal.artworksCount",
          { count: 300 }
        )}
      </SkeletonText>

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
