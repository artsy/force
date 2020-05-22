import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { PostRegistrationModal } from "../PostRegistrationModal"

storiesOf("Components/Auction", module)
  .add("PostRegistrationModal - Confirmed", () => {
    return (
      <>
        <PostRegistrationModal
          contentKey="registrationConfirmed"
          onClose={() => null}
        />
      </>
    )
  })
  .add("PostRegistrationModal - Registration Pending", () => {
    return (
      <>
        <PostRegistrationModal
          contentKey="registrationPending"
          onClose={() => null}
        />
      </>
    )
  })
  .add("PostRegistrationModal - Bid Pending", () => {
    return (
      <>
        <PostRegistrationModal contentKey="bidPending" onClose={() => null} />
      </>
    )
  })
