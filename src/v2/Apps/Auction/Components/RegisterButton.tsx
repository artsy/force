import { Button, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RegisterButton_sale } from "v2/__generated__/RegisterButton_sale.graphql"
import { RegisterButton_me } from "v2/__generated__/RegisterButton_me.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import createLogger from "v2/Utils/logger"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useRouter } from "v2/System/Router/useRouter"
import { openAuthModal } from "desktop/lib/openAuthModal"
import { ModalType } from "v2/Components/Authentication/Types"
import { useAuctionTracking } from "../Hooks/useAuctionTracking"
// import { useAuctionTracking } from "../../Hooks/useAuctionTracking"

const logger = createLogger("RegisterButton")

export interface RegisterButtonProps {
  me: RegisterButton_me
  sale: RegisterButton_sale
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({ me, sale }) => {
  const { router } = useRouter()
  const { tracking } = useAuctionTracking()

  const { conditions, userLacksIdentityVerification } = computeConditions({
    sale,
    me,
  })

  const checkRegistrationStatus = () => {
    const saleURL = `/auction/${sale.slug}`

    if (!me?.internalID) {
      openAuthModal(ModalType.login, {
        redirectTo: `${saleURL}/register`,
        intent: Intent.registerToBid,
        copy: "Log in to bid on artworks",
        contextModule: ContextModule.auctionSidebar,
      })

      // TODO: should this be removed or duplicate the same check as in the phone form?
      //   // Register
      // } else if (!me?.hasCreditCards) {
      //   router.push(`${saleURL}/register`)

      // Confirm Registration
    } else {
      router.push(`${saleURL}/register`)
      // router.push(`${saleURL}/confirm-registration`)
    }

    tracking.clickedRegisterButton()
  }

  switch (true) {
    case conditions.IS_ECOMMERCE_SALE: {
      return null
    }

    case conditions.CLOSED: {
      return null
    }

    case conditions.LIVE_OPEN: {
      const liveUrl = sale.liveURLIfOpen!
      const href = me ? liveUrl + "/login" : liveUrl

      return (
        <ButtonAction
          title="Enter Live Auction"
          to={href}
          onClick={() => {
            tracking.clickedRegisterButton()
            tracking.enterLiveAuction({
              url: liveUrl,
            })
          }}
        />
      )
    }

    case conditions.REGISTRATION_COMPLETE: {
      return <ButtonAction title="Registration Complete" disabled />
    }

    case conditions.QUALIFIED_FOR_BIDDING: {
      return <ButtonAction title="Approved to Bid" disabled />
    }

    case conditions.VERIFY_IDENTITY: {
      const href = `/identity-verification/${me.pendingIdentityVerification?.internalID}`

      return (
        <ButtonAction
          title="Verify Identity"
          description={<IdentityVerificationMessage />}
          to={href}
          onClick={() => {
            tracking.clickedVerifyIdentity({
              auctionSlug: sale.slug,
              auctionState: sale.status,
              userID: me.internalID,
            })
          }}
        />
      )
    }

    case conditions.REGISTRATION_PENDING: {
      return (
        <ButtonAction
          title="Registration Pending"
          description={
            userLacksIdentityVerification ? (
              <IdentityVerificationMessage />
            ) : (
              "Reviewing submitted information"
            )
          }
          disabled
        />
      )
    }

    case conditions.REGISTRATION_CLOSED: {
      return <ButtonAction title="Registration Closed" disabled />
    }

    case conditions.REGISTRATION_OPEN: {
      return (
        <ButtonAction
          title="Register to Bid"
          description={
            userLacksIdentityVerification ? (
              <IdentityVerificationMessage />
            ) : (
              "Registration required to bid"
            )
          }
          onClick={() => {
            checkRegistrationStatus()
          }}
        />
      )
    }

    /**
     * If we get to this we've missed a condition
     */
    default: {
      logger.error("RegisterButton.tsx: Error displaying registration button.")
      return null
    }
  }
}

export const computeConditions = ({
  me,
  sale,
}: {
  me: RegisterButton_me
  sale: RegisterButton_sale
}) => {
  const registrationAttempted = Boolean(sale.bidder)
  const qualifiedForBidding =
    sale.registrationStatus?.internalID && sale.bidder?.qualifiedForBidding
  const userLacksIdentityVerification =
    sale.requireIdentityVerification && !me?.identityVerified
  const verifyIdentity =
    sale.requireIdentityVerification &&
    !qualifiedForBidding &&
    userLacksIdentityVerification &&
    Boolean(me?.pendingIdentityVerification?.internalID)

  const conditions = {
    IS_ECOMMERCE_SALE: !sale.isAuction,
    CLOSED: sale.isClosed,
    LIVE_OPEN: sale.isLiveOpen,
    QUALIFIED_FOR_BIDDING: registrationAttempted && qualifiedForBidding,
    VERIFY_IDENTITY: verifyIdentity,
    REGISTRATION_COMPLETE:
      sale.isPreview && registrationAttempted && qualifiedForBidding,
    REGISTRATION_PENDING: registrationAttempted && !qualifiedForBidding,
    REGISTRATION_CLOSED: sale.isRegistrationClosed,
    REGISTRATION_OPEN:
      !sale.isClosed &&
      !sale.isLiveOpen &&
      !verifyIdentity &&
      !sale.isRegistrationClosed,
  }

  return {
    conditions,
    registrationAttempted,
    userLacksIdentityVerification,
  }
}

const IdentityVerificationMessage = () => {
  return (
    <Text variant="sm">
      Identity verification required to bid.{" "}
      <RouterLink to="/identity-verification-faq">FAQ</RouterLink>
    </Text>
  )
}

const ButtonAction: React.FC<{
  description?: string | JSX.Element
  disabled?: boolean
  onClick?: () => void
  title: string
  to?: string
}> = ({ description = false, disabled, title, to, onClick }) => {
  return (
    <Flex flexDirection="column" data-testid="RegisterButton">
      <Button
        // @ts-ignore
        as={RouterLink}
        to={to}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </Button>

      <Text textAlign="center" variant="xs" color="black60" mt={0.5}>
        {description}
      </Text>
    </Flex>
  )
}

export const RegisterButtonFragmentContainer = createFragmentContainer(
  RegisterButton,
  {
    me: graphql`
      fragment RegisterButton_me on Me {
        internalID
        identityVerified
        hasCreditCards
        pendingIdentityVerification {
          internalID
        }
      }
    `,
    sale: graphql`
      fragment RegisterButton_sale on Sale {
        bidder {
          qualifiedForBidding
        }
        isAuction
        isClosed
        isLiveOpen
        isPreview
        isRegistrationClosed
        liveURLIfOpen
        requireIdentityVerification
        registrationStatus {
          internalID
        }
        slug
        status
      }
    `,
  }
)
