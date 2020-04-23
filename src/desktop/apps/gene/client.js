import $ from "jquery"
import imagesLoaded from "imagesloaded"
import qs from "querystring"
import { data as sd } from "sharify"
import { Theme } from "@artsy/palette"
import React from "react"
import ReactDOM from "react-dom"
import { Contents } from "reaction/Components/Gene"
import { GeneRelatedLinksQueryRenderer as RelatedLinks } from "reaction/Components/Gene/GeneRelatedLinks"
import { SystemContextProvider } from "reaction/Artsy"
import { ContextModule } from "@artsy/cohesion"

const Gene = require("../../models/gene.coffee")
const CurrentUser = require("../../models/current_user.coffee")
const {
  Following,
  FollowButton,
} = require("../../components/follow_button/index.coffee")
const ShareView = require("../../components/share/view.coffee")
const blurb = require("../../components/gradient_blurb/index.coffee")
const mediator = require("desktop/lib/mediator.coffee")

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

export const setupGenePage = () => {
  // Pull out sort and filters from URL, if present
  const urlParams = qs.parse(location.search.replace(/^\?/, ""))
  let sort
  let mode
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
    <SystemContextProvider
      user={user ? user.toJSON() : null}
      mediator={mediator}
    >
      <Contents {...options} onStateChange={onStateChange} />
    </SystemContextProvider>,
    document.getElementById("gene-filter")
  )

  ReactDOM.render(
    <SystemContextProvider
      user={user ? user.toJSON() : null}
      mediator={mediator}
    >
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
    context_module: ContextModule.geneHeader,
  })
  if (following) following.syncFollows([gene.id])

  // Setup share view
  new ShareView({ el: $(".js-gene-share-buttons") })

  // Setup blurb
  blurb($(".js-gene-blurb"), { limit: 250 })
}
