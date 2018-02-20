benv = require 'benv'
Backbone = require 'backbone'
ShareView = benv.requireWithJadeify require.resolve('../view.coffee'), ['template']

describe 'ShareView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new ShareView
      url: 'foobar.html'
      media: 'foobar.jpg'
      description: 'Foo Bar'

    @view.render()

  describe '#render', ->
    it 'renders the template', ->
      @view.render().$el.html()
        .should.containEql 'https://www.facebook.com/sharer/sharer.php?u=foobar.html'

  xdescribe '#popUp', ->
    it 'opens a share popup', ->
      options = @view.popUp $.Event 'click'
      options.should.equal 'status=1,width=750,height=400,top=0,left=0'
