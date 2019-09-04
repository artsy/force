import React, { useEffect } from "react"
import { connect } from "react-redux"

import {
  ContentKey,
  PostRegistrationModal,
} from "reaction/Components/Auction/PostRegistrationModal"

const _ConfirmRegistrationModal = ({ me, modalType, onClose }) => {
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
  } else {
    contentKey =
      modalType === "ConfirmBidAndRegistration"
        ? "bidPending"
        : "registrationPending"
  }

  return <PostRegistrationModal contentKey={contentKey} onClose={onClose} />
}

const mapStateToProps = state => ({
  me: state.app.me,
  modalType: state.app.modalType,
})

export const ConfirmRegistrationModal = connect(mapStateToProps)(
  _ConfirmRegistrationModal
)
