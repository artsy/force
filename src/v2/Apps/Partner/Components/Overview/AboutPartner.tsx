import React from "react"
import { Column, GridColumns, Text } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"
import { AboutPartner_partner } from "v2/__generated__/AboutPartner_partner.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

export interface AboutPartnerProps {
  partner: AboutPartner_partner
}

export const AboutPartner: React.FC<AboutPartnerProps> = ({
  partner: { profile, vatNumber, website, fullProfileEligible },
}) => {
  const isEmpty = !profile?.fullBio && !vatNumber && !website

  if (isEmpty) {
    return null
  }

  const canRenderWebsite = website && fullProfileEligible
  const canRenderVatNumber = vatNumber && fullProfileEligible
  const fullBio = profile?.fullBio
  const limitedBio = profile?.bio

  return (
    <GridColumns mb={12} gridRowGap={2}>
      <Column span={6}>
        <Text variant="title">About</Text>
      </Column>

      <Column span={6}>
        <Media at="xs">
          {limitedBio && <Text variant="text">{limitedBio}</Text>}
        </Media>
        <Media greaterThan="xs">
          {fullBio && <Text variant="text">{fullBio}</Text>}
        </Media>

        {canRenderWebsite && (
          <RouterLink to={website!} target="_blank">
            <Text mt={2} variant="text">
              {website}
            </Text>
          </RouterLink>
        )}

        {canRenderVatNumber && (
          <Text mt={2} variant="text">{`VAT ID#: ${vatNumber}`}</Text>
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
        fullProfileEligible
      }
    `,
  }
)
