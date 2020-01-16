_ = require 'underscore'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ AToZ } = require 'artsy-backbone-mixins'
{ fabricate } = require '@artsy/antigravity'
Fair = require '../../../models/fair'
Profile = require '../../../models/profile'
Item = require '../../../models/item'
Items = require '../../../collections/items'
OrderedSet = require '../../../models/ordered_set'
OrderedSets = require '../../../collections/ordered_sets'
cheerio = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Fair', ->
  describe 'footer template', ->
    before ->
      fair = new Fair (fabricate 'fair', about: 'about the fair')
      profile = new Profile (fabricate 'fair_profile')

      # Explore ordered set
      editorial = new OrderedSet fabricate('set', {
        key: "editorial"
        item_type: "FeaturedLink"
      })
      editorialItems = new Items(null, 'editorial-foo')
      editorialItems.add new Item( fabricate 'featured_link', { title: 'Chinese Art' } )
      editorialItems.add new Item( fabricate 'featured_link', { title: 'Moar Chinese Art' } )

      # Explore ordered set
      explore = new OrderedSet fabricate('set', {
        key: "explore"
        item_type: "FeaturedLink"
      })
      exploreItems = new Items(null, 'explore-foo')
      exploreItems.add new Item( fabricate 'featured_link', { title: 'Explore Art' } )
      exploreItems.add new Item( fabricate 'featured_link', { title: 'Moar Explore Art' } )

      # Primary ordered set
      primary = new OrderedSet fabricate('set', {
        key: "primary"
        item_type: "FeaturedLink"
      })
      primaryItems = new Items(null, 'primary-foo')
      primaryItems.add new Item( fabricate 'featured_link', { title: 'Primary Art' } )
      primaryItems.add new Item( fabricate 'featured_link', { title: 'Moar Primary Art' } )

      # Curator ordered set
      curator = new OrderedSet fabricate('set', {
        key: "curator"
        item_type: "FeaturedLink"
      })
      curatorItems = new Items(null, 'curator-foo')
      curatorItems.add new Item( fabricate 'featured_link', { title: 'Curator Art' } )
      curatorItems.add new Item( fabricate 'featured_link', { title: 'Moar Curator Art' } )
      curatorItems.add new Item( fabricate 'featured_link', { title: 'EVEN Moar Curator Art' } )

      @template = render('footer')
        editorialItems: editorialItems.models
        exploreItems: exploreItems.models
        primaryItems: primaryItems.models
        curatorItems: curatorItems.models
        fair: fair
        profile: profile

    it 'renders valid html', ->
      $ = cheerio.load @template
      $('.footer-square-sections .footer-square-section').length.should.equal 5
      $('.fair-footer-posts-container .small-post').length.should.equal 2
      $('.curator-picks-container .small-section').length.should.equal 3
