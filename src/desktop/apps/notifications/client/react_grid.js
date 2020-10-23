import React from "react"
import ReactDOM from "react-dom"
import { WorksForYou } from "v2/Apps/WorksForYou"

import { SystemContextProvider } from "v2/Artsy"

import CurrentUser from "../../../models/current_user"

function setupReactGrid(options = {}) {
  const user = CurrentUser.orNull()
  const { artistID, forSale } = options

  ReactDOM.render(
    <SystemContextProvider user={user ? user.toJSON() : null}>
      <WorksForYou forSale={forSale} artistID={artistID || ""} />
    </SystemContextProvider>,
    document.getElementById("notifications-react-works")
  )
}

export default { setupReactGrid }
