# Merry-go-round (AKA Carousel)

A wrapper for [Flickity](http://flickity.metafizzy.co/).

## Usage

```styl
@import '../components/merry_go_round'
```

```jade
section.js-my-carousel
  .mgr-cells.js-mgr-cells
    for image in images.models
      .mgr-cell.js-mgr-cell
        img( src= src )

  - length = images.length
  nav.mgr-navigation.js-mgr-navigation
    include ../../../components/merry_go_round/templates/navigation
```

```coffeescript
initCarousel = require '../../../components/merry_go_round/index.coffee'

promise = initCarousel $('.js-my-carousel')
# Pass in additional or overwrite existing options
initCarousel $('.js-my-carousel'), imagesLoaded: true

# Hook into Flickity if need be:
initCarousel $('.js-my-carousel'), {}, (carousel) ->
  carousel.cells.flickity.on 'dragStart', -> # Do something
  carousel.cells.flickity.on 'staticClick', -> # Do something

initCarousel($('.js-my-carousel')).then (carousel) ->
  # Ibid.
```
