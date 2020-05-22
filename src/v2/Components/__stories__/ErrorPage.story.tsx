import { storiesOf } from "@storybook/react"
import { ErrorPage } from "v2/Components/ErrorPage"
import React from "react"

storiesOf("Components/Error Page", module)
  .add("Basic 404", () => <ErrorPage code={404} />)
  .add("503 with custom message", () => (
    <ErrorPage code={503} message="custom error message" />
  ))
  .add("500 with stack trace", () => (
    <ErrorPage code={503} detail="Lots of detail here, maybe a stack trace" />
  ))
