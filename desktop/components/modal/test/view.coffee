rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
mediator = require '../../../lib/mediator'
{ resolve } = require 'path'
ModalView = benv.requireWithJadeify resolve(__dirname, '../view'), ['modalTemplate']

xdescribe 'ModalView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }

      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end

      benv.render resolve(__dirname, '../template.jade'), {}, =>
        @closeSpy = sinon.spy ModalView.prototype, 'close'
        @openSpy = sinon.spy ModalView.prototype, 'open'
        @mediatorSpy = sinon.spy mediator, 'trigger'
        @view = new ModalView $container: $('#modal-container')
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
      @view.dimensions.should.eql width: '400px'

    it 'Should auto-open', ->
      @openSpy.called.should.be.ok()

  describe '#escape', ->
    it 'is triggered by the escape keyup event; publishes \'modal:close\'', (done) ->
      mediator.on 'modal:close', ->
        true.should.be.ok()
        done()
      $(window).trigger($.Event 'keyup', { which: 27 })

  describe '#open', ->
    describe '#setup', ->
      it 'renders the inner template function', ->
        @view.$el.html().should.containEql 'Requires a template'

      it 'set the $dialog width', ->
        @view.$dialog.width().should.equal 400

      it 'disables scrolling on the document body', ->
        $('body').hasClass('is-scrolling-disabled').should.be.ok()

      it 'sets the default classes', ->
        classes = @view.$el.attr('class')
        classes.should.containEql 'is-fade-in'
        classes.should.containEql 'has-backdrop'

      it 'should be able to accept backdrop and transition options', ->
        modal = new ModalView($container: $('#modal-container'), backdrop: false)
        classes = modal.$el.attr('class')
        classes.should.containEql 'is-fade-in'
        classes.should.containEql 'has-nobackdrop'

        modal = new ModalView($container: $('#modal-container'), backdrop: false, transition: 'slide')
        classes = modal.$el.attr('class')
        classes.should.containEql 'is-slide-in'
        classes.should.containEql 'has-nobackdrop'

    it 'triggers \'modal:opened\' on the mediator', ->
      @mediatorSpy.args[0][0].should.equal 'modal:opened'

  describe '#close', ->
    it 'should set the $el state', ->
      @view.close()
      @view.$el.data('state').should.equal 'closed'

    it 'should accept a callback', (done) ->
      @view.close done

    it 'should ignore arguments that arent functions', (done) ->
      @view.close 'ignoreme'
      done()

  describe 'interaction', ->
    it 'removes itself when the close button is clicked', ->
      @view.$('.modal-close').click()
      @closeSpy.called.should.be.ok()

    it 'removes itself when the backdrop is clicked', ->
      @view.$('.modal-backdrop').click()
      @closeSpy.called.should.be.ok()
