import { storiesOf } from "@storybook/react"
import React from "react"

import { HelpIcon } from "@artsy/palette"
import { Tooltip } from "../Tooltip"

function RenderTooltip(
  message: string,
  horizontalAlign?: string,
  verticalAlign?: string,
  hoverWidth?: number
) {
  return (
    <div style={{ padding: "100px 0px 0px 300px" }}>
      <Tooltip
        message={message}
        horizontalAlign={horizontalAlign}
        verticalAlign={verticalAlign}
        hoverWidth={hoverWidth}
      >
        <HelpIcon />
      </Tooltip>
    </div>
  )
}

storiesOf("Components/Tooltips", module)
  .add("Right top aligned", () =>
    RenderTooltip("this is a right top aligned tooltip", "right", "top")
  )
  .add("Right bottom aligned", () =>
    RenderTooltip("this is a right bottom aligned tooltip", "right", "bottom")
  )
  .add("Left top aligned", () =>
    RenderTooltip("this is a left top aligned tooltip", "left", "top", 200)
  )
  .add("Left bottom aligned", () =>
    RenderTooltip("this is a left bottom aligned tooltip", "left", "bottom")
  )
