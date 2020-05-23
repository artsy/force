import { filterLocations } from "v2/Apps/Artwork/Utils/filterLocations"
import { limitWithCount } from "v2/Apps/Artwork/Utils/limitWithCount"
import { SystemContextConsumer } from "v2/Artsy"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "v2/Components/FollowButton/FollowProfileButton"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { Media } from "v2/Utils/Responsive"
import { READ_MORE_MAX_CHARS } from "./ArtworkDetailsAboutTheWorkFromArtsy"

import { ArtworkDetailsAboutTheWorkFromPartner_artwork } from "v2/__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"
import { data as sd } from "sharify"

import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import Events from "v2/Utils/Events"

import { Intent, ContextModule } from "@artsy/cohesion"
import {
  Box,
  EntityHeader,
  ReadMore,
  Sans,
  Serif,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"
import { FollowProfileButton_profile } from "v2/__generated__/FollowProfileButton_profile.graphql"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"

export interface ArtworkDetailsAboutTheWorkFromPartnerProps {
  artwork: ArtworkDetailsAboutTheWorkFromPartner_artwork
}

@track(
  {
    context_module: Schema.ContextModule.AboutTheWorkPartner,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class ArtworkDetailsAboutTheWorkFromPartner extends React.Component<
ArtworkDetailsAboutTheWorkFromPartnerProps
> {
  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkAboutTheWork,
    subject: Schema.Subject.ReadMore,
    type: Schema.Type.Button,
  })
  trackReadMoreClick() {
    // noop
  }

  handleOpenAuth = (mediator, partner) => {
    openAuthToFollowSave(mediator, {
      entity: partner,
      contextModule: ContextModule.aboutTheWork,
      intent: Intent.followPartner,
    })
  }

  renderReadMore(breakpoint?: string) {
    const { additional_information } = this.props.artwork
    const xs = breakpoint === "xs"
    const maxChars = xs ? READ_MORE_MAX_CHARS.xs : READ_MORE_MAX_CHARS.default

    return (
      <ReadMore
        maxChars={maxChars}
        content={additional_information}
        onReadMoreClicked={this.trackReadMoreClick.bind(this)}
      />
    )
  }

  render() {
    const { artwork } = this.props
    const { additional_information, partner } = artwork
    const locationNames = get(
      partner,
      p => limitWithCount(filterLocations(p.locations), 2),
      []
    ).join(", ")

    // Partner avatar is not shown for artworks from benefit auctions or gallery auctions
    const showPartnerLogo = !(
      artwork.sale &&
      (artwork.sale.isBenefit || artwork.sale.isGalleryAuction)
    )
    const imageUrl = showPartnerLogo && get(partner, p => p.profile.icon.url)
    const partnerInitials = showPartnerLogo && get(partner, p => p.initials)
    const showPartnerFollow =
      partner && partner.type !== "Auction House" && partner.profile
    const hasDefaultPublicProfile = partner && partner.is_default_profile_public
    const partnerName = partner && partner.name

    return (
      <SystemContextConsumer>
        {({ user, mediator }) => {
          return (
            <StackableBorderBox p={2}>
              <Box data-test="aboutTheWorkPartner">
                <EntityHeader
                  name={partnerName}
                  href={
                    hasDefaultPublicProfile && `${sd.APP_URL}${partner.href}`
                  }
                  meta={locationNames}
                  imageUrl={imageUrl}
                  initials={partnerInitials}
                  FollowButton={
                    showPartnerFollow && (
                      <FollowProfileButton
                        profile={partner.profile}
                        user={user}
                        trackingData={{
                          modelName: Schema.OwnerType.Partner,
                          context_module:
                            Schema.ContextModule.AboutTheWorkPartner,
                          entity_id: partner.internalID,
                          entity_slug: partner.slug,
                        }}
                        onOpenAuthModal={() =>
                          this.handleOpenAuth(mediator, partner)
                        }
                        render={(profile: FollowProfileButton_profile) => {
                          const is_followed = profile.is_followed || false
                          return (
                            <Sans
                              size="2"
                              weight="medium"
                              color="black"
                              data-test="followButton"
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                            >
                              {is_followed ? "Following" : "Follow"}
                            </Sans>
                          )
                        }}
                      >
                        Follow
                      </FollowProfileButton>
                    )
                  }
                />
                {additional_information && (
                  <React.Fragment>
                    <Spacer mb={1} />
                    <Serif size="3">
                      <Media at="xs">{this.renderReadMore("xs")}</Media>
                      <Media greaterThan="xs">{this.renderReadMore()}</Media>
                    </Serif>
                  </React.Fragment>
                )}
              </Box>
            </StackableBorderBox>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export const ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWorkFromPartner,
  {
    artwork: graphql`
      fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
        additional_information: additionalInformation(format: HTML)
        sale {
          isBenefit
          isGalleryAuction
        }
        partner {
          internalID
          slug
          type
          href
          name
          initials
          locations {
            city
          }
          is_default_profile_public: isDefaultProfilePublic
          profile {
            ...FollowProfileButton_profile
            slug
            icon {
              url(version: "square140")
            }
          }
        }
      }
    `,
  }
)
