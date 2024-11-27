import React from "react"

async function loadable(load, { resolveComponent }) {
  let Component = resolveComponent(load.requireSync())

  const Loadable = props => {
    return <Component {...props} />
  }
  return Loadable
}

export default loadable
