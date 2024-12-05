import {
  Box,
  Button,
  Flex,
  Link,
  Select,
  Option,
  Separator,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarBidAction_artwork$data } from "__generated__/ArtworkSidebarBidAction_artwork.graphql"
import { ArtworkSidebarBidAction_me$data } from "__generated__/ArtworkSidebarBidAction_me.graphql"
import { useTracking } from "react-tracking"
import { getENV } from "Utils/getENV"
import { bidderQualifications } from "Utils/identityVerificationRequirements"
import { compact } from "lodash"
import { Router } from "found"
import { useRouter } from "System/Hooks/useRouter"
import { ActionType, ContextModule, Intent, OwnerType } from "@artsy/cohesion"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { ShowAuthDialog, withAuthDialog } from "Components/AuthDialog"
import HelpIcon from "@artsy/icons/HelpIcon"
import { useState } from "react"

export interface ArtworkSidebarBidActionProps {
  artwork: ArtworkSidebarBidAction_artwork$data
  me: ArtworkSidebarBidAction_me$data
  router?: Router
  showAuthDialog: ShowAuthDialog
}

export interface ArtworkSidebarBidActionState {
  selectedMaxBidCents: number
}

const RegisterToBidButton: React.FC<React.PropsWithChildren<{
  onClick: () => void
}>> = ({ onClick }) => {
  return (
    <Button width="100%" size="large" mt={1} onClick={onClick} data-test="bid">
      Register to bid
    </Button>
  )
}

const VerifyIdentityButton: React.FC<React.PropsWithChildren<{
  id: string
}>> = ({ id }) => (
  <a href={`/identity-verification/${id}`}>
    <Button width="100%" size="large">
      Verify identity
    </Button>
  </a>
)

const IdentityVerificationDisclaimer: React.FC<React.PropsWithChildren<
  unknown
>> = () => {
  return (
    <Text variant="sm-display" color="black60" textAlign="center">
      Identity verification required to bid.{" "}
      <Link href="/identity-verification-faq">FAQ</Link>
    </Text>
  )
}

const ArtworkSidebarBidAction: React.FC<ArtworkSidebarBidActionProps> = ({
  artwork,
  me,
  showAuthDialog,
  router,
}) => {
  const [selectedMaxBidCents, setSelectedMaxBidCents] = useState(0)
  const tracking = useTracking()

  const setMaxBid = (newVal: string) => {
    setSelectedMaxBidCents(parseInt(newVal, 10))
  }

  const redirectToRegister = () => {
    const href = `/auction-registration/${artwork.sale?.slug}`
    window.location.href = href
  }

  const redirectToBid = (firstIncrement: number) => {
    const { slug, sale } = artwork
    const bid = selectedMaxBidCents || firstIncrement
    const href = `/auction/${sale?.slug}/bid/${slug}?bid=${bid}`
    const redirectTo = href

    if (!me) {
      showAuthDialog({
        options: {
          redirectTo,
          title: mode =>
            `${mode === "SignUp" ? "Sign up" : "Log in"} to bid on artworks`,
        },
        analytics: {
          contextModule: ContextModule.artworkSidebar,
          intent: Intent.bid,
        },
      })
    } else {
      router?.push(redirectTo)
    }
  }

  const redirectToLiveBidding = () => {
    const slug = artwork.sale?.slug
    const liveUrl = `${getENV("PREDICTION_URL")}/${slug}`
    window.location.href = me ? `${liveUrl}/login` : liveUrl
  }

  tracking.trackEvent({
    action: ActionType.clickedBid,
    context_owner_type: OwnerType.artwork,
    context_owner_slug: artwork.slug,
    context_owner_id: artwork.internalID,
    signal_lot_watcher_count:
      artwork.collectorSignals?.auction?.lotWatcherCount,
    signal_bid_count: artwork.collectorSignals?.auction?.bidCount,
  })

  const { sale, sale_artwork } = artwork

  if (!sale || lotIsClosed(sale, sale_artwork)) return null

  const myLotStanding = artwork.myLotStanding && artwork.myLotStanding[0]
  const hasMyBids = !!(myLotStanding && myLotStanding.most_recent_bid)

  const {
    registrationAttempted,
    qualifiedForBidding,
    userLacksIdentityVerification,
    pendingIdentityVerification,
    shouldPromptIdVerification,
  } = bidderQualifications(sale, me, {
    qualifiedForBidding: sale.registrationStatus
      ?.qualified_for_bidding as boolean,
  })

  if (sale.is_preview) {
    return (
      <>
        {registrationAttempted ? (
          qualifiedForBidding ? (
            <Button width="100%" size="large" mt={1} disabled>
              Registration complete
            </Button>
          ) : shouldPromptIdVerification ? (
            <VerifyIdentityButton
              id={pendingIdentityVerification?.internalID || ""}
            />
          ) : (
            <Button width="100%" size="large" mt={1} disabled>
              Registration pending
            </Button>
          )
        ) : (
          <RegisterToBidButton onClick={redirectToRegister} />
        )}
        <Spacer y={1} />
        {userLacksIdentityVerification && <IdentityVerificationDisclaimer />}
      </>
    )
  }

  if (sale.is_live_open) {
    const notApprovedBidderBeforeRegistrationClosed =
      !!sale.is_registration_closed && !qualifiedForBidding

    return (
      <>
        {notApprovedBidderBeforeRegistrationClosed ? (
          <>
            <Text variant="xs" color="black60" pb={1} textAlign="center">
              Registration closed
            </Text>
            <Button width="100%" size="large" onClick={redirectToLiveBidding}>
              Watch live bidding
            </Button>
          </>
        ) : (
          <>
            <Button width="100%" size="large" onClick={redirectToLiveBidding}>
              Enter live bidding
            </Button>
            <Spacer y={1} />
            {userLacksIdentityVerification && (
              <IdentityVerificationDisclaimer />
            )}
          </>
        )}
      </>
    )
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
          {userLacksIdentityVerification && <IdentityVerificationDisclaimer />}
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
      sale_artwork?.increments?.filter(
        increment => (increment?.cents ?? 0) > (myLastMaxBid || 0)
      )
    )

    const firstIncrement = increments[0]

    const selectOptions = increments.map(increment => ({
      value: increment.cents?.toString(),
      text: increment.display,
    }))

    return (
      <>
        <Separator my={2} />
        <Flex width="100%" flexDirection="row" alignItems="center">
          <Text variant="sm-display" color="black100" mr={1}>
            Place max bid
          </Text>
          <Tooltip
            content="Set the maximum amount you would like Artsy to bid up to on your behalf"
            placement="top"
          >
            <Box style={{ lineHeight: 0 }}>
              <HelpIcon aria-hidden title="" />
            </Box>
          </Tooltip>
        </Flex>
        <Spacer y={1} />
        <Select options={selectOptions as Option[]} onSelect={setMaxBid} />
        <Spacer y={1} />
        <Button
          width="100%"
          size="large"
          data-test="bid"
          onClick={() => redirectToBid(firstIncrement?.cents || 0)}
        >
          {hasMyBids ? "Increase max bid" : "Bid"}
        </Button>
      </>
    )
  }

  return null
}

export const ArtworkSidebarBidActionFragmentContainer = withAuthDialog(
  createFragmentContainer(
    (props: ArtworkSidebarBidActionProps) => {
      const { router } = useRouter()
      return <ArtworkSidebarBidAction {...props} router={router} />
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
    }
  )
)
