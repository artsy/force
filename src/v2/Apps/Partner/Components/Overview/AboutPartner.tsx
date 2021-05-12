import React from "react"
import { Column, GridColumns, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AboutPartner_partner } from "v2/__generated__/AboutPartner_partner.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

export interface AboutPartnerProps {
  partner: AboutPartner_partner
}

export const AboutPartner: React.FC<AboutPartnerProps> = ({
  partner: { profile, vatNumber, website },
}) => {
  const isEmpty = !profile?.fullBio && !vatNumber && !website

  if (isEmpty) {
    return null
  }

  return (
    <GridColumns mb={140} gridRowGap={2}>
      <Column span={[12, 6]}>
        <Text variant="title">About</Text>
      </Column>

      <Column span={[12, 6]}>
        {profile?.fullBio && <Text variant="text">{profile.fullBio}</Text>}
        {website && (
          <RouterLink to={website}>
            <Text mt={2} variant="text">
              {website}
            </Text>
          </RouterLink>
        )}

        {vatNumber && (
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
        }
        website
        vatNumber
      }
    `,
  }
)
