import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { FlashBanner } from "Components/FlashBanner"

storiesOf("Components/FlashBanner", module).add(
  "Successful Confirmation Message",
  () => {
    return <FlashBanner messageCode="confirmed" />
  }
)
