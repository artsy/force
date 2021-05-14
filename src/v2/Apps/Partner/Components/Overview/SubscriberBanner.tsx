import React from "react"
import { Box, Text } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { createFragmentContainer, graphql } from "react-relay"
import { SubscriberBanner_partner } from "v2/__generated__/SubscriberBanner_partner.graphql"

export interface SubscriberBannerProps {
  partner: SubscriberBanner_partner
}

export const SubscriberBanner: React.FC<SubscriberBannerProps> = ({
  partner: { hasFairPartnership, name },
}) => {
  return (
    <Box p={2} bg="black5">
      {hasFairPartnership ? (
        <Text
          mb={1}
          variant="title"
        >{`${name} participates in Artsy’s art fair coverage but does not have a full profile.`}</Text>
      ) : (
        <Text
          mb={1}
          variant="title"
        >{`${name} is not currently an Artsy partner and does not have a full profile.`}</Text>
      )}
      <Text
        display="inline"
        variant="subtitle"
      >{`Do you represent ${name}?`}</Text>
      <RouterLink to="https://partners.artsy.net/gallery-partnerships/">
        <Text display="inline" variant="subtitle">
          &nbsp;Learn about Artsy gallery partnerships.
        </Text>
      </RouterLink>
    </Box>
  )
}

export const SubscriberBannerFragmentContainer = createFragmentContainer(
  SubscriberBanner,
  {
    partner: graphql`
      fragment SubscriberBanner_partner on Partner {
        hasFairPartnership
        name
      }
    `,
  }
)
