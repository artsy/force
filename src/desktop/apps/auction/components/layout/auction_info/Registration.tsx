import PropTypes from "prop-types"
import React from "react"
import block from "bem-cn-lite"
import { get } from "lodash"
import { connect } from "react-redux"
import { Button, Sans } from "@artsy/palette"
import { bidderNeedsIdentityVerification } from "reaction/Utils/identityVerificationRequirements"

function RegistrationText(props) {
  const {
    userNeedsIdentityVerification,
    defaultText = "Registration required to bid",
    defaultColor = "black60",
  } = props
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
      <Sans mt="1" size="3" color={defaultColor} textAlign="center">
        {defaultText}
      </Sans>
    )
  }
}

function Registration(props) {
  const {
    isClosed,
    isEcommerceSale,
    isQualifiedForBidding,
    isRegistrationEnded,
    numBidders,
    showContactInfo,
    userNeedsIdentityVerification,
  } = props

  const b = block("auction-Registration")

  if (isEcommerceSale) {
    return null
  }

  return (
    <div className={b()}>
      {(() => {
        if (isClosed) {
          return null
        } else if (!isQualifiedForBidding) {
          return (
            <div className={b("wrapper")}>
              <Button width="100%" size="large" disabled>
                Registration pending
              </Button>
              <RegistrationText
                userNeedsIdentityVerification={userNeedsIdentityVerification}
                defaultText="Reviewing submitted information"
                defaultColor="yellow100"
              />
            </div>
          )
        } else if (numBidders > 0) {
          return (
            <div className={b("approved")}>
              <Sans mt="1" size="3" color="green100">
                <span className="icon-check" />
                Approved to Bid
              </Sans>
            </div>
          )
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
                <Button width="100%" size="large">
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

Registration.propTypes = {
  isClosed: PropTypes.bool.isRequired,
  isEcommerceSale: PropTypes.bool,
  userNeedsIdentityVerification: PropTypes.bool,
  isQualifiedForBidding: PropTypes.bool.isRequired,
  isRegistrationEnded: PropTypes.bool.isRequired,
  numBidders: PropTypes.number.isRequired,
  showContactInfo: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  const { auction, isEcommerceSale, isMobile, me } = state.app

  const numBidders = me?.bidders?.length || 0
  const isQualifiedForBidding = get(me, "bidders.0.qualified_for_bidding", true) // TODO: the default value is `true`?
  const showContactInfo = !isMobile
  const userNeedsIdentityVerification = bidderNeedsIdentityVerification({
    sale: auction.attributes,
    user: me,
    bidder: me?.bidders?.[0],
  })

  return {
    isClosed: auction.isClosed() || auction.get("clockState") === "closed",
    isEcommerceSale,
    isMobile,
    isLiveOpen: auction.get("is_live_open"),
    isQualifiedForBidding,
    isRegistrationEnded: auction.isRegistrationEnded(),
    numBidders,
    showContactInfo,
    userNeedsIdentityVerification,
  }
}

export default connect(mapStateToProps)(Registration)

// Helpers

export const test = { Registration }
