$ = require 'cheerio'
_ = require 'underscore'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
Profile = require '../../../../models/profile'
Fair = require '../../../../models/fair'
Article = require '../../../../models/article'
InfoMenu = require '../../info_menu.coffee'
template = require('jade').compileFile(require.resolve '../../templates/programming.jade')
testStubs =
  asset: (->)
  resize: sinon.stub()
  moment: require('moment')
  sd: {CURRENT_PATH: '/info2/programming'}
  markdown: (->)
data = _.extend {}, testStubs

render = (moreData) ->
  template _.extend {}, data, moreData

describe 'Programming templates', ->
  before ->
    @profile = new Profile fabricate 'profile'
    @fair = new Fair fabricate 'fair'
    @article = new Article fabricate 'article'
    @infoMenu = new InfoMenu fair: @fair
    @infoMenu.infoMenu = {
      events: true,
      programming: true,
      artsyAtTheFair: false,
      aboutTheFair: false
    }

  describe 'programming article', ->
    beforeEach ->
      @html = render(profile: @profile, fair: @fair, article: @article, infoMenu: @infoMenu.infoMenu)

    it 'renders programming article', ->
      @html.should.containEql 'On The Heels of A Stellar Year'
