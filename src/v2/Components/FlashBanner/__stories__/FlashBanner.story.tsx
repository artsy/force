import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { FlashBanner } from "v2/Components/FlashBanner"

storiesOf("Components/FlashBanner", module)
  .add("Email confirmed", () => {
    return <FlashBanner contentCode="confirmed" />
  })
  .add("Email already confirmed", () => {
    return <FlashBanner contentCode="already_confirmed" />
  })
  .add("Invalid/blank token", () => {
    return <FlashBanner contentCode="invalid_token" />
  })
  .add("Expired confirmation link", () => {
    return <FlashBanner contentCode="expired_token" />
  })
  .add("Confirm email CTA", () => {
    return <FlashBanner contentCode="email_confirmation_cta" />
  })
