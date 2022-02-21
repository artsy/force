import { filterLocations } from "v2/Apps/Artwork/Utils/filterLocations"
import { limitWithCount } from "v2/Apps/Artwork/Utils/limitWithCount"
import { SystemContextConsumer } from "v2/System"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "v2/Components/FollowButton/FollowProfileButton"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { Media } from "v2/Utils/Responsive"
import { READ_MORE_MAX_CHARS } from "./ArtworkDetailsAboutTheWorkFromArtsy"
import { ArtworkDetailsAboutTheWorkFromPartner_artwork$data } from "v2/__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"
import { data as sd } from "sharify"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import Events from "v2/Utils/Events"
import { ContextModule, Intent } from "@artsy/cohesion"
import {
  EntityHeader,
  HTML,
  ReadMore,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { openAuthToSatisfyIntent } from "v2/Utils/openAuthModal"

export interface ArtworkDetailsAboutTheWorkFromPartnerProps {
  artwork: ArtworkDetailsAboutTheWorkFromPartner_artwork$data
}

@track(
  { context_module: Schema.ContextModule.AboutTheWorkPartner },
  { dispatch: data => Events.postEvent(data) }
)
export class ArtworkDetailsAboutTheWorkFromPartner extends Component<
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
    openAuthToSatisfyIntent(mediator, {
      entity: partner,
      contextModule: ContextModule.aboutTheWork,
      intent: Intent.followPartner,
    })
  }

  renderReadMore(breakpoint?: string) {
    const { additional_information } = this.props.artwork
    const xs = breakpoint === "xs"
    const maxChars = xs ? READ_MORE_MAX_CHARS.xs : READ_MORE_MAX_CHARS.default

    if (!additional_information) return null

    return (
      <HTML variant="sm">
        <ReadMore
          maxChars={maxChars}
          content={additional_information}
          onReadMoreClicked={this.trackReadMoreClick.bind(this)}
        />
      </HTML>
    )
  }

  render() {
    const { artwork } = this.props
    const { additional_information, partner } = artwork
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const locationNames = get(
      partner,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      p => limitWithCount(filterLocations(p.locations), 2),
      []
    ).join(", ")

    // Partner avatar is not shown for artworks from benefit auctions or gallery auctions
    const showPartnerLogo = !(
      artwork.sale &&
      (artwork.sale.isBenefit || artwork.sale.isGalleryAuction)
    )

    const showPartnerFollow =
      partner && partner.type !== "Auction House" && partner.profile
    const hasDefaultPublicProfile = partner && partner.is_default_profile_public
    const partnerName = partner && partner.name

    return (
      <SystemContextConsumer>
        {({ user }) => {
          return (
            <StackableBorderBox
              flexDirection="column"
              data-test="aboutTheWorkPartner"
            >
              <EntityHeader
                name={partnerName!}
                href={
                  hasDefaultPublicProfile ? `${sd.APP_URL}${partner?.href}` : ""
                }
                meta={locationNames}
                {...(showPartnerLogo
                  ? {
                      initials: partner?.initials!,
                      image: {
                        src: partner?.profile?.icon?.cropped?.src,
                        srcSet: partner?.profile?.icon?.cropped?.srcSet,
                        lazyLoad: true,
                      },
                    }
                  : {})}
                FollowButton={
                  showPartnerFollow && partner?.profile ? (
                    <FollowProfileButton
                      profile={partner.profile}
                      user={user}
                      contextModule={ContextModule.aboutTheWork}
                      buttonProps={{
                        size: "small",
                        variant: "secondaryOutline",
                      }}
                    />
                  ) : undefined
                }
              />

              {additional_information && (
                <>
                  <Spacer mt={2} />

                  <Text variant="text">
                    <Media at="xs">{this.renderReadMore("xs")}</Media>
                    <Media greaterThan="xs">{this.renderReadMore()}</Media>
                  </Text>
                </>
              )}
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
              cropped(width: 45, height: 45) {
                src
                srcSet
              }
            }
          }
        }
      }
    `,
  }
)
