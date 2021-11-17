import React from "react"

function loadable(load, { resolveComponent }) {
  const Component = resolveComponent(load.requireSync())

  const Loadable = props => {
    return <Component {...props} />
  }
  return Loadable
}

export default loadable
