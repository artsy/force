import ReactDOM from "react-dom"
import { ModalContainer } from "../components/ModalContainer"

export const initModalManager = () => {
  const el = document.getElementById("react-modal-container")

  if (el) {
    ReactDOM.render(<ModalContainer />, el)
  }
}
