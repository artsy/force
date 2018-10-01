import React from "react"
import ReactDOM from "react-dom"
import { ErrorModal } from "@artsy/reaction/dist/Components/Modal/ErrorModal"

export const render = ({
  headerText = "An error occurred",
  detailText = "Something went wrong. Please try again or contact orders@artsy.net.",
} = {}) => {
  const el = document.getElementById("react-modal-container")
  const onClose = () => {
    ReactDOM.render(<ErrorModal show={false} />, el, () => {
      ReactDOM.unmountComponentAtNode(el)
    })
  }
  ReactDOM.render(
    <ErrorModal
      show={true}
      onClose={onClose}
      headerText={headerText}
      detailText={detailText}
    />,
    el
  )
}

interface ApplicationError {
  code?: string
}
export const renderBuyNowError = (error: ApplicationError) => {
  if (error && error.code) {
    switch (error.code) {
      case "unpublished_artwork":
      case "unknown_artwork":
        render({
          headerText: "Not available",
          detailText: "Sorry, the artwork is no longer available.",
        })
        break
      default:
        render()
    }
  } else {
    render()
  }
}
