import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ErrorModal } from "../Modal/ErrorModal"

storiesOf("Components/Error Modal", module)
  .add("Default", () => <ErrorModal show />)
  .add("With custom contactEmail", () => (
    <ErrorModal show contactEmail="ash@artsy.net" />
  ))
  .add("With custom text", () => (
    <ErrorModal
      show
      headerText="Custom header text goes here"
      detailText="This is the customized detail text of the error modal, it has details."
      closeText="Close this error!"
    />
  ))
