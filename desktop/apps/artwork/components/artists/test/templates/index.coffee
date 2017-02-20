_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'

render = ->
  filename = path.resolve __dirname, "../../index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artist Module template', ->
  describe 'when the artworks partner matches the featured partner', ->
    beforeEach ->
      @artwork = fabricate('artwork', {
        partner: {
          id: 'catty-partner'
        }
        artists: [
          fabricate('artist', {
            name: 'K Dot'
            blurb: 'This is the Artsy blurb'
            biography_blurb: {
              text: "He is from Compton",
              credit: 'Submitted by Catty Gallery'
              partner_id: 'catty-partner'
            }
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

    it 'should display the featured biography and credit', ->
      @$('.side-tabs__nav').find('a[data-id=biography]').attr('data-id').should.equal 'biography'
      @$('.artwork-artist__content__biography__text').html().should.containEql "He is from Compton"
      @$('.artwork-artist__content__biography__credit').html().should.containEql "Submitted by Catty Gallery"
      @$('.artwork-artist__content__short-bio').html().should.containEql "We do not know"

  describe 'when the artworks partner does not match the featured partner', ->
    beforeEach ->
      @artwork = fabricate('artwork', {
        partner: {
          id: 'catty-partner'
        }
        artists: [
          fabricate('artist', {
            name: 'K Dot'
            blurb: 'This is the Artsy blurb'
            biography_blurb: {
              text: "He is from Compton",
              credit: 'Submitted by Catty Gallery'
              partner_id: 'some-other-partner'
            }
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

    it 'should display the featured biography and credit', ->
      @$('.side-tabs__nav').find('a[data-id=biography]').attr('data-id').should.equal 'biography'
      @$('.artwork-artist__content__biography__text').html().should.containEql "This is the Artsy blurb"
      @$('.artwork-artist__content__biography__credit').length.should.equal 0
      @$('.artwork-artist__content__short-bio').html().should.containEql "We do not know"


  describe 'when the biography_blurb is blank and no tabs are present', ->
    beforeEach ->
      @artwork = fabricate('artwork', {
        partner: {
          id: 'catty-partner'
        }
        artists: [
          fabricate('artist', {
            name: 'K Dot'
            blurb: null
            biography_blurb: {
              text: "",
              credit: null
              partner_id: null
            }
            bio: null
            exhibition_highlights: []
            articles: []
          })
        ]
      })

      @html = render()(
        artwork: @artwork
        helpers: {
          artists:
            build: sinon.stub().returns []
            name: sinon.stub()
            groupBy: _.groupBy
        }
        asset: (->)
      )

      @$ = cheerio.load(@html)

    it 'should not display any artist tabs', ->
      @$('.side-tabs__nav').find('a[data-id=biography]').length.should.equal 0
      @$('.side-tabs__nav').find('a[data-id=articles]').length.should.equal 0
      @$('.side-tabs__nav').find('a[data-id=exhibition_highlights]').length.should.equal 0


