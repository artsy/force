import { storiesOf } from "@storybook/react"
import React from "react"

import Spinner from "../Spinner"

storiesOf("Components/Spinner", module)
  .add("Default Spinner", () => {
    return (
      <div>
        <Spinner />
      </div>
    )
  })
  .add("Big spinner", () => {
    return (
      <div>
        <Spinner height={30} width={100} />
      </div>
    )
  })
