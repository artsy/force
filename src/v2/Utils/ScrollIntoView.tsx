import { Box } from "@artsy/palette"
import React from "react"

interface ScrollIntoViewProps {
  selector: string
  offset?: number
}
export class ScrollIntoView extends React.Component<ScrollIntoViewProps> {
  static defaultProps = {
    offset: 40,
  }

  getElementPosition = $element => {
    const rect = $element.getBoundingClientRect()
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    }
  }

  scrollIntoView = event => {
    const { selector, offset } = this.props
    const $element = document.querySelector(selector)

    if ($element) {
      const { top } = this.getElementPosition($element)
      window.scrollTo({
        top: top - offset,
      })
    }
  }

  render() {
    return (
      <Box display="block" width={["100%"]} onClick={this.scrollIntoView}>
        {this.props.children}
      </Box>
    )
  }
}
