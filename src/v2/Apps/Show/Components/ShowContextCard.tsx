import {
  Box,
  Column,
  GridColumns,
  SmallCard,
  Spacer,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowContextCard_show } from "v2/__generated__/ShowContextCard_show.graphql"
import { FairTimingFragmentContainer as FairTiming } from "v2/Apps/Fair/Components/FairHeader/FairTiming"
import { FairCardFragmentContainer as FairCard } from "v2/Components/FairCard"
import { StyledLink } from "v2/Components/Links/StyledLink"
import { compact } from "lodash"
import { limitWithCount } from "v2/Apps/Artwork/Utils/limitWithCount"
import { filterLocations } from "v2/Apps/Artwork/Utils/filterLocations"
import { cropped } from "v2/Utils/resized"
import { useTracking } from "v2/Artsy"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import {
  ActionType,
  ClickedFairCard,
  ClickedPartnerCard,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

interface Props {
  show: ShowContextCard_show
}

const CARD_FULL_MAX_WIDTH = 768
const CARD_LARGE_IMAGE_WIDTH = 512
const CARD_SMALL_IMAGE_WIDTH = CARD_FULL_MAX_WIDTH - CARD_LARGE_IMAGE_WIDTH

const CARD_IMAGE_WIDTHS = [
  CARD_LARGE_IMAGE_WIDTH,
  CARD_SMALL_IMAGE_WIDTH,
  CARD_SMALL_IMAGE_WIDTH,
]

export const ShowContextCard: React.FC<Props> = ({ show }) => {
  const { isFairBooth, fair, partner } = show

  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const FairInfo = () => {
    const handleClick = () => {
      const payload: ClickedFairCard = {
        action: ActionType.clickedFairCard,
        context_module: ContextModule.presentingFair,
        context_page_owner_type: contextPageOwnerType,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        destination_page_owner_type: OwnerType.fair,
        destination_page_owner_id: fair.internalID,
        destination_page_owner_slug: fair.slug,
        type: "thumbnail",
      }

      tracking.trackEvent(payload)
    }

    return (
      <GridColumns>
        <Column span={6}>
          <Text variant="subtitle">Part of {fair.name}</Text>
        </Column>
        <Column span={6}>
          <StyledLink noUnderline to={fair.href} onClick={handleClick}>
            <FairCard fair={fair} />

            <Spacer mb={2} />
            <Box>
              <Text variant="largeTitle">{fair.name}</Text>

              <FairTiming fair={fair} />
            </Box>
          </StyledLink>
        </Column>
      </GridColumns>
    )
  }

  const PartnerInfo = () => {
    const partnerHref = partner?.href
    const partnerName = partner?.name
    const imageUrls = compact(
      partner?.artworksConnection?.edges?.map(({ node }) => node?.image?.url)
    )

    const images = imageUrls.map((url, i) => {
      const imageWidth = CARD_IMAGE_WIDTHS[i]
      return cropped(url, { width: imageWidth, height: imageWidth })
    })

    const locationNames = limitWithCount(
      filterLocations(partner.locations),
      2
    ).join(", ")

    const handleClick = () => {
      const payload: ClickedPartnerCard = {
        action: ActionType.clickedPartnerCard,
        context_module: ContextModule.presentingPartner,
        context_page_owner_type: contextPageOwnerType,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        destination_page_owner_type: OwnerType.partner,
        destination_page_owner_id: partner.internalID,
        destination_page_owner_slug: partner.slug,
        type: "thumbnail",
      }

      tracking.trackEvent(payload)
    }

    return (
      <GridColumns>
        <Column span={6}>
          <Text variant="subtitle">Presented by {partnerName}</Text>
        </Column>
        <Column span={6}>
          <StyledLink to={partnerHref} noUnderline onClick={handleClick}>
            <SmallCard
              title={partnerName}
              subtitle={locationNames}
              images={images}
            />
          </StyledLink>
        </Column>
      </GridColumns>
    )
  }

  return isFairBooth ? <FairInfo /> : <PartnerInfo />
}

export const ShowContextCardFragmentContainer = createFragmentContainer(
  ShowContextCard,
  {
    show: graphql`
      fragment ShowContextCard_show on Show {
        isFairBooth
        partner {
          ... on Partner {
            internalID
            slug
            href
            name
            locations {
              city
            }
            artworksConnection(first: 3, sort: MERCHANDISABILITY_DESC) {
              edges {
                node {
                  image {
                    url(version: "larger")
                  }
                }
              }
            }
          }
        }
        fair {
          internalID
          slug
          href
          name
          ...FairTiming_fair
          ...FairCard_fair
        }
      }
    `,
  }
)
