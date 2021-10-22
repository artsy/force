import { Box } from "@artsy/palette"
import { Component } from "react";
import { scrollIntoView, ScrollIntoViewProps } from "v2/Utils/scrollHelpers"

/**
 * @deprecated use scrollIntoView
 */
export class ScrollIntoView extends Component<ScrollIntoViewProps> {
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
