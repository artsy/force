import { ActionType, ContextModule, Intent, OwnerType } from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import HelpIcon from "@artsy/icons/HelpIcon"
import {
  Box,
  Button,
  Flex,
  Link,
  type Option,
  Select,
  Separator,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { type ShowAuthDialog, withAuthDialog } from "Components/AuthDialog"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { bidderQualifications } from "Utils/identityVerificationRequirements"
import type { ArtworkSidebarBidAction_artwork$data } from "__generated__/ArtworkSidebarBidAction_artwork.graphql"
import type { ArtworkSidebarBidAction_me$data } from "__generated__/ArtworkSidebarBidAction_me.graphql"
import type { Router } from "found"
import { compact } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { type TrackingProp, useTracking } from "react-tracking"

export interface ArtworkSidebarBidActionProps {
  artwork: ArtworkSidebarBidAction_artwork$data
  me: ArtworkSidebarBidAction_me$data
  router?: Router
  showAuthDialog: ShowAuthDialog
  tracking: TrackingProp
}

export interface ArtworkSidebarBidActionState {
  selectedMaxBidCents: number
}

const RegisterToBidButton: React.FC<
  React.PropsWithChildren<{
    onClick: () => void
  }>
> = ({ onClick }) => {
  return (
    <Button width="100%" size="large" mt={1} onClick={onClick} data-test="bid">
      Register to bid
    </Button>
  )
}

const VerifyIdentityButton: React.FC<
  React.PropsWithChildren<{
    id: string
  }>
> = ({ id }) => (
  <a href={`/identity-verification/${id}`}>
    <Button width="100%" size="large">
      Verify identity
    </Button>
  </a>
)

const IdentityVerificationDisclaimer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Text variant="sm-display" color="mono60" textAlign="center">
      Identity verification required to bid.{" "}
      <Link href="/identity-verification-faq">FAQ</Link>
    </Text>
  )
}

export class ArtworkSidebarBidAction extends React.Component<
  ArtworkSidebarBidActionProps,
  ArtworkSidebarBidActionState
