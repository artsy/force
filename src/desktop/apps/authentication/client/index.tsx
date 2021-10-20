import ReactDOM from "react-dom"
import { FullPageAuthStatic } from "../components/FullPageAuthStatic"
import { setCookies } from "../helpers"

export const init = () => {
  // Rehydrate data from Server
  const bootstrapData = window.__BOOTSTRAP__
  const el = document.getElementById("react-root")

  if (el) {
    setCookies(bootstrapData.options)

    // Start app
    ReactDOM.hydrate(<FullPageAuthStatic {...bootstrapData} />, el)
  }
}
