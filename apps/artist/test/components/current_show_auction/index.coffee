currentItem = require '../../../components/current_show_auction/index'
{ show, auction } = require '../../fixtures'
_ = require 'underscore'

describe 'current show or auction', ->
  it 'with many shows and many auctions', ->
    artist = { show, auction }
    currentItem(artist).should.containEql
      href: '/auction/an-auction'
      imageUrl: '/baz.jpg',
      name: 'An Auction',
      heading: 'Current Auction'
      start_at: '2016-09-01T12:00:00+00:00',
      end_at: '2016-12-05T12:00:00+00:00',
      type: 'auction'

  it 'with one show and many auctions', ->
    artist = show: show, auction: [auction[0]]
    currentItem(artist).should.containEql
      href: '/auction/an-auction'
      imageUrl: '/baz.jpg',
      name: 'An Auction',
      heading: 'Current Auction'
      start_at: '2016-09-01T12:00:00+00:00',
      end_at: '2016-12-05T12:00:00+00:00',
      type: 'auction'

  it 'with many shows and no auction', ->
    artist = { show }
    currentItem(artist).should.containEql
      href: '/show/a-show'
      imageUrl: '/foo.jpg',
      name: 'A Show',
      heading: 'Featured Show'
      detail: 'Gallery One, New York'
      start_at: '2016-09-01T12:00:00+00:00',
      end_at: '2016-12-05T12:00:00+00:00',
      type: 'show'

  it 'with one show and no auctions', ->
    artist = show: [show[0]]
    currentItem(artist).should.containEql
      href: '/show/a-show'
      imageUrl: '/foo.jpg',
      name: 'A Show',
      heading: 'Current Show'
      detail: 'Gallery One, New York'
      start_at: '2016-09-01T12:00:00+00:00',
      end_at: '2016-12-05T12:00:00+00:00',
      type: 'show'
