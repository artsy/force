import React from "react"
import block from "bem-cn-lite"
import { connect } from "react-redux"
import { Button, Sans } from "@artsy/palette"
import { bidderNeedsIdentityVerification } from "v2/Utils/identityVerificationRequirements"

const RegistrationText: React.FC<{
  userNeedsIdentityVerification: boolean
  text?: string
  color?: string
}> = ({
  userNeedsIdentityVerification,
  text = "Registration required to bid",
  color = "black60",
}) => {
  if (userNeedsIdentityVerification) {
    return (
      <Sans mt="1" size="3" color="black60" textAlign="center">
        Identity verification required to bid.{" "}
        <a
          target="_blank"
          href="https://www.artsy.net/identity-verification-faq"
        >
          FAQ
        </a>
      </Sans>
    )
  } else {
    return (
      <Sans mt="1" size="3" color={color} textAlign="center">
        {text}
      </Sans>
    )
  }
}

interface RegistrationProps {
  auction: any
  isClosed: boolean
  isEcommerceSale?: boolean
  isLiveOpen?: boolean
  isMobile: boolean
  isRegistrationEnded: boolean
  userRegistration?: { qualified_for_bidding: boolean }
  showContactInfo?: boolean
  user: any
  userNeedsIdentityVerification?: boolean
}

const Registration: React.FC<RegistrationProps> = props => {
  const {
    auction,
    user,
    isClosed,
    isEcommerceSale,
    userRegistration,
    isRegistrationEnded,
    showContactInfo,
    userNeedsIdentityVerification,
  } = props

  const b = block("auction-Registration")
  const trackBidClick = e => {
    window.analytics.track('Clicked "Register to bid"', {
      context_type: "auctions landing",
      auction_slug: auction.id,
      auction_state: auction.get("auction_state"),
      user_id: user && user.id,
    })
  }

  if (isEcommerceSale) {
    return null
  }

  return (
    <div className={b()}>
      {(() => {
        if (isClosed) {
          return null
        } else if (Boolean(userRegistration)) {
          if (!userRegistration.qualified_for_bidding) {
            return (
              <div className={b("wrapper")}>
                <Button width="100%" size="large" disabled>
                  Registration pending
                </Button>
                <RegistrationText
                  userNeedsIdentityVerification={userNeedsIdentityVerification}
                  text="Reviewing submitted information"
                  color="yellow100"
                />
              </div>
            )
          } else {
            return (
              <div className={b("approved")}>
                <Sans mt="1" size="3" color="green100">
                  <span className="icon-check" />
                  Approved to Bid
                </Sans>
              </div>
            )
          }
        } else if (isRegistrationEnded) {
          return (
            <div className={b("wrapper")}>
              <Button width="100%" size="large" disabled>
                Registration closed
              </Button>
              <Sans mt="1" size="3" color="black60" textAlign="center">
                Registration required to bid
              </Sans>
            </div>
          )
        } else {
          return (
            <div className={b("wrapper")}>
              <div className="js-register-button">
                <Button width="100%" size="large" onClick={trackBidClick}>
                  Register to bid
                </Button>
              </div>
              <RegistrationText
                userNeedsIdentityVerification={userNeedsIdentityVerification}
              />
            </div>
          )
        }
      })()}

      {showContactInfo && ( // Desktop only
        <div>
          <div className={b("how-to-bid")}>
            <strong>Questions?</strong>
            <br />
            <a href="/how-auctions-work">How to Bid on Artsy</a>
          </div>

          <div className={b("question")}>
            <strong>Contact us</strong>
            <br />
            <a href="mailto:specialist@artsy.net">specialist@artsy.net</a>
            <br />
            +1.646.712.8154
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state): RegistrationProps => {
  const { auction, isEcommerceSale, isMobile, me } = state.app

  const userRegistration = me?.bidders?.[0]
  const showContactInfo = !isMobile
  const userNeedsIdentityVerification = bidderNeedsIdentityVerification({
    sale: auction.attributes,
    user: me,
    bidder: userRegistration,
  })

  return {
    auction,
    isClosed: auction.isClosed() || auction.get("clockState") === "closed",
    isEcommerceSale,
    isMobile,
    isLiveOpen: auction.get("is_live_open"),
    isRegistrationEnded: auction.isRegistrationEnded(),
    userRegistration,
    showContactInfo,
    user: me,
    userNeedsIdentityVerification,
  }
}

export default connect(mapStateToProps)(Registration)

// Helpers

export const test = { Registration }
