# Component Reference

Please add your components here with a description of how to use them.
If a separate doc is required, add it to the component's directory as a
`README.md` and create a link to it here.

- [Artwork Columns](#artwork-columns)
- [Artwork Item](#artwork-item)
- [Garamond Tab List](#garamond-tab-list)
- [Profile Badge](#profile-badge)
- [Suggested Genes](#suggested-genes)
- [Follow Button](#follow-button)
- [Artist Fillwidth List](#artist-fillwidth-list)
- [Bordered Pulldown](#bordered-pulldown)
- [Filter](#filter)
- [Contact View](#contact-view)
- [Related Genes](#related-genes)



## Artwork Columns
![](images/artwork_columns.png)

Dependencies:
- Artwork Item Component `components/artwork_item`

There are two different ways you can use the Artwork Columns component. It has a template and a view.
  1. Pass models to the template yourself
  2. Use the `ArtworkColumnsView`

#### Pass models to the template yourself
Include the template, and the artwork item save controls.
The template can be rendered with items that are already sorted with the results of an `Artworks`
collection's `groupByColumnsInOrder` method. This returns the models ready to go to pass to the template.

```jade
# Dependencies for the view
Artworks        = require '../../../collections/artworks.coffee'
Backbone        = require 'backbone'
CurrentUser     = require '../../../models/current_user.coffee'
SaveControls    = require '../../../components/artwork_item/views/save_controls.coffee'
artworkColumnsTemplate  = -> require('../../../components/artwork_columns/template.jade') arguments...

# When the view has artworks to render
@$('.show-artworks').html artworkColumnsTemplate artworkColumns: artworks.groupByColumnsInOrder(3)

# Set up the save controls on each rendered artwork item and sync with the server
# Fillwidth rows and artwork columns do this on their own when rendering artwork items
listItems =
  for artwork, index in artworks.models
    overlay = @$(".artwork-item[data-artwork='#{artwork.get('id')}']").find('.overlay-container')
    new SaveControls
      artworkCollection: @artworkCollection  # This is the current user's saved artworks collection,
                                             # which is a model...
      el               : overlay
      model            : artwork
if @artworkCollection
  @artworkCollection.addRepoArtworks @collection
  @artworkCollection.syncSavedArtworks()
```

Note that the template will need to got in a containing element with a class of `.artwork-columns` to get
some of the default styling.

#### Use the `ArtworkColumnsView`
Benefits:
- Alternate column balancing layout (default option) where artworks are added to the shortest column
- Paging - the view allows you to add arrays of models and they will be rendered and initialized with save controls
- See more option to reveal more works
```coffeescript
  @columnsView = new ArtworkColumnsView
    el:         @$ '.artwork-columns'
    collection: new Artworks @saleArtworks.pluck('artwork')
    gutterWidth: 40
    totalWidth: 1000 # Desired width of the container
    seeMore: false    # If true, will look at `initialItemCount`
                      # and hide / reveal any more than that value
    isOrdered: false  # If false will add artworks to the
                      # shortest column (left to right) to balance columns
    maxArtworkHeight: 400  # used to avoid tall works from spanning the
                           # whole view port and looking too large
```
Downsides are currently that this will inject a lot of CSS, so we may need to kill that or add more
params for percentage width / fluid layouts.


## Artwork Item
![](images/artwork_item.png)

AKA "ol' reliable", this view is a work horse and will have a place on any page
that displays artwork. This component contains the save controls template and view.


## Garamond Tab List
![](images/garamond_tab_list.png)

Defined in `components/main_layout/stylesheets/navigation.styl`
Example:
```jade
.garamond-tablist
  a.garamond-tab.is-active( href="/artist/#{artist.id}" ) Active Tab
  span.garamond-tab-separator
  a.garamond-tab( href="/artist/#{artist.id}" ) Inactive Tab
```
The tab seperator will add a slash as an image. Can alternatively be used with
other seperators typically wrapped in a span (to keep links displayed inline).

##### Uses:
- Featured Partners [/partners](http://artsy.net/parnters), [/galleries](http://artsy.net/galleries),
[/institutions](http://artsy.net/institutions)
- Partner Profiles [/guggenheim](http://artsy.net/guggenheim)



## Profile Badge
![](images/profile_badge.png)

This component displays linked profile icons with a profile owner's name. Different
sizes and orientations can be achieved with CSS. If a common size / style setup emerges,
it should be added to `components/profile_badge/index.styl`.

Example (see `apps/artist/templates/related_posts.jade`):
```jade
- var profile = post.profile()
li.artist-related-post
  a.artist-related-post-content( href="/post/#{post.get('id')}" )
    if post.get('title')
      .arpc-title
        != post.get('title')
    if post.get('summary')
      .arpc-body
        != post.get('summary')

  unless profile.isNew()
    .artist-related-post-profile
      include ../../../components/profile_badge/template
```
Add a reference to the component's stylus file in the app's asset package and override
as needed.

```stylus
@import '../components/main_layout/stylesheets'
@import '../components/modal'
@import '../components/feedback'
@import '../components/auth_modal'
@import '../components/fillwidth_row'
@import '../components/tooltips'
@import '../components/profile_badge' // <-- ref to the component stylus
@import '../apps/artist/stylesheets'
```
See `apps/artist/stylesheets/index.styl` for an example of a customized layout
```stylus
.artist-related-post-profile
  text-align center
  vertical-align middle
  width 150px
  .profile-badge-icon
    display inline-block
    width 72px
    height 72px
  .profile-badge-name
    font-size 10px
    text-align center
```
##### Uses:
- Artist Pages - Featured Posts [/artist/andy-warhol](http://artsy.net/artist/andy-warhol)
- Partner Shows [/show/333-montezuma-arts-elegy](http://artsy.net/show/333-montezuma-arts-elegy)

## Suggested Genes
![](images/suggested_genes.png)

This component fetches and displays suggested genes in rows. `numberOfItems`
 (default to `5`) and `isShuffle` (default to `true`) options can be
passed when creating an instance. It has to call `render()` explicitly
to show the component.

Example
```jade
SuggestedGenesView = require '../../../components/suggested_genes/view.coffee'

(new SuggestedGenesView
  el: @$('.suggested-genes')
  numberOfItems: 10
  isShuffle: false
).render()
```

##### Uses:
- Favorites
- Follows

## Follow Button

Used in many pages that you can "follow" like the gene page, artist page, etc.

![](images/follow_1.png)
![](images/follow_2.png)

Example:
```coffeescript
{ Following, FollowButton } = require '../../components/follow_button/index.coffee'

following = new Following null, kind: 'artist'

new FollowButton
   el: $('.my-follow-button')
   following: following
   model: myModel

following.syncFollows myIds
```

Optionally you can pass in an `analyticsFollowMessage` and `analyticsUnfollowMessage` to the view. This falls back to a sensible default: `"#{action} #{@model.constructor.name.toLowerCase()} from #{window?.location.pathname}"`

## Artist Fillwidth List

Used in related artists for the artist page and the gene page where there's a fillwidth row of artists.

![](images/artist_fillwidth_list.png)

Example:
```coffeescript
new ArtistFillwidthList(
  collection: artists
  el: $('container')
  user: CurrentUser.orNull()
).fetchAndRender()
```

`fetchAndRender` will fetch every artist's artworks and the individual list items will re-render as they sync.

## Bordered Pulldown

An Artsy styled drop down menu. This component comes with a jade mixin you can use via:

![](images/bordered_pulldown.png)

````jade
include ../../bordered_pulldown/mixin

+bordered-pulldown('Recently Added', 'Sort By')
  a( data-sort='date_created' ) Recently Added
  a( data-sort='-date_created' ) Artwork Year
````

Or if you need finer control feel free to just use the CSS classes that are in it's index.styl.

## Filter

A library of components used in the multi-faceted fitler UIs across the site. E.g. in /browse and /gene/:id or /fair.

![](images/filter_overview.png)

Currently the easiest way to use filter is to build on top of the FilterArtworks component detailed below. However if more control is needed you can use the smaller filter components listed below that to compose your own filter UI.

### Filter Artworks

A view that glues together a bunch of filter components and the artwork columns component to create a common filtering UI promonently used in gene, tag, and browse pages.

![](images/filter_artworks.png)

First build up your html using the classes shown below to indicate where the view will render it's pieces.

````jade
#tag-filter
  .filter-fixed-header-nav
    | Showing
    em.filter-artworks-num
    | Works
    //- Add artwork filter buttons
    include ../../filter/artworks_nav
    //- You might append more controls in the header here
  .filter-artworks-list
  //- Here's where the columns of artworks with sort/count widgets render
````

Then add the view

````coffeescript
@filterArtworksView = new FilterArtworksView
  el: $ '#tag-filter'
  artworksUrl: '/api/v1/search/filtered/tag/' + tag.get('id')
  paramsUrl: '/api/v1/search/filtered/tag/suggest'
````

#### Building on top of it

It's recommended to extend this UI you build a parent view that uses this view as a child to build on top of it. If you find you need to add more to this view please consider composing your own filter UI out of the smaller components below.

#### How It Works

A filter UI generally consists of three things keeping state: 1. The filter query params passed to the endpoint being filtered on (e.g. /api/v1/search/filtered/tag/:id for tag artworks) 2. The counts being returned from a separate endpoint (e.g. /api/v1/search/filtered/tag/:id/suggest for tag artworks) 3. The collection of actual domain objects (e.g. an Artworks collection). This view creates these pieces for you as `@filterArtworksView.params`, `@filterArtworksView.counts`, and `@filterArtworksView.artworks` and passes them along to the sub components listed below. The sub components then listen to events on these state-keeping pieces and update their UI as needed.

### Filter Artworks Nav

The set of filter menus for artworks including the "All Works" button and "Price", "Medium", and "Size" dropdowns.

![](images/filter_artwork_nav.png)

Include the template

````jade
#gene-artworks-container
  include ../../../components/filter/artworks_nav/template
````

Then add the view passing in the counts and params

````coffeescript
new FilterArtworksNav
  el: $ '#tag-filter-artworks-nav'
  params: #...
  counts: #...
````

Clicking nav items will set properties on the params e.g. clicking "Under $1000" will do `@params.set price_range: "-1:1000"`

### Filter Sort Count

A common subheader in the filtering UIs. This includes a sorting pulldown on the right which comes with the default "Recently Added", "Artwork Year Asc/Desc" sort values.

![](images/filter_sort_count.png)

````coffeescript
new FilterSortCount
  el: $ '#gene-filter-subheader'
  params: #...
  counts: #...
````

Selecting a drop down item will set properties on the params e.g. clicking "Recently Added" will do `@params.set sort: '-created_at'

### Filter Fixed Header

A view that turns an element into a fixed header by wrapping it in a `.filter-fixed-header-container` element that pop-locks by toggling the class `.filter-fixed-header` on the container. You can use this class to adjust your header CSS by scoping under it e.g. `.filter-fixed-header #gene-filter-nav`. This also adds a "jump" component which lets the user scroll back to the top of the page.

![](images/filter_fixed_header.png)

````coffeescript
new FilterFixedHeader
  el: $ '#gene-filter-header'
````

* Use the `.filter-fixed-header-left` class in your template to get the meta information on the left hand side such as gene name or number of works.

### Contact View

```coffeescript
ContactView = require '../../components/contact/view.coffee'
new ContactView(width: '600px', url: "#{sd.ARTSY_URL}/api/v1/feedback")
```
The base `ContactView` is configurable by passing in the following options: `width` (modal width, String value in px), `successMessage` (large copy that is displayed after a successful message is sent), `placeholder` (Main textarea placeholder), `url` (API endpoint that data is posted to).

More useful is to extend the `ContactView` when configuration is more complex. The template for the header is a method that can be replaced with your own template function:

```coffeescript
_ = require 'underscore'
sd = require('sharify').data
ContactView   = require './view.coffee'
headerTemplate  = -> require('./templates/feedback_header.jade') arguments...

module.exports = class FeedbackView extends ContactView
  headerTemplate: headerTemplate
  defaults: -> _.extend super,
    placeholder: 'Leave your comments'
    url: "#{sd.ARTSY_URL}/api/v1/feedback"
```

The view's `submit` method can be intercepted to add more data to the model:

```coffeescript
  submit: ->
    @model.set
      artwork: @artwork.id
      contact_gallery: true
      session_id: SESSION_ID
    super

```

### Related Genes

This is a view designed to show a comma separated list of related genes. The base options / CSS are to show up to 10 items, each linked to their gene page, in Artsy purple. The logic for deriving the related genes for a given model can go in here- currently related genes for Artists and Genes are supported. Add a reference to the component in your app's asset package and override CSS as needed.


![](images/related_genes.png)

Example usage:

```coffeescript
  setupRelatedGenes: ->
    new RelatedGenesView
      model: @model
      modelName: 'artist'
      el: @$('.artist-info-section .related-genes')
```
