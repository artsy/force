currentItem = require '../../../components/current_show_auction/index'
{ show, auction } = require '../../fixtures'
_ = require 'underscore'

describe 'current show or auction', ->
  it 'prioritizes an auction', ->
    artist = { show, auction }
    currentItem(artist).should.eql
      hasMany: true,
      href: '/auction/an-auction'
      imageUrl: '/baz.jpg',
      name: 'An Auction',
      start_at: '2016-09-01T12:00:00+00:00',
      end_at: '2016-12-05T12:00:00+00:00',
      type: 'auction'

  it 'falls back to a show', ->
    artist = { show }
    currentItem(artist).should.eql
      hasMany: true,
      href: '/show/a-show'
      imageUrl: '/foo.jpg',
      name: 'A Show',
      start_at: '2016-09-01T12:00:00+00:00',
      end_at: '2016-12-05T12:00:00+00:00',
      type: 'show'

  it 'ignores fair shows', ->
    fairBooth = {
      "fair": { "id": "fair_id" }
      "name": "A Fair Booth"
      "href": "/show/a-fair-booth"
      "start_at": "2016-09-01T12:00:00+00:00",
      "end_at": "2016-12-05T12:00:00+00:00",
      "cover_image": "cropped": "url": "/fair-booth.jpg"
    }
    # artist = show: [fairBooth]
    # (currentItem(artist) == undefined).should.be.true()

    artist = show: [fairBooth].concat show
    currentItem(artist).should.eql
      hasMany: true,
      href: '/show/a-show'
      imageUrl: '/foo.jpg',
      name: 'A Show',
      start_at: '2016-09-01T12:00:00+00:00',
      end_at: '2016-12-05T12:00:00+00:00',
      type: 'show'

  it 'indicates if one or many', ->
    artist = { show }
    currentItem(artist).hasMany.should.be.true()
    artist = show: [show[0]]
    currentItem(artist).hasMany.should.be.false()