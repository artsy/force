import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkAuctionCreateAlertHeader_artwork$data } from "__generated__/ArtworkAuctionCreateAlertHeader_artwork.graphql"
import { ArtworkSidebarCreateAlertButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCreateAlertButton"
import { useTimer } from "Utils/Hooks/useTimer"
import { useFeatureFlag } from "System/useFeatureFlag"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { FC } from "react"
import { SuggestedArtworksButton } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksButton"
import { SavedSearchAlertContextProvider } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { compact } from "lodash"
import {
  SavedSearchEntity,
  SavedSearchEntityCriteria,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { OwnerType } from "@artsy/cohesion"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { ArtworkAuctionCreateAlertTooltip } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertTooltip"
import { SuggestedArtworksShelfQueryRenderer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksShelf"
import { Media } from "Utils/Responsive"

interface ArtworkAuctionCreateAlertHeaderProps {
  artwork: ArtworkAuctionCreateAlertHeader_artwork$data
}

const ArtworkAuctionCreateAlertHeader: FC<ArtworkAuctionCreateAlertHeaderProps> = ({
  artwork,
}) => {
  const hasArtists = (artwork.artists?.length ?? 0) > 0
  const biddingEndAt =
    artwork?.saleArtwork?.extendedBiddingEndAt ?? artwork?.saleArtwork?.endAt
  const { hasEnded } = useTimer(biddingEndAt!, artwork?.sale?.startAt!)

  const auctionHeaderAlertCTAEnabled = useFeatureFlag(
    "onyx_auction-header-alert-cta"
  )

  const isLotClosed = hasEnded || lotIsClosed(artwork.sale, artwork.saleArtwork)
  const displayAuctionCreateAlertHeader =
    hasArtists &&
    artwork.isInAuction &&
    isLotClosed &&
    auctionHeaderAlertCTAEnabled

  if (!displayAuctionCreateAlertHeader) return null

  const artistName = artwork.artistNames ? ", " + artwork.artistNames : ""
  const artistSlug = artwork.artists?.[0]?.slug
  let aggregations: Aggregations = []
  let additionalGeneIDs: string[] = []
  const artists = compact(artwork.artists)
  const attributionClass = compact([artwork.attributionClass?.internalID])
  const artistIDs = artists.map(artist => artist.internalID)
  const placeholder = `Artworks like: ${artwork.title!}`
  const defaultArtistsCriteria: SavedSearchEntityCriteria[] = artists.map(
    artist => ({
      value: artist.internalID,
      displayValue: artist.name ?? "",
    })
  )
  const entity: SavedSearchEntity = {
    placeholder,
    defaultCriteria: {
      artistIDs: defaultArtistsCriteria,
    },
    owner: {
      type: OwnerType.artwork,
      slug: artwork.slug,
      id: artwork.internalID,
      name: artwork.title!,
    },
  }

  if (
    artwork.mediumType?.filterGene?.name &&
    artwork.mediumType?.filterGene.slug
  ) {
    additionalGeneIDs = [artwork.mediumType.filterGene.slug]
    aggregations = [
      {
        slice: "MEDIUM",
        counts: [
          {
            name: artwork.mediumType.filterGene.name,
            value: artwork.mediumType.filterGene.slug,
            count: 0,
          },
        ],
      },
    ]
  }

  const criteria: SearchCriteriaAttributes = {
    artistIDs,
    attributionClass,
    additionalGeneIDs,
  }
  const allowedCriteria = getAllowedSearchCriteria(criteria)

  const suggestedArtworksCount =
    artwork?.savedSearch?.suggestedArtworksConnection?.totalCount ?? 0
  const displaySuggestedArtworksSection = suggestedArtworksCount > 0
  const displaySeeMoreButton = suggestedArtworksCount > 5

  return (
    <SavedSearchAlertContextProvider
      criteria={allowedCriteria}
      aggregations={aggregations}
      entity={entity}
      artistSlug={artistSlug}
    >
      <GridColumns py={[4, 4, 6]}>
        <Column span={12}>
          <Text
            variant={["lg-display", "md", "lg"]}
            textAlign={["left", "center"]}
          >
            Bidding for <i>{artwork.title?.trim()}</i>
            {artistName} has ended.
          </Text>
          <Media lessThan="sm">
            <Spacer y={1} />
          </Media>
          <Text
            variant={["sm-display", "md", "lg"]}
            textAlign={["left", "center"]}
            textColor={["black60", "black100"]}
          >
            Create an alert to get notified when similar works become available.
          </Text>
        </Column>
        <Column span={12}>
          <Media lessThan="sm">
            <Spacer y={1} />
          </Media>
          <Box mx="auto" width={["100%", 209]}>
            <ArtworkSidebarCreateAlertButtonFragmentContainer
              artwork={artwork}
            />
          </Box>
        </Column>

        {!!displaySuggestedArtworksSection && (
          <>
            <Column span={12} display={["none", "block"]}>
              <Spacer y={4} />
              <ArtworkAuctionCreateAlertTooltip />
            </Column>

            <Column span={12} display={["none", "block"]}>
              <SuggestedArtworksShelfQueryRenderer {...criteria} />
            </Column>

            {!!displaySeeMoreButton && (
              <Column span={2} start={6}>
                <SuggestedArtworksButton />
              </Column>
            )}
          </>
        )}
      </GridColumns>
    </SavedSearchAlertContextProvider>
  )
}
export const ArtworkAuctionCreateAlertHeaderFragmentContainer = createFragmentContainer(
  ArtworkAuctionCreateAlertHeader,
  {
    artwork: graphql`
      fragment ArtworkAuctionCreateAlertHeader_artwork on Artwork {
        slug
        internalID
        title
        isInAuction
        artistNames
        internalID
        artists {
          internalID
          name
          slug
        }
        sale {
          startAt
          isClosed
        }
        saleArtwork {
          extendedBiddingEndAt
          endAt
          endedAt
        }
        attributionClass {
          internalID
        }
        mediumType {
          filterGene {
            slug
            name
          }
        }
        savedSearch {
          suggestedArtworksConnection {
            totalCount
          }
        }
        ...ArtworkSidebarCreateAlertButton_artwork
      }
    `,
  }
)
