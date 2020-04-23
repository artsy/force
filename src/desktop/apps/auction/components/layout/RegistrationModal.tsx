import React from "react"
import { AuctionRegistrationModal } from "reaction/Components/Auction/AuctionRegistrationModal"

export const RegistrationModal = ({ auction, me, onClose }) => {
  const submitRegistration = ({ acceptedTerms }) => {
    if (acceptedTerms) {
      window.location.assign(
        auction.registerUrl() + "?accepted-conditions=true"
      )
    }
  }
  return (
    <AuctionRegistrationModal
      auction={auction.attributes}
      me={me}
      onClose={onClose}
      onSubmit={submitRegistration}
    />
  )
}
