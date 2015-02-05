benv = require 'benv'
sinon = require 'sinon'
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
    beforeEach ->
      links = [
        "<a href='#' id='a'>a</a>"
        "<a href='/foo' id='b' target='_blank'>b</a>"
        "<a href='/bar' id='c'>c</a>"
      ]
      @$contents = $('<div/>').html(links)
      sinon.stub(@view, 'contents').returns @$contents
      @view.retargetLinks()

    afterEach ->
      @view.contents.restore()

    it 'intercepts links without targets and sets the target to "_parent"', ->
      @$contents.find('a').should.have.lengthOf 3

      ($target = $(@$contents.find('a').get 0)).click()
      $target.attr('target').should.equal '_parent'

      ($target = $(@$contents.find('a').get 1)).click()
      $target.attr('target').should.equal '_blank'

      ($target = $(@$contents.find('a').get 2)).click()
      $target.attr('target').should.equal '_parent'
