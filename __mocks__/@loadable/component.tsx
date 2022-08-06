import React from "react"

async function loadable(load, { resolveComponent }) {
  let Component

  // If running jest using babel, lean on babel-plugin-loadable
  // TODO: Remove this when we fully switch to SWC
  if (load.requireSync) {
    Component = resolveComponent(load.requireSync())
    // Using SWC compiler, no transform; load like normal
  } else {
    Component = resolveComponent(await load())
  }

  const Loadable = props => {
    return <Component {...props} />
  }
  return Loadable
}

export default loadable
