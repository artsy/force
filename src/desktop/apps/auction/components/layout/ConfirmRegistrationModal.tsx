import React, { useEffect } from "react"
import { connect } from "react-redux"

import {
  ContentKey,
  PostRegistrationModal,
} from "reaction/Components/Auction/PostRegistrationModal"
import { bidderNeedsIdentityVerification } from "reaction/Utils/identityVerificationRequirements"

const _ConfirmRegistrationModal = ({ me, modalType, onClose, sale }) => {
  useEffect(() => {
    const replaceModalTriggerPath = location.pathname.replace(
      "/confirm-registration",
      ""
    )

    history.replaceState({}, document.title, replaceModalTriggerPath)
  }, [])

  if (!(me && me.bidders && me.bidders.length)) {
    return null
  }

  const bidder = me.bidders[0]

  let contentKey: ContentKey
  if (bidder.qualified_for_bidding) {
    contentKey = "registrationConfirmed"
  } else if (modalType === "ConfirmBidAndRegistration") {
    contentKey = "bidPending"
  } else if (bidderNeedsIdentityVerification({ sale, user: me })) {
    contentKey = "registrationPendingUnverified"
  } else {
    contentKey = "registrationPending"
  }

  return <PostRegistrationModal contentKey={contentKey} onClose={onClose} />
}

const mapStateToProps = state => ({
  me: state.app.me,
  modalType: state.app.modalType,
  sale: state.app.auction.attributes,
})

export const ConfirmRegistrationModal = connect(mapStateToProps)(
  _ConfirmRegistrationModal
)
