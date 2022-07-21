import { filterLocations } from "Apps/Artwork/Utils/filterLocations"
import { limitWithCount } from "Apps/Artwork/Utils/limitWithCount"
import { SystemContextConsumer } from "System"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "Components/FollowButton/FollowProfileButton"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"
import { READ_MORE_MAX_CHARS } from "./ArtworkDetailsAboutTheWorkFromArtsy"
import { ArtworkDetailsAboutTheWorkFromPartner_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { track } from "System/Analytics"
import * as Schema from "System/Analytics/Schema"
import Events from "Utils/Events"
import { ContextModule, Intent } from "@artsy/cohesion"
import {
  EntityHeader,
  HTML,
  ReadMore,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { openAuthToSatisfyIntent } from "Utils/openAuthModal"

export interface ArtworkDetailsAboutTheWorkFromPartnerProps {
  artwork: ArtworkDetailsAboutTheWorkFromPartner_artwork
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
                      contextModule={ContextModule.aboutTheWork}
                      size="small"
                    />
                  ) : undefined
                }
              />

              {additional_information && (
                <>
                  <Spacer mt={2} />

                  <Text variant="sm">
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
