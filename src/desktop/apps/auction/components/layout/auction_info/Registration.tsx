import * as React from "react"
import block from "bem-cn-lite"
import { connect } from "react-redux"
import { Button, Sans } from "@artsy/palette"
import { bidderQualifications } from "v2/Utils/identityVerificationRequirements"
import { ZendeskWrapper } from "v2/Components/ZendeskWrapper"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"

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
  auction: {
    id: string
    auctionState: string
    isClosed: boolean
    isLiveOpen?: boolean
    isRegistrationEnded: boolean
    requireIdentityVerification: boolean
  }
  isEcommerceSale?: boolean
  isMobile: boolean
  showContactInfo?: boolean
  user?: {
    id: string
    identityVerified: boolean

    pendingIdentityVerification?: {
      internalID: string
    }
  }
  userRegistration?: { qualifiedForBidding: boolean }
}

const Registration: React.FC<RegistrationProps> = props => {
  const {
    auction,
    isEcommerceSale,
    showContactInfo,
    user,
    userRegistration,
  } = props

  const b = block("auction-Registration")
  const trackClick = desc => e => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.analytics.track(desc, {
      context_type: "auctions landing",
      auction_slug: auction.id,
      auction_state: auction.auctionState,
      user_id: user?.id,
    })
  }

  if (isEcommerceSale) {
    return null
  }

  const {
    registrationAttempted,
    qualifiedForBidding,
    userLacksIdentityVerification,
    pendingIdentityVerification,
    shouldPromptIdVerification,
  } = bidderQualifications(auction, user, userRegistration)

  const renderZendeskScript = () => {
    if (typeof window !== "undefined" && window.zEmbed) return

    return <ZendeskWrapper zdKey={sd.AUCTION_ZENDESK_KEY} />
  }

  return (
    <div className={b()}>
      {(() => {
        if (auction.isClosed) {
          return null
        } else if (registrationAttempted) {
          if (qualifiedForBidding) {
            return (
              <div className={b("approved")}>
                <Sans mt="1" size="3" color="green100">
                  <span className="icon-check" />
                  Approved to Bid
                </Sans>
              </div>
            )
          } else {
            if (shouldPromptIdVerification) {
              return (
                <div className={b("wrapper")}>
                  <a
                    className={b("idv-link")}
                    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                    href={`/identity-verification/${pendingIdentityVerification.internalID}`}
                  >
                    <Button
                      width="100%"
                      size="large"
                      onClick={trackClick('Clicked "Verify identity"')}
                    >
                      Verify identity
                    </Button>
                  </a>
                  <IDVRequiredMessage />
                </div>
              )
            } else {
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
        } else if (auction.isRegistrationEnded) {
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
                <Button
                  width="100%"
                  size="large"
                  onClick={trackClick('Clicked "Register to bid"')}
                >
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
            +1-845-582-3967
          </div>
        </div>
      )}
      {renderZendeskScript()}
    </div>
  )
}

const mapStateToProps = (state): RegistrationProps => {
  const { auction, isEcommerceSale, isMobile, me: user } = state.app

  const userRegistration = user?.bidders?.[0]
  const showContactInfo = !isMobile
  return {
    auction: {
      id: auction.id,
      requireIdentityVerification: auction.get("requireIdentityVerification"),
      auctionState: auction.get("auction_state"),
      isClosed: auction.isClosed() || auction.get("clockState") === "closed",
      isLiveOpen: auction.get("is_live_open"),
      isRegistrationEnded: auction.isRegistrationEnded(),
    },
    isEcommerceSale,
    isMobile,
    userRegistration: userRegistration && {
      qualifiedForBidding: userRegistration.qualified_for_bidding,
    },
    showContactInfo,
    user,
  }
}

export default connect(mapStateToProps)(Registration)

// Helpers

export const test = { Registration }
