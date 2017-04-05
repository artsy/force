_ = require 'underscore'
learnMoreTemplate = require('jade').compileFile(require.resolve '../templates/learn_more.jade')
fixture = require '../fixtures/data.json'
markdown = require '../../../components/util/markdown'
bidIncrements = require '../bid_increments'
benv = require 'benv'
{ resolve } = require 'path'

describe '/how-auctions-work', ->
  describe 'learn_more', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'
        benv.render resolve(__dirname, '../templates/learn_more.jade'),
          sd: {}
          _: require 'underscore'
          asset: (->)
          page: fixture
          markdown: markdown
          bidIncrements: bidIncrements
          user: null
        done()

    after ->
      benv.teardown()

    it 'renders correctly', ->
      $('h1').length.should.eql 5
      $('.leader-dots-list-item').length.should.eql 8


