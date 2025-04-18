import { ContextModule } from "@artsy/cohesion"
import { Skeleton, SkeletonBox, StackableBorderBox } from "@artsy/palette"
import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtworkDetailsPartnerInfoQuery } from "__generated__/ArtworkDetailsPartnerInfoQuery.graphql"
import type { ArtworkDetailsPartnerInfo_artwork$data } from "__generated__/ArtworkDetailsPartnerInfo_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"

export interface PartnerInfoProps {
  artwork: ArtworkDetailsPartnerInfo_artwork$data
}

export const PartnerInfo: React.FC<
  React.PropsWithChildren<PartnerInfoProps>
> = ({ artwork }) => {
  const { partner } = artwork

  if (!partner) return null

  const canLink = Boolean(
    partner?.partnerPageEligible && partner?.isDefaultProfilePublic,
  )

  return (
    <StackableBorderBox flexDirection="column">
      <EntityHeaderPartnerFragmentContainer
        partner={partner}
        displayLink={canLink}
        FollowButton={
          partner.profile ? (
            <FollowProfileButtonQueryRenderer
              id={partner.profile.internalID}
              contextModule={ContextModule.aboutTheWork}
              size="small"
            />
          ) : undefined
        }
      />
    </StackableBorderBox>
  )
}

export const ArtworkDetailsPartnerInfoFragmentContainer =
  createFragmentContainer(PartnerInfo, {
    artwork: graphql`
      fragment ArtworkDetailsPartnerInfo_artwork on Artwork {
        partner {
          ...EntityHeaderPartner_partner
          partnerPageEligible
          isDefaultProfilePublic
          internalID
          profile {
            internalID
          }
        }
      }
    `,
  })

const PLACEHOLDER = (
  <Skeleton>
    <StackableBorderBox>
      <SkeletonBox width="100%" height={90} />
    </StackableBorderBox>
  </Skeleton>
)

export const ArtworkDetailsPartnerInfoQueryRenderer: React.FC<
  React.PropsWithChildren<{
    slug: string
  }>
> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtworkDetailsPartnerInfoQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtworkDetailsPartnerInfoQuery($slug: String!) {
          artwork(id: $slug) {
            ...ArtworkDetailsPartnerInfo_artwork
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props) {
          return PLACEHOLDER
        }
        if (props.artwork) {
          return (
            <ArtworkDetailsPartnerInfoFragmentContainer
              artwork={props.artwork}
            />
          )
        }
      }}
    />
  )
}
