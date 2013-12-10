rewire    = require 'rewire'
benv      = require 'benv'
Backbone  = require 'backbone'
sinon     = require 'sinon'
mediator  = require '../../../lib/mediator.coffee'
{ resolve } = require 'path'
ModalView = benv.requireWithJadeify resolve(__dirname, '../view'), ['modalTemplate']

describe 'ModalView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }

      Backbone.$                  = $
      $.support.transition        = { end: '' }
      $.fn.emulateTransitionEnd   = -> sinon.stub()

      benv.render resolve(__dirname, '../template.jade'), {}, =>
        @closeSpy     = sinon.spy ModalView.prototype, 'close'
        @openSpy      = sinon.spy ModalView.prototype, 'open'
        @mediatorSpy  = sinon.spy mediator, 'trigger'
        @view         = new ModalView $container: $('#modal-container')
        done()

  afterEach ->
    @closeSpy.restore()
    @openSpy.restore()
    @mediatorSpy.restore()
    @view.close()
    benv.teardown()
    mediator.off()

  describe '#initialize', ->
    it 'Sets up some sensible defaults', ->
      @view.width.should.equal '400px'
      @view.width.should.equal '400px'

    it 'Should auto-open', ->
      @openSpy.called.should.be.ok

  describe '#escape', ->
    it 'is triggered by the escape keyup event; publishes \'modal:close\'', (done) ->
      mediator.on 'modal:close', ->
        true.should.be.ok
        done()
      $(window).trigger($.Event 'keyup', { which: 27 })

  describe '#open', ->
    describe '#setup', ->
      it 'renders the inner template function', ->
        @view.$el.html().should.include 'Requires a template'

      it 'set the $dialog width', ->
        @view.$dialog.width().should.equal 400

      it 'disables scrolling on the document body', ->
        $('body').hasClass('is-modal').should.be.ok

    it 'triggers \'modal:opened\' on the mediator', ->
      @mediatorSpy.args[0][0].should.equal 'modal:opened'

  describe '#close', ->
    it 'should set the $el state', ->
      @view.close()
      @view.$el.data('state').should.equal 'closed'

  describe 'interaction', ->
    it 'removes itself when the close button is clicked', ->
      @view.$('.modal-close').click()
      @closeSpy.called.should.be.ok

    it 'removes itself when the backdrop is clicked', ->
      @view.$('.modal-backdrop').click()
      @closeSpy.called.should.be.ok
