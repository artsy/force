import { find } from "lodash"
import React from "react"
import ReactDOM from "react-dom"

interface ReadMoreWrapperProps {
  isTruncated: boolean
  hideButton: () => void
}

interface ReadMoreWrapperState {
  truncationHeight: number | string
}

/**
 * @deprecated in favor of our Design System ReadMore component in @artsy/palette
 * https://palette.artsy.net/elements/layout/readmore
 */
export class ReadMoreWrapper extends React.Component<
  ReadMoreWrapperProps,
  ReadMoreWrapperState
> {
  state = {
    truncationHeight: "100%",
  }

  componentDidMount() {
    setTimeout(this.truncateArticle, 250)
    window.addEventListener("resize", this.truncateArticle)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.truncateArticle)
  }

  truncateArticle = () => {
    if (this.props.isTruncated) {
      this.setState({ truncationHeight: this.calculateTruncationHeight() })
    }
  }

  calculateTruncationHeight = () => {
    const { isTruncated } = this.props

    if (isTruncated) {
      let height = 0
      let charCount = 0
      const thisNode = ReactDOM.findDOMNode(this) as Element

      // Iterate over text sections
      find(
        thisNode.getElementsByClassName("article__text-section"),
        section => {
          let sectionCharCount = 0

          // Iterate over paragraph tags
          const tags = section.getElementsByClassName("paragraph").length
            ? section.getElementsByClassName("paragraph")
            : section.getElementsByTagName("p")

          const foundTag = find(tags, tag => {
            const textContent = tag.textContent
            const textLength = textContent.length

            // Update counts
            sectionCharCount = sectionCharCount + textLength
            charCount = charCount + textLength

            // Check if we've exceeded limits
            if (textContent && sectionCharCount > 150 && charCount > 2000) {
              height =
                tag.getBoundingClientRect().bottom -
                thisNode.getBoundingClientRect().top
              return true
            }
            return false
          })
          return foundTag ? true : false
        }
      )

      // Return found height or remove truncation if article is too short
      if (height) {
        return height
      } else {
        this.props.hideButton()
        return "100%"
      }
    } else {
      return "100%"
    }
  }

  getTruncationHeight = () => {
    return this.props.isTruncated ? this.state.truncationHeight : "100%"
  }

  getOverflow = () => {
    return this.props.isTruncated ? "hidden" : "auto"
  }

  render() {
    return (
      <div
        style={{
          height: this.getTruncationHeight(),
          overflow: this.getOverflow(),
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
