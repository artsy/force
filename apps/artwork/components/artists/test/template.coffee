_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'

render = ->
  filename = path.resolve __dirname, "../index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artist Module template', ->
  beforeEach ->
    @artwork = fabricate('artwork', {
      artists: [
        fabricate('artist', {
          name: 'K Dot'
          biography: "He is really an alien and there is no record of his background. All we know is his art is dope."
          bio: "We do not know"
          exhibition_highlights: [
            fabricate('show'),
            fabricate('show'),
            fabricate('show')
          ]
          articles: [
            {
              thumbnail_image: { cropped: { url: 'image.jpg' } }
              title: "Jeff Koons’ Gazing Balls Glimmer at Art Basel"
              author: {
                name: 'Artsy Editorial'
              }
            }
          ]
        })
      ]
    })

    @html = render()(
      artwork: @artwork
      helpers: {
        artists:
          build: sinon.stub().returns ['biography', 'exhibition highlights', 'articles']
          name: sinon.stub()
          groupBy: _.groupBy
      }
      asset: (->)
    )

    @$ = cheerio.load(@html)

  it 'should display biography', ->
    @$('.side-tabs__nav').find('a[data-id=biography]').attr('data-id').should.equal 'biography'
    @$('.artwork-artist__content__biography').html().should.equal "He is really an alien and there is no record of his background. All we know is his art is dope."
    @$('.artwork-artist__content__short-bio').html().should.containEql "We do not know"

  it 'displays exhibition history when clicked', ->
    @$('.side-tabs__nav').find('a[data-id=biography]').click()
    console.log 'body', @$('.artwork-section.artwork-artist').html()

