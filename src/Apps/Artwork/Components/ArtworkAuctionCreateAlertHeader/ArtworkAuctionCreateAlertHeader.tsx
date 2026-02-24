import { OwnerType } from "@artsy/cohesion"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import {
  Box,
  Button,
  Column,
  GridColumns,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { SuggestedArtworksShelfQueryRenderer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksShelf"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import type { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ProgressiveOnboardingAlertCreateSimple } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreateSimple"
import { SavedSearchAlertContextProvider } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import type {
  SavedSearchEntity,
  SavedSearchEntityCriteria,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { RouterLink } from "System/Components/RouterLink"
import { useTimer } from "Utils/Hooks/useTimer"
import { Media } from "Utils/Responsive"
import type { ArtworkAuctionCreateAlertHeader_artwork$data } from "__generated__/ArtworkAuctionCreateAlertHeader_artwork.graphql"
import compact from "lodash/compact"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkAuctionCreateAlertHeaderProps {
  artwork: ArtworkAuctionCreateAlertHeader_artwork$data
}

const ArtworkAuctionCreateAlertHeader: FC<
  React.PropsWithChildren<ArtworkAuctionCreateAlertHeaderProps>
> = ({ artwork }) => {
  const biddingEndAt =
    artwork?.saleArtwork?.extendedBiddingEndAt ?? artwork?.saleArtwork?.endAt
  const { hasEnded } = useTimer(
    biddingEndAt as string,
    artwork?.sale?.startAt as string,
  )

  const isLotClosed = hasEnded || lotIsClosed(artwork.sale, artwork.saleArtwork)
  const displayAuctionCreateAlertHeader =
    artwork.isEligibleToCreateAlert && artwork.isInAuction && isLotClosed

  const artistName = artwork.artistNames ? `, ${artwork.artistNames}` : ""
  const artistSlug = artwork.artists?.[0]?.slug
  let aggregations: Aggregations = []
  let additionalGeneIDs: string[] = []
  const artists = compact(artwork.artists)
  const attributionClass = compact([artwork.attributionClass?.internalID])
  const artistIDs = artists.map(artist => artist.internalID)
  const defaultArtistsCriteria: SavedSearchEntityCriteria[] = artists.map(
    artist => ({
      value: artist.internalID,
      displayValue: artist.name ?? "",
    }),
  )
  const entity: SavedSearchEntity = {
    defaultCriteria: {
      artistIDs: defaultArtistsCriteria,
    },
    owner: {
      type: OwnerType.artwork,
      slug: artwork.slug,
      id: artwork.internalID,
      name: artwork.title as string,
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

  const isBidder = artwork.myLotStandingManageAlerts?.[0]
  const isHighest = artwork.myLotStandingManageAlerts?.[0]?.isHighestBidder
  const hasLostBid = isBidder && !isHighest

  if (!displayAuctionCreateAlertHeader) return null

  return (
    <SavedSearchAlertContextProvider
      criteria={allowedCriteria}
      aggregations={aggregations}
      entity={entity}
      artistSlug={artistSlug}
    >
      <Stack py={[4, 4, 6]} gap={[1, 4]}>
        <GridColumns>
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
              textColor={["mono60", "mono100"]}
            >
              {hasLostBid
                ? "We’ve created an alert for you for similar works."
                : "Create an alert to get notified when similar works become available."}
            </Text>
          </Column>

          <Column span={12}>
            <Media lessThan="sm">
              <Spacer y={1} />
            </Media>
            <Box mx="auto" width={["100%", 209]}>
              {hasLostBid ? (
                <Button
                  width={["100%", 220]}
                  variant="secondaryBlack"
                  Icon={BellStrokeIcon}
                  // @ts-ignore
                  as={RouterLink}
                  to={"/favorites/alerts"}
                >
                  Manage your alerts
                </Button>
              ) : (
                <ProgressiveOnboardingAlertCreateSimple>
                  <CreateAlertButton
                    width="100%"
                    size="large"
                    backgroundColor="mono100"
                    color="mono0"
                  />
                </ProgressiveOnboardingAlertCreateSimple>
              )}
            </Box>
          </Column>
        </GridColumns>

        <SuggestedArtworksShelfQueryRenderer {...criteria} />
      </Stack>
    </SavedSearchAlertContextProvider>
  )
}
export const ArtworkAuctionCreateAlertHeaderFragmentContainer =
  createFragmentContainer(ArtworkAuctionCreateAlertHeader, {
    artwork: graphql`
      fragment ArtworkAuctionCreateAlertHeader_artwork on Artwork {
        slug
        internalID
        title
        isEligibleToCreateAlert
        isInAuction
        artistNames
        internalID
        artists(shallow: true) {
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
        myLotStandingManageAlerts: myLotStanding {
          isHighestBidder
        }
      }
    `,
  })
