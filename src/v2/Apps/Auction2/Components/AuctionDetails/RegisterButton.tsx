import { Button, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RegisterButton_sale$data } from "v2/__generated__/RegisterButton_sale.graphql"
import { RegisterButton_me$data } from "v2/__generated__/RegisterButton_me.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import createLogger from "v2/Utils/logger"
import { useTracking } from "v2/System/Analytics/useTracking"

const logger = createLogger("Auctions/RegisterButton.tsx")

interface RegisterButtonProps {
  me: RegisterButton_me$data
  sale: RegisterButton_sale$data
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({ me, sale }) => {
  const { trackEvent } = useTracking()
  const { conditions, userLacksIdentityVerification } = computeConditions({
    sale,
    me,
  })

  const handleClick = () => {
    trackEvent({
      // TODO
    })
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
          onClick={handleClick}
        />
      )
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
          onClick={handleClick}
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
            // TODO: wire up registration clicks
            // https://github.com/artsy/force/blob/f0b90ff8272bd3bd7a4508069e841730c0a04dd0/src/desktop/apps/auction/components/DOM.js#L81
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
    sale.requireIdentityVerification && !me.identityVerified
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
}> = ({ description = false, disabled, title, to }) => {
  return (
    <Flex flexDirection="column" data-testid="RegisterButton">
      <Button
        // @ts-ignore
        as={RouterLink}
        to={to}
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
        identityVerified
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
