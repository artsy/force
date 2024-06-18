import { Button, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RegisterButton_sale$data } from "__generated__/RegisterButton_sale.graphql"
import { RegisterButton_me$data } from "__generated__/RegisterButton_me.graphql"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useRouter } from "System/Hooks/useRouter"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useAuthDialog } from "Components/AuthDialog"

const logger = createLogger("RegisterButton")

export interface RegisterButtonProps {
  me: RegisterButton_me$data
  sale: RegisterButton_sale$data
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({ me, sale }) => {
  const { router } = useRouter()
  const { tracking } = useAuctionTracking()

  const { conditions, userLacksIdentityVerification } = computeConditions({
    sale,
    me,
  })

  const { showAuthDialog } = useAuthDialog()

  const checkRegistrationStatus = () => {
    const saleURL = `/auction/${sale.slug}`

    if (!me?.internalID) {
      showAuthDialog({
        mode: "Login",
        options: {
          redirectTo: `${saleURL}/register`,
          title: mode => {
            const action = mode === "Login" ? "Log in" : "Sign up"
            return `${action} to bid on artworks`
          },
        },
        analytics: {
          contextModule: ContextModule.auctionSidebar,
          intent: Intent.registerToBid,
        },
      })

      // Register
    } else if (!me?.hasCreditCards) {
      router.push(`${saleURL}/register`)

      // Confirm Registration
    } else {
      router.push(`${saleURL}/confirm-registration`)
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
  me: RegisterButton_me$data
  sale: RegisterButton_sale$data
}) => {
  const registrationAttempted = Boolean(sale.bidder)
  const qualifiedForBidding =
    sale.registrationStatus?.internalID && sale.bidder?.qualifiedForBidding
  const userLacksIdentityVerification =
    sale.requireIdentityVerification && !me?.isIdentityVerified
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
      <RouterLink inline to="/identity-verification-faq">
        FAQ
      </RouterLink>
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
        isIdentityVerified
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
