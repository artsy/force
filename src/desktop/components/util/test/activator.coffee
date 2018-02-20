_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
benv = require 'benv'

render = (templateName) ->
  filename = path.resolve __dirname, "#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Activator', ->

  after -> benv.teardown()

  describe '/foo/bar', ->
    before (done) ->
      benv.setup =>
        benv.expose {
          $: benv.require 'jquery'
          sd: { CURRENT_PATH: '/foo/bar' }
        }
        @$cases = $(render('activator')())
        done()

    after -> @$cases.remove()

    it 'activates properly', ->
      @$cases.find('#case-1').text().should.equal 'is-active'
      @$cases.find('#case-2').text().should.equal 'is-active'
      @$cases.find('#case-3').text().should.equal 'is-inactive'
      @$cases.find('#case-4').text().should.equal 'is-inactive'
      @$cases.find('#case-5').text().should.equal 'is-inactive'
      @$cases.find('#case-6').text().should.equal 'is-inactive'

  describe '/foo/bar', ->
    before (done) ->
      benv.setup =>
        benv.expose {
          $: benv.require 'jquery'
          sd: { CURRENT_PATH: '/foo/bar/' }
        }
        @$cases = $(render('activator')())
        done()

    after -> @$cases.remove()

    it 'activates properly', ->
      @$cases.find('#case-1').text().should.equal 'is-active'
      @$cases.find('#case-2').text().should.equal 'is-active'
      @$cases.find('#case-3').text().should.equal 'is-inactive'
      @$cases.find('#case-4').text().should.equal 'is-inactive'
      @$cases.find('#case-5').text().should.equal 'is-inactive'
      @$cases.find('#case-6').text().should.equal 'is-inactive'

  describe '/foo/baz', ->
    before (done) ->
      benv.setup =>
        benv.expose {
          $: benv.require 'jquery'
          sd: { CURRENT_PATH: '/foo/baz' }
        }
        @$cases = $(render('activator')())
        done()

    after -> @$cases.remove()

    it 'activates properly', ->
      @$cases.find('#case-1').text().should.equal 'is-inactive'
      @$cases.find('#case-2').text().should.equal 'is-inactive'
      @$cases.find('#case-3').text().should.equal 'is-active'
      @$cases.find('#case-4').text().should.equal 'is-inactive'
      @$cases.find('#case-5').text().should.equal 'is-inactive'
      @$cases.find('#case-6').text().should.equal 'is-inactive'

  describe '/about', ->
    before (done) ->
      benv.setup =>
        benv.expose {
          $: benv.require 'jquery'
          sd: { CURRENT_PATH: '/about' }
        }
        @$cases = $(render('activator')())
        done()

    after -> @$cases.remove()

    it 'activates properly', ->
      @$cases.find('#case-1').text().should.equal 'is-inactive'
      @$cases.find('#case-2').text().should.equal 'is-inactive'
      @$cases.find('#case-3').text().should.equal 'is-inactive'
      @$cases.find('#case-4').text().should.equal 'is-inactive'
      @$cases.find('#case-5').text().should.equal 'is-active'
      @$cases.find('#case-6').text().should.equal 'is-inactive'

  describe '/about/foobar', ->
    before (done) ->
      benv.setup =>
        benv.expose {
          $: benv.require 'jquery'
          sd: { CURRENT_PATH: '/about/foobar' }
        }
        @$cases = $(render('activator')())
        done()

    after -> @$cases.remove()

    it 'activates properly', ->
      @$cases.find('#case-1').text().should.equal 'is-inactive'
      @$cases.find('#case-2').text().should.equal 'is-inactive'
      @$cases.find('#case-3').text().should.equal 'is-inactive'
      @$cases.find('#case-4').text().should.equal 'is-inactive'
      @$cases.find('#case-5').text().should.equal 'is-active'
      @$cases.find('#case-6').text().should.equal 'is-active'
