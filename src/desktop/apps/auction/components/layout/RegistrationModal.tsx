import React from "react"
import { AuctionRegistrationModal } from "reaction/Components/Auction/AuctionRegistrationModal"

export const RegistrationModal = ({ auction, onClose }) => {
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
      onClose={onClose}
      onSubmit={submitRegistration}
    />
  )
}
