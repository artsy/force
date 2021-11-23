import ReactDOM from "react-dom"
import { ModalContainer } from "v2/Apps/Authentication/Components/ModalContainer"

/**
 * FIXME: Replace this super legacy code with react portal
 */

export const initAuthModalContainer = () => {
  const el = document.getElementById("react-modal-container")

  if (!el) {
    console.error("Error: Cannot find dom node to mount ModalContainer.")
  }

  ReactDOM.render(<ModalContainer />, el)
}
