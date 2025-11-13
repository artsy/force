import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import {
  ActionType,
  type ClickedPartnerCard,
  ContextModule,
  OwnerType,
  type PageOwnerType,
} from "@artsy/cohesion"
import type { FairExhibitorCard_exhibitor$data } from "__generated__/FairExhibitorCard_exhibitor.graphql"
import type { FairExhibitorCard_fair$data } from "__generated__/FairExhibitorCard_fair.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface FairExhibitorCardProps {
  exhibitor: FairExhibitorCard_exhibitor$data
  fair: FairExhibitorCard_fair$data
}

export const FairExhibitorCard: React.FC<
  React.PropsWithChildren<FairExhibitorCardProps>
> = ({ exhibitor, fair }) => {
  const tracking = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  if (!exhibitor.partner) return null

  const { slug, internalID } = exhibitor.partner

  const tappedPartnerTrackingData: ClickedPartnerCard = {
    context_module: ContextModule.galleryBoothRail,
    context_page_owner_type: contextPageOwnerType as PageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.fair,
    destination_page_owner_id: internalID,
    destination_page_owner_slug: slug,
    type: "thumbnail",
    action: ActionType.clickedPartnerCard,
  }

  const backToFairHref = `${fair.href}/exhibitors?focused_exhibitor=${internalID}`
  const encodedBackToFairHref = encodeURIComponent(backToFairHref)

  return (
    <EntityHeaderPartnerFragmentContainer
      partner={exhibitor.partner}
      displayAvatar={false}
      alignItems="flex-start"
      href={`/show/${exhibitor.profileID}?back_to_fair_href=${encodedBackToFairHref}`}
      onClick={() => {
        tracking.trackEvent(tappedPartnerTrackingData)
      }}
    />
  )
}

export const FairExhibitorCardFragmentContainer = createFragmentContainer(
  FairExhibitorCard,
  {
    exhibitor: graphql`
      fragment FairExhibitorCard_exhibitor on FairExhibitor {
        profileID
        partner {
          ...EntityHeaderPartner_partner
          internalID
          slug
        }
      }
    `,
    fair: graphql`
      fragment FairExhibitorCard_fair on Fair {
        href
      }
    `,
  }
)
