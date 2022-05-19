import { Column, GridColumns, Text } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"
import { AboutPartner_partner } from "v2/__generated__/AboutPartner_partner.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"

export interface AboutPartnerProps {
  partner: AboutPartner_partner
}

export const AboutPartner: React.FC<AboutPartnerProps> = ({
  partner: { profile, vatNumber, website, displayFullPartnerPage },
}) => {
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
          <RouterLink to={website!} target="_blank">
            <Text mb={2} variant="sm">
              {website}
            </Text>
          </RouterLink>
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
      }
    `,
  }
)
