import $ from "jquery"

import imagesLoaded from "imagesloaded"

import qs from "querystring"
import { data as sd } from "sharify"

import React from "react"
import ReactDOM from "react-dom"
import { Contents } from "reaction/Components/Gene"
import { SystemContextProvider } from "reaction/Artsy"

import Gene from "../../models/gene.coffee"
import CurrentUser from "../../models/current_user.coffee"
import {
  Following,
  FollowButton,
} from "../../components/follow_button/index.coffee"
import ShareView from "../../components/share/view.coffee"
import RelatedGenesView from "../../components/related_links/types/gene_genes.coffee"
import blurb from "../../components/gradient_blurb/index.coffee"
imagesLoaded.makeJQueryPlugin($)

const relatedArtistsTemplate = args => {
  return require("./templates/related_artists.jade")(args)
}

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

  // Load related artists
  const gene = new Gene(sd.GENE)
  gene.relatedArtists.on("sync", artists => {
    const html = relatedArtistsTemplate({
      artists: artists.models,
    })

    $(".related-artists")
      .html(html)
      .addClass("is-fade-in")
  })
  gene.fetchArtists("related")

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

  // Setup related gene view
  new RelatedGenesView({
    el: $(".main-layout-container .related-genes"),
    id: gene.id,
  })
}

export default { setupGenePage }
