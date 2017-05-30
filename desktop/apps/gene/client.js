import $ from 'jquery'

import imagesLoaded from 'imagesloaded'
imagesLoaded.makeJQueryPlugin($)

import React from 'react'
import ReactDOM from 'react-dom'
import * as Relay from 'react-relay'
import { data as sd } from 'sharify'

import { artsyNetworkLayer } from '@artsy/reaction-force/dist/relay/config'
import components from '@artsy/reaction-force/dist/components/index'
import * as Artsy from '@artsy/reaction-force/dist/components/artsy'
import GeneQueryConfig from '@artsy/reaction-force/dist/relay/queries/gene'

import Gene from '../../models/gene.coffee'
import CurrentUser from '../../models/current_user.coffee'
import { Following, FollowButton } from '../../components/follow_button/index.coffee'
import ShareView from '../../components/share/view.coffee'
import RelatedGenesView from '../../components/related_links/types/gene_genes.coffee'
import blurb from '../../components/gradient_blurb/index.coffee'

const relatedArtistsTemplate = (args) => { return require('./templates/related_artists.jade')(args) }

function init () {
  Relay.injectNetworkLayer(artsyNetworkLayer(sd.CURRENT_USER))
  ReactDOM.render(
    <Artsy.ContextProvider currentUser={sd.CURRENT_USER}>
      <Relay.RootContainer
        Component={components.Gene}
        route={new GeneQueryConfig({ geneID: sd.GENE.id })}
      />
    </Artsy.ContextProvider>, document.getElementById('gene-filter')
  )

  // Load related artists
  let gene = new Gene(sd.GENE)
  gene.relatedArtists.on('sync', (artists) => {
    const html = relatedArtistsTemplate({
      artists: artists.models
    })

    $('.related-artists')
      .html(html)
      .addClass('is-fade-in')
  })
  gene.fetchArtists('related')

  // Setup user
  const user = CurrentUser.orNull()
  const following = user ? new Following(null, {kind: 'gene'}) : null
  new FollowButton({
    el: $('.follow-button'),
    following: following,
    modelName: 'gene',
    model: gene,
    context_page: 'Gene page'
  })
  if (following) following.syncFollows([ gene.id ])

  // Setup share view
  new ShareView({ el: $('.js-gene-share-buttons') })

  // Setup blurb
  blurb($('.js-gene-blurb'), { limit: 250 })

  // Setup related gene view
  new RelatedGenesView({
    el: $('.main-layout-container .related-genes'),
    id: gene.id
  })
}

export default { init }
