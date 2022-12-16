import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkDetailsAboutTheWorkFromPartner_artwork$data } from "__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import Events from "Utils/Events"
import { ContextModule, Intent } from "@artsy/cohesion"
import { StackableBorderBox } from "@artsy/palette"
import { openAuthToSatisfyIntent } from "Utils/openAuthModal"
import track from "react-tracking"
import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"

export interface ArtworkDetailsAboutTheWorkFromPartnerProps {
  artwork: ArtworkDetailsAboutTheWorkFromPartner_artwork$data
}

@track(
  { context_module: DeprecatedSchema.ContextModule.AboutTheWorkPartner },
  { dispatch: data => Events.postEvent(data) }
)
export class ArtworkDetailsAboutTheWorkFromPartner extends Component<
  ArtworkDetailsAboutTheWorkFromPartnerProps
> {
  @track({
    action_type: DeprecatedSchema.ActionType.Click,
    flow: DeprecatedSchema.Flow.ArtworkAboutTheWork,
    subject: DeprecatedSchema.Subject.ReadMore,
    type: DeprecatedSchema.Type.Button,
  })
  trackReadMoreClick() {
    // noop
  }

  handleOpenAuth = (mediator, partner) => {
    openAuthToSatisfyIntent(mediator, {
      entity: partner,
      contextModule: ContextModule.aboutTheWork,
      intent: Intent.followPartner,
    })
  }

  render() {
    const { partner } = this.props.artwork

    if (!partner) return null

    const canLink = Boolean(
      partner?.partnerPageEligible && partner?.isDefaultProfilePublic
    )

    return (
      <StackableBorderBox
        flexDirection="column"
        data-test="aboutTheWorkPartner"
      >
        {partner && (
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
        )}
      </StackableBorderBox>
    )
  }
}

export const ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWorkFromPartner,
  {
    artwork: graphql`
      fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
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
  }
)
