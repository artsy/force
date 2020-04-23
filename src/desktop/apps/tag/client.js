import qs from "querystring"
import { data as sd } from "sharify"

import React from "react"
import ReactDOM from "react-dom"
import { Contents } from "reaction/Components/Tag"
import { SystemContextProvider } from "reaction/Artsy"

const Tag = require("../../models/tag.coffee")
const CurrentUser = require("../../models/current_user.coffee")
const mediator = require("desktop/lib/mediator.coffee")

// Update URL with current filters/mode/sort, for ease of sharing.
const onStateChange = ({ filters, sort }) => {
  const params = { ...filters, sort }
  const fragment = "?" + qs.stringify(params)
  window.history.replaceState({}, new Tag(sd.GENE).toPageTitle(), fragment)
}

export const setupTagPage = () => {
  // Pull out sort and filters from URL, if present
  const urlParams = qs.parse(location.search.replace(/^\?/, ""))
  let sort
  if (urlParams.sort) {
    sort = urlParams.sort
    delete urlParams.sort
  }

  const options = Object.assign(
    {},
    { sort },
    { filters: { ...urlParams } },
    { tagID: sd.TAG.id }
  )
  const user = CurrentUser.orNull()
  ReactDOM.render(
    <SystemContextProvider
      user={user ? user.toJSON() : null}
      mediator={mediator}
    >
      <Contents {...options} onStateChange={onStateChange} />
    </SystemContextProvider>,
    document.getElementById("tag-filter")
  )
}
