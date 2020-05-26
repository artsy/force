import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { FlashMessage } from "v2/Components/FlashBanner"

storiesOf("Components/FlashBanner", module).add(
  "Successful Confirmation Message",
  () => {
    return <FlashMessage messageCode="confirmed" />
  }
)
