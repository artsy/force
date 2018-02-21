_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'

render = ->
  filename = path.resolve __dirname, "../../templates/articles.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artist articles template', ->
  beforeEach ->
    @artist = fabricate('artist', {
      name: 'K Dot'
      biography: "He is from Compton"
      exhibition_highlights: [
        {
          kind: "solo",
          href: "/show/belvedere-museum-jeff-koons-hulk",
          name: "Jeff Koons: Hulk",
          start_at: "2014-11-04T12:00:00+00:00",
          partner: {
            name: "Belvedere Museum"
          },
          location: {
            city: "Vienna",
            country: "AT"
          }
        },
        {
          kind: "group",
          href: "/show/btw",
          name: "Pop",
          start_at: "2015-11-04T12:00:00+00:00",
          partner: {
            name: "Pace Gallery"
          },
          location: {
            city: "New York",
            country: "US"
          }
        },
        {
          kind: "group",
          href: "/show/on-the-wall",
          name: "On the wall",
          start_at: "2016-11-04T12:00:00+00:00",
          partner: {
            name: "Pace Gallery"
          },
          location: {
            city: "New York",
            country: "US"
          }
        }
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

    @html = render()(
      artist: @artist
      helpers: {
        artists:
          build: sinon.stub().returns ['biography', 'exhibition highlights', 'articles']
          name: sinon.stub()
          groupBy: _.groupBy
      }
      asset: (->)
    )

    @$ = cheerio.load(@html)

  it 'should display articles', ->
    @$('.artwork-artist__content__article-thumbnail img').attr('src').should.equal 'image.jpg'
    @$('.artwork-artist__content__article-text').html().should.containEql "Jeff Koons"
    @$('.artwork-artist__content__article-text').html().should.containEql "Gazing Balls Glimmer at Art Basel"
    @$('.artwork-artist__content__article-text').html().should.containEql "Artsy Editorial"
