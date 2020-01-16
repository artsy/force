$ = require 'cheerio'
_ = require 'underscore'
sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
Profile = require '../../../../models/profile'
Fair = require '../../../../models/fair'
Article = require '../../../../models/article'
InfoMenu = require '../../../../components/info_menu/index.coffee'
template = require('jade').compileFile(require.resolve '../../templates/article.jade')
testStubs =
  asset: (->)
  resize: sinon.stub()
  moment: require('moment')
  sd: {CURRENT_PATH: '/armory-show-2013/info/about-the-fair'}
  markdown: (->)
data = _.extend {}, testStubs

render = (moreData) ->
  template _.extend {}, data, moreData

describe 'Article template', ->
  before ->
    @profile = new Profile fabricate 'profile'
    @fair = new Fair fabricate 'fair'
    @article = new Article fabricate 'article',
      contributing_authors: [],
      sections: []
    @infoMenu = new InfoMenu fair: @fair
    @infoMenu.infoMenu = {
      events: true,
      programming: true,
      artsyAtTheFair: false,
      aboutTheFair: false
    }

  describe 'about the fair with article', ->
    beforeEach ->
      @html = render(profile: @profile, fair: @fair, article: @article, infoMenu: @infoMenu.infoMenu)

    it 'renders about the fair article from writer', ->
      @html.should.containEql 'On The Heels of A Stellar Year'

  describe 'about the fair without article', ->
    beforeEach ->
      @html = render(profile: @profile, fair: @fair, article: undefined, infoMenu: @infoMenu.infoMenu)

    it 'renders about the fair from fair model', ->
      @html.should.containEql 'We Rawk!'
