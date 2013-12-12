_     = require 'underscore'
jade  = require 'jade'
path  = require 'path'
fs    = require 'fs'
benv  = require 'benv'

render = (templateName) ->
  filename = path.resolve __dirname, "#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Paginator template', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      done()

  describe '10 pages, @ page 5', ->
    beforeEach -> @$template = $(render('test')()).find('#case-1')
    afterEach -> @$template.remove()
    it 'sets the previous button to be page 4', ->
      @$template.find('.paginator-previous').data('value').should.equal 4
    it 'sets the next button to be page 6', ->
      @$template.find('.paginator-next').data('value').should.equal 6
    it 'sets the first button to be page 1', ->
      @$template.find('.paginator-first').data('value').should.equal 1
    it 'sets the last button to be page 10', ->
      @$template.find('.paginator-last').data('value').should.equal 10
    it 'sets the current button to be page 5', ->
      @$template.find('.paginator-current').data('value').should.equal 5
    it 'includes the appropriate amount of surrounding links', ->
      @$template.find('.paginator-current').parent().nextAll('li').length.should.equal 3
      @$template.find('.paginator-current').parent().prevAll('li').length.should.equal 3

  describe '1 page, @ page 1', ->
    beforeEach -> @$template = $(render('test')()).find('#case-2')
    afterEach -> @$template.remove()
    it 'should not render anything', ->
      @$template.html().should.equal ''

  describe '10 pages, @ page 1, has a base path', ->
    beforeEach -> @$template = $(render('test')()).find('#case-3')
    afterEach -> @$template.remove()
    it 'ensures the previous button is not displayed', ->
      @$template.find('.paginator-previous').length.should.not.be.ok
    it 'sets the next button to be page 2', ->
      @$template.find('.paginator-next').data('value').should.equal 2
    it 'ensures the first page button is not displayed', ->
      @$template.find('.paginator-first').length.should.not.be.ok
    it 'sets the last button to be page 10', ->
      @$template.find('.paginator-last').data('value').should.equal 10
    it 'sets the current button to be page 1', ->
      @$template.find('.paginator-current').data('value').should.equal 1
    it 'sets the base path of the page links', ->
      @$template.find('.paginator-next').attr('href').should.equal '?foo=bar&page=2'
    it 'includes the appropriate amount of surrounding links', ->
      @$template.find('.paginator-current').parent().nextAll('li').length.should.equal 3
      @$template.find('.paginator-current').parent().prevAll('li').length.should.equal 0

  describe '10 pages, @ page 10', ->
    beforeEach -> @$template = $(render('test')()).find('#case-4')
    afterEach -> @$template.remove()
    it 'sets the previous button to be page 9', ->
      @$template.find('.paginator-previous').data('value').should.equal 9
    it 'ensures the next button is not displayed', ->
      @$template.find('.paginator-next').length.should.not.be.ok
    it 'sets the first button to be page 1', ->
      @$template.find('.paginator-first').data('value').should.equal 1
    it 'ensures the last button is not displayed', ->
      @$template.find('.paginator-last').length.should.not.be.ok
    it 'sets the current button to be page 10', ->
      @$template.find('.paginator-current').data('value').should.equal 10
    it 'includes the appropriate amount of surrounding links', ->
      @$template.find('.paginator-current').parent().nextAll('li').length.should.equal 0
      @$template.find('.paginator-current').parent().prevAll('li').length.should.equal 3
