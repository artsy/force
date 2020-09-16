import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ModalDialog } from "../Modal/ModalDialog"

storiesOf("Components/Info Modal", module)
  .add("Minimal", () => (
    <ModalDialog
      show
      heading="Information"
      primaryCta={{
        action: () => ({}),
        text: "Continue",
      }}
      // eslint-disable-next-line no-console
      onClose={() => console.log("You clicked the background")}
    />
  ))
  .add("With detail", () => (
    <ModalDialog
      show
      heading="Information"
      detail="This extra informaton is important."
      primaryCta={{
        action: () => {
          // eslint-disable-next-line no-console
          console.log("you clicked continue")
        },
        text: "Continue",
      }}
    />
  ))
  .add("With secondary Cta", () => (
    <ModalDialog
      show
      heading="Information"
      detail="This extra informaton is important."
      primaryCta={{
        action: () => {
          // eslint-disable-next-line no-console
          console.log("you clicked continue")
        },
        text: "Continue",
      }}
      secondaryCta={{
        action: () => {
          // eslint-disable-next-line no-console
          console.log("you clicked cancel")
        },
        text: "Cancel",
      }}
    />
  ))
