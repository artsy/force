import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { AuctionRegistrationModal } from "../AuctionRegistrationModal"

const submitHandler = submitUtils => {
  setTimeout(() => {
    submitUtils.setSubmitting(false)
    alert("Your Submission Callback Here")
  }, 1000)
}
storiesOf("Components/Auction", module).add("AuctionRegistrationModal", () => {
  return (
    <>
      <AuctionRegistrationModal
        onSubmit={submitHandler}
        onClose={() => null}
        auction={{ name: "Big Time Sale", requireIdentityVerification: false }}
        me={{ identityVerified: false }}
      />
    </>
  )
})
