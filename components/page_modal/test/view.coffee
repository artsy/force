benv = require 'benv'
Backbone = require 'backbone'
{ resolve } = require 'path'
ModalView = benv.requireWithJadeify resolve(__dirname, '../../modal/view'), ['modalTemplate']
PageModalView = require '../view'
PageModalView::modalTemplate = ModalView::modalTemplate

describe 'PageModalView', ->
  before ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $

  after ->
    benv.teardown()

  beforeEach ->
    @view = new PageModalView src: '/foobar'

  it 'renders the iframed src', ->
    @view.$el.html()
      .should.containEql '<iframe id="iframed-page-modal" width="100%" height="100%" src="/foobar"></iframe>'

  describe '#retargetLinks', ->
    it 're-targets any links without existing targets on the iframed page to point out to "_parent"'
