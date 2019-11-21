import $ from "jquery"

import imagesLoaded from "imagesloaded"

import qs from "querystring"
import { data as sd } from "sharify"

import React from "react"
import ReactDOM from "react-dom"
import { Contents } from "reaction/Components/Gene"
import { GeneRelatedLinksQueryRenderer as RelatedLinks } from "reaction/Components/Gene/GeneRelatedLinks"
import { SystemContextProvider } from "reaction/Artsy"

import Gene from "../../models/gene.coffee"
import CurrentUser from "../../models/current_user.coffee"
import {
  Following,
  FollowButton,
} from "../../components/follow_button/index.coffee"
import ShareView from "../../components/share/view.coffee"
import blurb from "../../components/gradient_blurb/index.coffee"
import { Theme } from "@artsy/palette"

imagesLoaded.makeJQueryPlugin($)

// Update URL with current filters/mode/sort, for ease of sharing.
const onStateChange = ({ filters, sort, mode }) => {
  let params
  if (mode === "artists") {
    params = { mode }
  } else {
    params = { ...filters, sort, mode }
  }
  const fragment = "?" + qs.stringify(params)
  window.history.replaceState({}, new Gene(sd.GENE).toPageTitle(), fragment)
}

function setupGenePage() {
  // Pull out sort and filters from URL, if present
  const urlParams = qs.parse(location.search.replace(/^\?/, ""))
  let sort, mode
  if (urlParams.sort) {
    sort = urlParams.sort
    delete urlParams.sort
  }
  if (urlParams.mode) {
    mode = urlParams.mode
    delete urlParams.mode
  } else {
    mode = sd.MODE === "artist" ? "artists" : sd.MODE
  }

  const options = Object.assign(
    {},
    { sort },
    { filters: { ...urlParams } },
    { geneID: sd.GENE.id, mode }
  )
  const user = CurrentUser.orNull()
  ReactDOM.render(
    <SystemContextProvider user={user ? user.toJSON() : null}>
      <Contents {...options} onStateChange={onStateChange} />
    </SystemContextProvider>,
    document.getElementById("gene-filter")
  )

  ReactDOM.render(
    <SystemContextProvider user={user ? user.toJSON() : null}>
      <Theme>
        <RelatedLinks geneID={sd.GENE.id} />
      </Theme>
    </SystemContextProvider>,
    document.getElementById("gene-related-links")
  )

  // Load related artists
  const gene = new Gene(sd.GENE)

  // Setup user
  const following = user ? new Following(null, { kind: "gene" }) : null
  new FollowButton({
    el: $(".follow-button"),
    following: following,
    modelName: "gene",
    model: gene,
    context_page: "Gene page",
  })
  if (following) following.syncFollows([gene.id])

  // Setup share view
  new ShareView({ el: $(".js-gene-share-buttons") })

  // Setup blurb
  blurb($(".js-gene-blurb"), { limit: 250 })
}

export default { setupGenePage }
