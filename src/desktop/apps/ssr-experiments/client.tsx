import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import { buildClientApp } from "v2/Artsy/Router/client"
import { routes } from "./routes"

const { pathname } = window.location

if (pathname === "/ssr-experiments/router") {
  buildClientApp({ routes })
    .then(({ ClientApp }) => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })
    .catch(error => {
      console.error(error)
    })
} else if (pathname === "/ssr-experiments/all") {
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
