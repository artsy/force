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
      benv.expose { $: benv.require 'components-jquery' }
      @$cases = $(render('test')())
      done()

  after ->
    @$cases.remove()

  describe '#paginate', ->
    describe '10 pages, @ page 5', ->
      beforeEach -> @$template = @$cases.find('#case-1')
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
      beforeEach -> @$template = @$cases.find('#case-2')
      it 'should not render anything', ->
        @$template.html().should.equal ''

    describe '10 pages, @ page 1, has a base path', ->
      beforeEach -> @$template = @$cases.find('#case-3')
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


  describe '#paginateHead', ->
    describe '2 pages, @ page 1', ->
      beforeEach -> @$template = @$cases.find('#case-5')
      it 'should not have a prev link', ->
        @$template.find('link[rel="prev"]').length.should.not.be.ok
      it 'should have a next link', ->
        next = @$template.find('link[rel="next"]')
        next.length.should.equal 1
        next.attr('href').should.equal '?page=2'

    describe '2 pages, @ page 2', ->
      beforeEach -> @$template = @$cases.find('#case-6')
      it 'should not have a next link', ->
        @$template.find('link[rel="next"]').length.should.not.be.ok
      it 'should have a prev link', ->
        prev = @$template.find('link[rel="prev"]')
        prev.length.should.equal 1
        prev.attr('href').should.equal '?page=1'

    describe '3 pages, @ page 2', ->
      beforeEach -> @$template = @$cases.find('#case-7')
      it 'should have a prev link', ->
        prev = @$template.find('link[rel="prev"]')
        prev.length.should.equal 1
        prev.attr('href').should.equal '?page=1'
      it 'should have have a next link', ->
        next = @$template.find('link[rel="next"]')
        next.length.should.equal 1
        next.attr('href').should.equal '?page=3'
