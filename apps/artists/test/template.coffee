_               = require 'underscore'
benv            = require 'benv'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
OrderedSet      = require '../../../models/ordered_set'
FeaturedLink    = require '../../../models/featured_link'
Gene            = require '../../../models/gene'
Artists         = require '../../../collections/artists'
Artist          = require '../../../models/artist'
Items           = require '../../../collections/items'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artists', ->
  describe 'index page', ->
    after benv.teardown

    before (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }

        @artistCollection = new Artists(
          _.times(2, -> new Artist(fabricate('artist')))
        )

        @featuredLinksCollection = new Items(
          _.times(3, ->
            link = new FeaturedLink(fabricate('featured_link'))
            link.set 'artist', new Artist(fabricate('artist'))
            link
          ), { id: 'foobar', item_type: 'FeaturedLink' }
        )

        @genes = new Items(_.times(2, =>
          gene = new Gene(fabricate 'gene')
          gene.trendingArtists = @artistCollection.models
          gene
        ), { id: 'foobar', item_type: 'Gene'})

        @featuredArtists = new OrderedSet(name: 'Featured Artists', items: @featuredLinksCollection)

        template = render('index')(
          sd: {}
          letterRange:      ['a', 'b', 'c']
          featuredArtists:  @featuredArtists
          featuredGenes:    @genes
        )

        @$template = $(template)

        done()

    it 'renders the alphabetical nav', ->
      @$template.find('.alphabetical-index-range').text().should.equal 'abc'

    it 'has a single <h1> that displays the name of the artists set', ->
      $h1 = @$template.find('h1')
      $h1.length.should.equal 1
      $h1.text().should.equal 'Featured Artists'

    it 'renders the featured artists', ->
      @$template.find('.afc-artist').length.should.equal @featuredLinksCollection.length

    it 'renders the gene sets', ->
      @$template.find('.artists-featured-genes-gene').length.should.equal @genes.length

    it 'renders the trendingArtists for the genes', ->
      @$template.find('.afg-artist').length.should.equal @genes.length * @artistCollection.length

    it 'has jump links to the various gene pages', ->
      $links = @$template.find('.avant-garde-jump-link')
      $links.length.should.equal 2
      $links.first().text().should.equal fabricate('gene').name
