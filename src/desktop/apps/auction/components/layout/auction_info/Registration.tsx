import React from "react"
import block from "bem-cn-lite"
import { connect } from "react-redux"
import { Button, Sans } from "@artsy/palette"

const RegistrationMessage: React.FC<{ color?: string }> = ({
  color = "black60",
  children,
}) => {
  return (
    <Sans mt="1" size="3" color={color} textAlign="center">
      {children}
    </Sans>
  )
}

const IDVRequiredMessage = (): JSX.Element => {
  return (
    <RegistrationMessage>
      Identity verification required to bid.{" "}
      <a target="_blank" href="https://www.artsy.net/identity-verification-faq">
        FAQ
      </a>
    </RegistrationMessage>
  )
}

interface RegistrationProps {
  auction: any
  isClosed: boolean
  isEcommerceSale?: boolean
  isLiveOpen?: boolean
  isMobile: boolean
  isRegistrationEnded: boolean
  showContactInfo?: boolean
  user: any
  userRegistration?: { qualified_for_bidding: boolean }
}

const Registration: React.FC<RegistrationProps> = props => {
  const {
    auction,
    isClosed,
    isEcommerceSale,
    isRegistrationEnded,
    showContactInfo,
    user,
    userRegistration,
  } = props

  const userLacksIdentityVerification =
    auction.attributes.requireIdentityVerification && !user?.identityVerified

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
          // User is registered
          if (userRegistration.qualified_for_bidding) {
            // User is qualified
            return (
              <div className={b("approved")}>
                <Sans mt="1" size="3" color="green100">
                  <span className="icon-check" />
                  Approved to Bid
                </Sans>
              </div>
            )
          } else {
            // User is registered, not qualified
            if (
              userLacksIdentityVerification &&
              Boolean(user?.pendingIdentityVerification?.flowURL)
            ) {
              // User needs IDV and has one pending
              return (
                <div className={b("wrapper")}>
                  <a
                    className={b("idv-link")}
                    href={user.pendingIdentityVerification.flowURL}
                  >
                    <Button width="100%" size="large">
                      Verify identity
                    </Button>
                  </a>
                  <IDVRequiredMessage />
                </div>
              )
            } else {
              // Any other unqualified case, including a user lacking idv with no pending IDV available
              return (
                <div className={b("wrapper")}>
                  <Button width="100%" size="large" disabled>
                    Registration pending
                  </Button>
                  {userLacksIdentityVerification ? (
                    <IDVRequiredMessage />
                  ) : (
                    <RegistrationMessage color="yellow100">
                      Reviewing submitted information
                    </RegistrationMessage>
                  )}
                </div>
              )
            }
          }
        } else if (isRegistrationEnded) {
          // Registration is closed
          return (
            <div className={b("wrapper")}>
              <Button width="100%" size="large" disabled>
                Registration closed
              </Button>
              <RegistrationMessage>
                Registration required to bid
              </RegistrationMessage>
            </div>
          )
        } else {
          // Registration is open
          return (
            <div className={b("wrapper")}>
              <div className="js-register-button">
                <Button width="100%" size="large" onClick={trackBidClick}>
                  Register to bid
                </Button>
              </div>
              {userLacksIdentityVerification ? (
                <IDVRequiredMessage />
              ) : (
                <RegistrationMessage>
                  Registration required to bid
                </RegistrationMessage>
              )}
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
  const { auction, isEcommerceSale, isMobile, me: user } = state.app

  const userRegistration = user?.bidders?.[0]
  const showContactInfo = !isMobile
  return {
    auction,
    isClosed: auction.isClosed() || auction.get("clockState") === "closed",
    isEcommerceSale,
    isMobile,
    isLiveOpen: auction.get("is_live_open"),
    isRegistrationEnded: auction.isRegistrationEnded(),
    userRegistration,
    showContactInfo,
    user,
  }
}

export default connect(mapStateToProps)(Registration)

// Helpers

export const test = { Registration }
