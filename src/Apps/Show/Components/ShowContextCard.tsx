import { filterLocations } from "Apps/Artwork/Utils/filterLocations"
import { limitWithCount } from "Apps/Artwork/Utils/limitWithCount"
import { FairTimingFragmentContainer as FairTiming } from "Apps/Fair/Components/FairHeader/FairTiming"
import { FairCardFragmentContainer as FairCard } from "Components/FairCard"
import { StyledLink } from "Components/Links/StyledLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { cropped } from "Utils/resized"
import {
  ActionType,
  type ClickedFairCard,
  type ClickedPartnerCard,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
  Column,
  GridColumns,
  Spacer,
  Text,
  TriptychCard,
} from "@artsy/palette"
import type { ShowContextCard_show$data } from "__generated__/ShowContextCard_show.graphql"
import { compact } from "lodash"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface Props {
  show: ShowContextCard_show$data
}

const CARD_FULL_MAX_WIDTH = 768
const CARD_LARGE_IMAGE_WIDTH = 512
const CARD_SMALL_IMAGE_WIDTH = CARD_FULL_MAX_WIDTH - CARD_LARGE_IMAGE_WIDTH

const CARD_IMAGE_WIDTHS = [
  CARD_LARGE_IMAGE_WIDTH,
  CARD_SMALL_IMAGE_WIDTH,
  CARD_SMALL_IMAGE_WIDTH,
]

export const ShowContextCard: React.FC<React.PropsWithChildren<Props>> = ({
  show,
}) => {
  const { isFairBooth, fair, partner } = show

  return isFairBooth ? (
    <FairInfo fair={fair} />
  ) : (
    <PartnerInfo partner={partner} />
  )
}

const FairInfo: React.FC<
  React.PropsWithChildren<{ fair: Props["show"]["fair"] }>
> = ({ fair }) => {
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const tracking = useTracking()

  const handleClick = () => {
    const payload: ClickedFairCard = {
      action: ActionType.clickedFairCard,
      context_module: ContextModule.presentingFair,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.fair,
      destination_page_owner_id: fair?.internalID as string,
      destination_page_owner_slug: fair?.slug as string,
      type: "thumbnail",
    }

    tracking.trackEvent(payload)
  }

  if (!fair) return null

  return (
    <GridColumns>
      {fair.isActive && (
        <Column span={6}>
          <Text variant="lg-display">Part of {fair.name}</Text>
        </Column>
      )}
      <Column span={6}>
        <StyledLink to={fair.href} textDecoration="none" onClick={handleClick}>
          <FairCard fair={fair} />

          <Spacer y={2} />
          <Box>
            <Text variant="xl">{fair.name}</Text>

            <FairTiming fair={fair} />
          </Box>
        </StyledLink>
      </Column>
    </GridColumns>
  )
}

const PartnerInfo: React.FC<
  React.PropsWithChildren<{ partner: Props["show"]["partner"] }>
> = ({ partner }) => {
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const tracking = useTracking()

  const partnerHref = partner?.href
  const partnerName = partner?.name
  const imageUrls = compact(
    partner?.artworksConnection?.edges?.map(
      ({
        node,
      }: NonNullable<
        NonNullable<
          NonNullable<
            NonNullable<Props["show"]["partner"]>["artworksConnection"]
          >["edges"]
        >[0]
      >) => node?.image?.url
    )
  )

  const images = imageUrls.map((url, i) => {
    const imageWidth = CARD_IMAGE_WIDTHS[i]
    return cropped(url as string, { width: imageWidth, height: imageWidth })
  })

  const locationNames = (() => {
    const locationNames = limitWithCount(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      filterLocations(partner?.locations),
      2
    ).join(", ")
    return locationNames
  })()

  const handleClick = () => {
    const payload: ClickedPartnerCard = {
      action: ActionType.clickedPartnerCard,
      context_module: ContextModule.presentingPartner,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.partner,
      destination_page_owner_id: partner?.internalID as string,
      destination_page_owner_slug: partner?.slug as string,
      type: "thumbnail",
    }

    tracking.trackEvent(payload)
  }

  return (
    <GridColumns>
      {partnerName && (
        <Column span={6}>
          <Text variant="lg-display">Presented by {partnerName}</Text>
        </Column>
      )}
      <Column span={6}>
        <StyledLink
          to={partnerHref}
          textDecoration="none"
          onClick={handleClick}
        >
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
