_ = require 'underscore'
template = require('jade').compileFile(require.resolve '../templates/index.jade')
fixture = require './fixture'
bidIncrements = require '../bid_increments'
data = _.extend {}, asset: (->), sd: {}, fixture, markdown: (->), bidIncrements: bidIncrements

describe '/how-auctions-work', ->
  describe 'index', ->
    it 'renders correctly', ->
      template(data)
        .should.containEql '<h1 class="haw-page-title">How Artsy Auctions Work</h1>'
