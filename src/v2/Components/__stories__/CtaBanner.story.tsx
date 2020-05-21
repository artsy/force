import { storiesOf } from "@storybook/react"
import React from "react"

import { MinimalCtaBanner } from "../MinimalCtaBanner"

storiesOf("Components/MinimalCtaBanner", module).add(
  "Minimal CTA Banner",
  () => (
    <MinimalCtaBanner
      href="http://www.google.com"
      copy="Sign up for the best Artsy experience"
      position="bottom"
      textColor="white"
      backgroundColor="black"
    />
  )
)
