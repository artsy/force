import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { READ_MORE_MAX_CHARS } from "./ArtworkDetailsAboutTheWorkFromArtsy"
import { ArtworkDetailsAboutTheWorkFromPartner_artwork$data } from "__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import Events from "Utils/Events"
import { ContextModule, Intent } from "@artsy/cohesion"
import {
  HTML,
  ReadMore,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
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

  renderReadMore(breakpoint?: string) {
    const { additionalInformation } = this.props.artwork
    const xs = breakpoint === "xs"
    const maxChars = xs ? READ_MORE_MAX_CHARS.xs : READ_MORE_MAX_CHARS.default

    if (!additionalInformation) return null

    return (
      <HTML variant="sm">
        <ReadMore
          maxChars={maxChars}
          content={additionalInformation}
          onReadMoreClicked={this.trackReadMoreClick.bind(this)}
        />
      </HTML>
    )
  }

  render() {
    const { artwork } = this.props
    const { additionalInformation, partner } = artwork

    if (!additionalInformation && !partner) return null

    return (
      <StackableBorderBox
        flexDirection="column"
        data-test="aboutTheWorkPartner"
      >
        {partner && (
          <EntityHeaderPartnerFragmentContainer
            // @ts-ignore RELAY UPGRADE 13
            partner={partner}
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

        {additionalInformation && (
          <>
            {partner && <Spacer mt={2} />}

            <Text variant="sm">
              <Media at="xs">{this.renderReadMore("xs")}</Media>
              <Media greaterThan="xs">{this.renderReadMore()}</Media>
            </Text>
          </>
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
        additionalInformation(format: HTML)
        partner {
          ...EntityHeaderPartner_partner
          internalID
          profile {
            internalID
          }
        }
      }
    `,
  }
)
