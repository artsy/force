import { Column, GridColumns, Text } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"
import { AboutPartner_partner$data } from "__generated__/AboutPartner_partner.graphql"
import { useTracking } from "react-tracking"
import { ActionType, ClickedPartnerLink, OwnerType } from "@artsy/cohesion"

export interface AboutPartnerProps {
  partner: AboutPartner_partner$data
}

export const AboutPartner: React.FC<AboutPartnerProps> = ({
  partner: {
    profile,
    vatNumber,
    website,
    displayFullPartnerPage,
    slug,
    internalID,
  },
}) => {
  const tracking = useTracking()
  const tappedViewTrackingData: ClickedPartnerLink = {
    action: ActionType.clickedPartnerLink,
    context_owner_id: internalID,
    context_owner_slug: slug,
    context_owner_type: OwnerType.partner,
    destination_path: website ?? "",
  }

  const fullBio = profile?.fullBio
  const limitedBio = profile?.bio
  const isEmpty = !fullBio && !limitedBio && !vatNumber && !website

  if (isEmpty) {
    return null
  }

  const canRenderWebsite = website && displayFullPartnerPage
  const canRenderVatNumber = vatNumber && displayFullPartnerPage
  const bioDisplayable = fullBio || limitedBio

  return (
    <GridColumns mb={12} gridRowGap={2}>
      <Column span={6}>
        <Text variant="lg-display">About</Text>
      </Column>

      <Column span={6}>
        <Media at="xs">
          {bioDisplayable && (
            <Text mb={2} variant="sm">
              {limitedBio ? limitedBio : fullBio}
            </Text>
          )}
        </Media>
        <Media greaterThan="xs">
          {bioDisplayable && (
            <Text mb={2} variant="sm">
              {fullBio ? fullBio : limitedBio}
            </Text>
          )}
        </Media>

        {canRenderWebsite && (
          <Text
            as="a"
            mb={2}
            variant="sm"
            // @ts-ignore
            href={website}
            target="_blank"
            onClick={() => tracking.trackEvent(tappedViewTrackingData)}
          >
            {website}
          </Text>
        )}

        {canRenderVatNumber && (
          <Text variant="sm">{`VAT ID#: ${vatNumber}`}</Text>
        )}
      </Column>
    </GridColumns>
  )
}

export const AboutPartnerFragmentContainer = createFragmentContainer(
  AboutPartner,
  {
    partner: graphql`
      fragment AboutPartner_partner on Partner {
        profile {
          fullBio
          bio
        }
        website
        vatNumber
        displayFullPartnerPage
        slug
        internalID
      }
    `,
  }
)
