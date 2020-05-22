import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { FlashBanner } from "v2/Components/FlashBanner"

storiesOf("Components/FlashBanner", module).add(
  "Successful Confirmation Message",
  () => {
    return <FlashBanner messageCode="confirmed" />
  }
)
