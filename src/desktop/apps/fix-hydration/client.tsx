import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import { buildClientApp } from "reaction/Artsy/Router/client"
import { routes } from "./routes"

const { pathname } = window.location

if (pathname === "/fix-hydration/router") {
  buildClientApp({ routes })
    .then(({ ClientApp }) => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })
    .catch(error => {
      console.error(error)
    })
} else if (pathname === "/fix-hydration/all") {
  buildClientApp({ routes })
    .then(({ ClientApp }) => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })
    .catch(error => {
      console.error(error)
    })
} else {
  ReactDOM.hydrate(<App />, document.getElementById("react-root"))
}
