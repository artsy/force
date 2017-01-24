import Auction from '../../models/auction.coffee'
import CurrentUser from '../../models/current_user.coffee'
import Artist from '../../models/artist.coffee'
import ClockView from '../../components/clock/view.coffee'
import { data as sd } from 'sharify'
import _ from 'underscore'
import MyActiveBids from '../../components/my_active_bids/view.coffee'
import Backbone from 'backbone'

import Params from '../../components/commercial_filter/models/params.coffee'
import Filter from '../../components/commercial_filter/models/filter.coffee'
import TotalView from '../../components/commercial_filter/views/total/total_view.coffee'
import SortView from '../../components/commercial_filter/views/sort/sort_view.coffee'
import PriceFilterView from '../../components/commercial_filter/filters/price/price_filter_view.coffee'
import MediumFilterView from '../../components/commercial_filter/filters/medium/medium_filter_view.coffee'
// import GeneIdsFilterView from '../../components/commercial_filter/filters/gene_ids/gene_ids_filter_view.coffee'
import FollowedArtistFilterView from '../../components/commercial_filter/filters/followed_artists/followed_artist_filter_view.coffee'
import UrlHandler from '../../components/commercial_filter/url_handler.coffee'
import PaginatorView from '../../components/commercial_filter/filters/paginator/paginator_view.coffee'

import React from 'react';
import { render } from 'react-dom';
import AuctionGrid from './components/auction_grid/index.js'

const { fullyQualifiedLocations } = require('../../components/commercial_filter/filters/location/location_map.coffee')
const myActiveBidsTemplate = require('./templates/my_active_bids.jade')

const auction = new Auction(_.pick(sd.AUCTION, 'start_at', 'live_start_at', 'end_at'))
const user = sd.CURRENT_USER ? new CurrentUser(sd.CURRENT_USER) : null

const clock = new ClockView({modelName: 'Auction', model: auction, el: $('.auction2-clock')})
clock.start()

if (sd.AUCTION && sd.AUCTION.is_live_open == false) {
  const activeBids = new MyActiveBids({
    user: user,
    el: $('.auction2-my-active-bids'),
    template: myActiveBidsTemplate,
    saleId: auction.get('_id')
  })
  activeBids.start()
}

// Commercial filtering
const params = new Params({sale_id: sd.AUCTION.id, size: 20}, {
  fullyQualifiedLocations: fullyQualifiedLocations
})
const filter = new Filter({params: params})

// Main Artworks view
filter.artworks.on('reset', () => {
  render(
    <AuctionGrid artworks={filter.artworks.models} />,
    document.getElementById('cf-artworks')
  );
})

// Header
const totalView = new TotalView({
  el: $('.cf-total-sort__total'),
  filter: filter,
  artworks: filter.artworks
})

const sortView = new SortView({
  el: $('.cf-total-sort__sort'),
  params: params
})

// Sidebar
const mediumFilterView = new MediumFilterView({
  el: $('.cf-sidebar__mediums'),
  params: params,
  aggregations: filter.aggregations
})

// TODO: replace when backend supports this kind of query
// const genesView = new GeneIdsFilterView({
//   el: $('.cf-sidebar__genes'),
//   params: params,
//   aggregations: filter.aggregations
// })

const followedArtistsView = new FollowedArtistFilterView({
  el: $('.cf-sidebar__followed_artists'),
  params: params,
  filter: filter
})

// bottom
const paginatorView = new PaginatorView({
  el: $('.cf-pagination'),
  params: params,
  filter: filter
})

// Update url when routes change
const urlHandler = new UrlHandler({
  params: params
})

Backbone.history.start({pushState: true})

params.trigger('change')
