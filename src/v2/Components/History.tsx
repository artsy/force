import createHistory from "history/createBrowserHistory"

let history = {}

// Only load history on client
if (typeof window !== "undefined") {
  history = createHistory()
}

export default history
