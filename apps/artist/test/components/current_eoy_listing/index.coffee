_ = require 'underscore'
Q = require 'bluebird-q'
data = require '../../../../eoy_2016/fixtures/data.json'
rewire = require 'rewire'
currentItem = rewire '../../../components/current_eoy_listing/index'
currentItem.__set__ 'fetchEOY2016Lists', () -> Q(data)

describe 'current EOY listing', ->
  it 'returs null if the artist is not included in EOY', ->
    return currentItem({ id: 'o-mitted' })
      .then (item) -> _.isNull(item).should.be.true()

  it 'returns an object describing the banner contents', ->
    return currentItem({ id: 'damon-zucconi' })
      .then (item) -> item.should.containEql
        type: 'eoy',
        href: 'https://www.artsy.net/2016-year-in-art',
        imageUrl: 'http://files.artsy.net/images/eoy-2016.png',
        heading: 'FEATURED IN'
        name: 'The Most Influential Artists of 2016',
        detail: 'Artsy\'s Year in Art 2016',
