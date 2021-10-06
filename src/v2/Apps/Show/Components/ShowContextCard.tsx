import {
  Box,
  Column,
  GridColumns,
  TriptychCard,
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
import { useTracking } from "v2/System"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
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
        // @ts-expect-error STRICT_NULL_CHECK
        context_page_owner_type: contextPageOwnerType,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        destination_page_owner_type: OwnerType.fair,
        // @ts-expect-error STRICT_NULL_CHECK
        destination_page_owner_id: fair.internalID,
        // @ts-expect-error STRICT_NULL_CHECK
        destination_page_owner_slug: fair.slug,
        type: "thumbnail",
      }

      tracking.trackEvent(payload)
    }

    return (
      <GridColumns>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        {fair.isActive && (
          <Column span={6}>
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            <Text variant="lg">Part of {fair.name}</Text>
          </Column>
        )}
        <Column span={6}>
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          <StyledLink noUnderline to={fair.href} onClick={handleClick}>
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            <FairCard fair={fair} />

            <Spacer mb={2} />
            <Box>
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              <Text variant="xl">{fair.name}</Text>

              {/* @ts-expect-error STRICT_NULL_CHECK */}
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
      // @ts-expect-error STRICT_NULL_CHECK
      partner?.artworksConnection?.edges?.map(({ node }) => node?.image?.url)
    )

    const images = imageUrls.map((url, i) => {
      const imageWidth = CARD_IMAGE_WIDTHS[i]
      return cropped(url, { width: imageWidth, height: imageWidth })
    })

    const locationNames = limitWithCount(
      // @ts-expect-error STRICT_NULL_CHECK
      filterLocations(partner.locations),
      2
    ).join(", ")

    const handleClick = () => {
      const payload: ClickedPartnerCard = {
        action: ActionType.clickedPartnerCard,
        context_module: ContextModule.presentingPartner,
        // @ts-expect-error STRICT_NULL_CHECK
        context_page_owner_type: contextPageOwnerType,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        destination_page_owner_type: OwnerType.partner,
        // @ts-expect-error STRICT_NULL_CHECK
        destination_page_owner_id: partner.internalID,
        // @ts-expect-error STRICT_NULL_CHECK
        destination_page_owner_slug: partner.slug,
        type: "thumbnail",
      }

      tracking.trackEvent(payload)
    }

    return (
      <GridColumns>
        <Column span={6}>
          <Text variant="lg">Presented by {partnerName}</Text>
        </Column>
        <Column span={6}>
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          <StyledLink to={partnerHref} noUnderline onClick={handleClick}>
            <TriptychCard
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
          isActive
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
