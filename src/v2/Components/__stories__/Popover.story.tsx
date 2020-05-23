import { storiesOf } from "@storybook/react"
import React from "react"

import { Popover } from "../Popover"
import {
  DisplayPopoverOnBlurExample,
  DisplayPopoverOnClickExample,
  DisplayPopoverOnHoverExample,
  WithAnimationExample,
} from "./PopoverExamples"

storiesOf("Components/Popover", module)
  .add("CSS", () => (
    <div style={{ padding: "20px" }}>
      <Popover placement="right">Post to Facebook</Popover>
      <Popover placement="top">Post to Facebook</Popover>
      <Popover placement="left">Post to Facebook</Popover>
      <Popover placement="bottom">Post to Facebook</Popover>
    </div>
  ))
  .add("Display on click", () => {
    return <DisplayPopoverOnClickExample />
  })
  .add("Display on hover", () => {
    return <DisplayPopoverOnHoverExample />
  })
  .add("Display on blur", () => {
    return <DisplayPopoverOnBlurExample />
  })
  .add("With animation", () => {
    return <WithAnimationExample />
  })
