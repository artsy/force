import { Box } from "@artsy/palette"
import React from "react"
import { scrollIntoView, ScrollIntoViewProps } from "v2/Utils/scrollHelpers"

export class ScrollIntoView extends React.Component<ScrollIntoViewProps> {
  static defaultProps = {
    offset: 40,
  }

  render() {
    return (
      <Box
        display="block"
        width={["100%"]}
        onClick={() => {
          scrollIntoView(this.props)
        }}
      >
        {this.props.children}
      </Box>
    )
  }
}
