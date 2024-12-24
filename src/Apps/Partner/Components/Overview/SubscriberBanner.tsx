import { Message, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { SubscriberBanner_partner$data } from "__generated__/SubscriberBanner_partner.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface SubscriberBannerProps {
  partner: SubscriberBanner_partner$data
}

export const SubscriberBanner: React.FC<
  React.PropsWithChildren<SubscriberBannerProps>
> = ({ partner: { name } }) => {
  const title = `${name} does not have a full profile.`
  return (
    <Message mb={4} title={title}>
      <Text display="inline">{`Are you a representative of ${name}?`}</Text>
      <RouterLink inline to="https://partners.artsy.net/gallery-partnerships/">
        <Text display="inline">
          &nbsp;Learn about Artsy gallery partnerships.
        </Text>
      </RouterLink>
    </Message>
  )
}

export const SubscriberBannerFragmentContainer = createFragmentContainer(
  SubscriberBanner,
  {
    partner: graphql`
      fragment SubscriberBanner_partner on Partner {
        name
      }
    `,
  },
)