> {
  state: ArtworkSidebarBidActionState = {
    selectedMaxBidCents: 0,
  }

  setMaxBid = (newVal: string) => {
    this.setState({ selectedMaxBidCents: Number.parseInt(newVal, 10) })
  }

  redirectToRegister = () => {
    const { sale } = this.props.artwork
    const href = `/auction-registration/${sale?.slug}`
    window.location.href = href
  }

  redirectToBid(firstIncrement: number) {
    const { slug, sale } = this.props.artwork
    const bid = this.state.selectedMaxBidCents || firstIncrement

    const href = `/auction/${sale?.slug}/bid/${slug}?bid=${bid}`

    const redirectTo = href.replace("/auction/", "/auction/")

    this.props.tracking.trackEvent({
      action: ActionType.clickedBid,
      context_owner_type: OwnerType.artwork,
      context_owner_slug: this.props.artwork.slug,
      context_owner_id: this.props.artwork.internalID,
      signal_lot_watcher_count:
        this.props.artwork.collectorSignals?.auction?.lotWatcherCount ??
        undefined,
      signal_bid_count:
        this.props.artwork.collectorSignals?.auction?.bidCount ?? undefined,
    })

    if (!this.props.me) {
      this.props.showAuthDialog({
        options: {
          redirectTo,
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to bid on artworks`
          },
          image: this.props.artwork.image,
        },
        analytics: {
          contextModule: ContextModule.artworkSidebar,
          intent: Intent.bid,
        },
      })
    } else {
      this.props.router?.push(redirectTo)
    }
  }

  redirectToLiveBidding(me: ArtworkSidebarBidAction_me$data | null) {
    const slug = this.props.artwork.sale?.slug
    const liveUrl = `${getENV("PREDICTION_URL")}/${slug}`

    this.props.tracking.trackEvent({
      type: DeprecatedSchema.Type.Button,
      flow: DeprecatedSchema.Flow.Auctions,
      subject: DeprecatedSchema.Subject.EnterLiveAuction,
      context_module: DeprecatedSchema.ContextModule.Sidebar,
      action_type: DeprecatedSchema.ActionType.Click,
    })

    if (me) {
      window.location.href = `${liveUrl}/login`
    } else {
      window.location.href = liveUrl
    }
  }

  render() {
    const {
      artwork,
      artwork: { sale, sale_artwork },
      me,
    } = this.props

    if (!sale || lotIsClosed(sale, sale_artwork)) return null

    /**
     * NOTE: This is making an incorrect assumption that there could only ever
     * be 1 live sale with this work. When we run into that case, there is
     * likely design work to be done too, so we can adjust this then.
     */
    const myLotStanding = artwork.myLotStanding && artwork.myLotStanding[0]
    const hasMyBids = !!(myLotStanding && myLotStanding.most_recent_bid)

    const {
      registrationAttempted,
      qualifiedForBidding,
      userLacksIdentityVerification,
      pendingIdentityVerification,
      shouldPromptIdVerification,
    } = bidderQualifications(
      sale,
      me,
      sale.registrationStatus &&
        ({
          qualifiedForBidding: sale.registrationStatus.qualified_for_bidding,
        } as any),
    )

    if (sale.is_preview) {
      let PreviewAction: React.FC<React.PropsWithChildren<unknown>>

      if (registrationAttempted) {
        // FIXME: Extract to a real component
        if (qualifiedForBidding) {
          // eslint-disable-next-line react/no-unstable-nested-components
          PreviewAction = () => (
            <Button width="100%" size="large" mt={1} disabled>
              Registration complete
            </Button>
          )
        } else if (shouldPromptIdVerification) {
          // eslint-disable-next-line react/no-unstable-nested-components
          PreviewAction = () => (
            <VerifyIdentityButton
              id={pendingIdentityVerification?.internalID || ""}
            />
          )
        } else {
          // eslint-disable-next-line react/no-unstable-nested-components
          PreviewAction = () => (
            <Button width="100%" size="large" mt={1} disabled>
              Registration pending
            </Button>
          )
        }
      } else {
        // eslint-disable-next-line react/no-unstable-nested-components
        PreviewAction = () => (
          <RegisterToBidButton onClick={this.redirectToRegister} />
        )
      }
      return (
        <>
          <PreviewAction />

          <Spacer y={1} />

          {userLacksIdentityVerification && <IdentityVerificationDisclaimer />}
        </>
      )
    }

    if (sale.is_live_open) {
      const notApprovedBidderBeforeRegistrationClosed: boolean =
        !!sale.is_registration_closed && !qualifiedForBidding

      if (notApprovedBidderBeforeRegistrationClosed) {
        return (
          <>
            <Text variant="xs" color="mono60" pb={1} textAlign="center">
              Registration closed
            </Text>

            <Button
              width="100%"
              size="large"
              onClick={() => this.redirectToLiveBidding(me)}
            >
              Watch live bidding
            </Button>
          </>
        )
      } else {
        return (
          <>
            <Button
              width="100%"
              size="large"
              onClick={() => this.redirectToLiveBidding(me)}
            >
              Enter live bidding
            </Button>

            <Spacer y={1} />

            {userLacksIdentityVerification && (
              <IdentityVerificationDisclaimer />
            )}
          </>
        )
      }
    }

    if (sale.is_open) {
      if (registrationAttempted && !qualifiedForBidding) {
        return (
          <>
            {shouldPromptIdVerification ? (
              <VerifyIdentityButton
                id={pendingIdentityVerification?.internalID || ""}
              />
            ) : (
              <Button width="100%" size="large" disabled>
                Registration pending
              </Button>
            )}

            <Spacer y={1} />

            {userLacksIdentityVerification && (
              <IdentityVerificationDisclaimer />
            )}
          </>
        )
      }

      if (sale.is_registration_closed && !qualifiedForBidding) {
        return (
          <Button width="100%" size="large" disabled>
            Registration closed
          </Button>
        )
      }

      const myLastMaxBid =
        hasMyBids && myLotStanding?.most_recent_bid?.max_bid?.cents

      const increments = compact(
        artwork.sale_artwork?.increments?.filter(
          increment => (increment?.cents ?? 0) > (myLastMaxBid || 0),
        ),
      )

      const firstIncrement = increments[0]

      const selectOptions = increments.map(increment => ({
        value: increment.cents?.toString(),
        text: increment.display,
      }))

      if (!qualifiedForBidding && userLacksIdentityVerification) {
        return (
          <>
            <RegisterToBidButton onClick={this.redirectToRegister} />

            <Spacer y={1} />

            <IdentityVerificationDisclaimer />
          </>
        )
      } else {
        return (
          <>
            <Separator my={2} />

            <Flex width="100%" flexDirection="row" alignItems="center">
              <Text variant="sm-display" color="mono100" mr={1}>
                Place max bid
              </Text>

              <Tooltip
                content="Set the maximum amount you would like Artsy to bid up to on your behalf"
                placement="top"
              >
                <Box
                  style={{
                    // Vertically center
                    lineHeight: 0,
                  }}
                >
                  <HelpIcon aria-hidden title="" />
                </Box>
              </Tooltip>
            </Flex>

            <Spacer y={1} />

            <Select
              options={selectOptions as Option[]}
              onSelect={this.setMaxBid}
            />

            <Spacer y={1} />

            <Button
              width="100%"
              size="large"
              data-test="bid"
              onClick={() => this.redirectToBid(firstIncrement?.cents || 0)}
            >
              {hasMyBids ? "Increase max bid" : "Bid"}
            </Button>
          </>
        )
      }
    }
  }
}

export const ArtworkSidebarBidActionFragmentContainer = withAuthDialog(
  createFragmentContainer(
    (props: ArtworkSidebarBidActionProps) => {
      const { router } = useRouter()
      const tracking = useTracking()
      return (
        <ArtworkSidebarBidAction
          {...props}
          router={router}
          tracking={tracking}
        />
      )
    },
    {
      artwork: graphql`
        fragment ArtworkSidebarBidAction_artwork on Artwork {
          myLotStanding(live: true) {
            most_recent_bid: mostRecentBid {
              max_bid: maxBid {
                cents
              }
            }
          }
          slug
          internalID
          image {
            url(version: "main")
            aspectRatio
            blurhash
          }
          sale {
            slug
            registrationStatus {
              qualified_for_bidding: qualifiedForBidding
            }
            is_preview: isPreview
            is_open: isOpen
            is_live_open: isLiveOpen
            is_closed: isClosed
            is_registration_closed: isRegistrationClosed
            requireIdentityVerification
          }
          sale_artwork: saleArtwork {
            increments {
              cents
              display
            }
            endedAt
          }
          collectorSignals {
            auction {
              bidCount
              lotWatcherCount
            }
          }
        }
      `,
      me: graphql`
        fragment ArtworkSidebarBidAction_me on Me {
          isIdentityVerified
          pendingIdentityVerification {
            internalID
          }
        }
      `,
    },
  ),
)
