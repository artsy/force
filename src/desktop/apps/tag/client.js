import qs from "querystring"
import { data as sd } from "sharify"

import React from "react"
import ReactDOM from "react-dom"
import { Contents } from "v2/Components/Tag"
import { SystemContextProvider } from "v2/Artsy"
import { mediator } from "lib/mediator"

const Tag = require("../../models/tag.coffee")
const CurrentUser = require("../../models/current_user")

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
