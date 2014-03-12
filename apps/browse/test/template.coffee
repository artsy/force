jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
OrderedSet      = require '../../../models/ordered_set'
FeaturedLink    = require '../../../models/featured_link'
Item            = require '../../../models/item'
Items           = require '../../../collections/items'
OrderedSets     = require '../../../collections/ordered_sets'

render = ->
  filename = path.resolve __dirname, "../templates/index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Browse', ->
  describe 'with all 3 ordered sets', ->
    beforeEach ->
      [featuredGenes, popularCategories, geneCategories] = [
        new OrderedSets({ key: 'browse:featured-genes' }),
        new OrderedSets({ key: 'browse:popular-categories' }),
        new OrderedSets({ key: 'browse:gene-categories' })
      ]

      # featuredGenes
      featuredGenes.add new OrderedSet( fabricate('set'), {
        key: "browse:featured-genes"
        name: "Featured Categories"
        item_type: "FeaturedLink"
      })
      featuredGenesLinks = new Items null, 'featured-gene-links'
      featuredGenesLinks.add(new Item( fabricate 'featured_link', { title: 'Featured Gene 1'} ))
      featuredGenesLinks.add(new Item( fabricate 'featured_link', { title: 'Featured Gene 2'} ))
      featuredGenes.at(0).set items: featuredGenesLinks

      # popularCategories
      popularCategories.add new OrderedSet( fabricate('set'), {
        key: "browse:popular-categories"
        name: "Popular Categories"
        item_type: "OrderedSet"
      })
      popularCategoriesOrderedSet = new OrderedSet( fabricate 'set', { name: 'Popular Category'} )
      popularCategoriesItems = new Items null, 'popular-categories-set'
      popularCategoriesItems.add popularCategoriesOrderedSet
      popularCategories.at(0).set items: popularCategoriesItems

      popularCategoriesOrderedSetItems = new Items null, 'popular-categories-ordered-set-items'
      popularCategoriesOrderedSetItems.add new Item( fabricate 'featured_link', { title: 'Chinese Art' } )
      popularCategoriesOrderedSetItems.add new Item( fabricate 'featured_link', { title: 'Color Fields' } )
      popularCategoriesOrderedSet.set items: popularCategoriesOrderedSetItems

      @template = render()(
        sd: {}
        featuredGenes: featuredGenes
        popularCategories: popularCategories
        geneCategories: geneCategories
      )

    it "should include all three genes and images", ->
      # featuredGenes
      @template.should.include 'browse-featured-gene'
      @template.should.include 'Featured Gene 1'
      @template.should.include 'Featured Gene 2'

      # popularCategories
      @template.should.include 'browse-popular-categories'
      @template.should.include 'Popular Category'
      @template.should.include 'Chinese Art'
      @template.should.include 'Color Fields'

  describe 'with no ordered sets', ->
    beforeEach ->
      @template = render()(
        sd: {}
      )

    it "should not error", ->
      @template.should.include 'Browse Works'
