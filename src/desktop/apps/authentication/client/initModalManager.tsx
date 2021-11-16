import ReactDOM from "react-dom"
import { ModalContainer } from "v2/Apps/Authentication/Components/ModalContainer"

export const initModalManager = () => {
  const el = document.getElementById("react-modal-container")

  if (el) {
    ReactDOM.render(<ModalContainer />, el)
  }
}
