import ReactDOM from "react-dom"
import App from "desktop/apps/articles/components/App"

// Rehydrate data from Server
const bootstrapData = window.__BOOTSTRAP__

// Start app
ReactDOM.hydrate(
  <App {...bootstrapData} />,
  document.getElementById("react-root")
)
