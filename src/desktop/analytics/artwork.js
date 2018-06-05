import { data as sd } from 'sharify'
;(function() {
  'use strict'

  // DOM events
  var $document = $(document)
  $document
    .on('click', '.analytics-artwork-show-phone-number', function() {
      analytics.track(
        "Clicked 'Show phone number'",
        _.omit($(this).data(), 'partner')
      )
    })
    .on('click', '.analytics-artwork-download', function() {
      analytics.track('Downloaded lo-res image')
    })
    .on('click', '.analytics-artwork-share', function() {
      analytics.track('Viewed sharing_is_caring form')
    })
    .on('click', '.analytics-artwork-zoom', function() {
      analytics.track('Clicked to zoom in on artwork')
    })
    .on('click', '.analytics-artwork-view-in-room', function() {
      analytics.track("Entered 'View In Room'")
    })
    .on('click', '.analytics-artwork-acquire', function() {
      analytics.track('Clicked "Buy" on the artwork page')
    })
    .on('click', '.analytics-artwork-partner-link', function() {
      analytics.track('Clicked partner name link in detail sidebar')
    })
    .on('click', '.analytics-artwork-contact-seller', function() {
      var context = $(this).data()
      analytics.track('Clicked "Contact Gallery"', {
        artwork_id: context.artwork_id,
        context_type: context.context_type,
      })
    })
    .on('click', '.analytics-artwork-purchase', function() {
      var context = $(this).data()
      analytics.track('Clicked "Purchase"', {
        artwork_id: context.artwork_id,
        context_type: context.context_type,
      })
    })
    .on('click', '.artwork-auction__live-button a', function() {
      analytics.track('click', {
        type: 'button',
        label: $(this).text(),
        flow: 'artworks',
        context_module: 'artwork metadata',
        destination_path: $(this)
          .attr('href')
          .replace(sd.PREDICTION_URL, ''),
      })
    })

  // Other works by artist
  $('.artwork-artist-artworks a.artwork-artist-artworks__header__jump').click(
    function() {
      analytics.track('Click', {
        flow: 'Artwork suggested inventory rails',
        type: 'Link',
        label: 'View all',
        context_module: 'Other works by artist',
        destination_path: $(this).attr('href'),
      })
    }
  )
  $('.artwork-artist-artworks .artwork-section__jump a').click(function() {
    analytics.track('Click', {
      flow: 'Artwork suggested inventory rails',
      type: 'Link',
      label: 'View all bottom link',
      context_module: 'Other works by artist',
      destination_path: $(this).attr('href'),
    })
  })
  $('.artwork-artist-artworks .artwork-brick .artwork-brick__image a').click(
    function() {
      analytics.track('Click', {
        flow: 'Artwork suggested inventory rails',
        type: 'Artwork brick',
        context_module: 'Other works by artist',
        destination_path: $(this).attr('href'),
      })
    }
  )
  // Other works from show
  $('.artwork-show-artworks a.artwork-show-artworks__header__jump').click(
    function() {
      analytics.track('Click', {
        flow: 'Artwork suggested inventory rails',
        type: 'Link',
        label: 'View all',
        context_module: 'Other works from show',
        destination_path: $(this).attr('href'),
      })
    }
  )
  $('.artwork-show-artworks .artwork-section__jump a').click(function() {
    analytics.track('Click', {
      flow: 'Artwork suggested inventory rails',
      type: 'Link',
      label: 'View all bottom link',
      context_module: 'Other works from show',
      destination_path: $(this).attr('href'),
    })
  })
  $('.artwork-show-artworks .artwork-brick .artwork-brick__image a').click(
    function() {
      analytics.track('Click', {
        flow: 'Artwork suggested inventory rails',
        type: 'Artwork brick',
        context_module: 'Other works from show',
        destination_path: $(this).attr('href'),
      })
    }
  )
  // Other works from gallery
  $('.artwork-partner-artworks a.artwork-partner-artworks__header__jump').click(
    function() {
      analytics.track('Click', {
        flow: 'Artwork suggested inventory rails',
        type: 'Link',
        label: 'View all',
        context_module: 'Other works from gallery',
        destination_path: $(this).attr('href'),
      })
    }
  )
  $('.artwork-partner-artworks .artwork-section__jump a').click(function() {
    analytics.track('Click', {
      flow: 'Artwork suggested inventory rails',
      type: 'Link',
      label: 'View all bottom link',
      context_module: 'Other works from gallery',
      destination_path: $(this).attr('href'),
    })
  })
  $('.artwork-partner-artworks .artwork-brick .artwork-brick__image a').click(
    function() {
      analytics.track('Click', {
        flow: 'Artwork suggested inventory rails',
        type: 'Artwork brick',
        context_module: 'Other works from gallery',
        destination_path: $(this).attr('href'),
      })
    }
  )
  // Other works in auction
  $('.artwork-auction-artworks a.artwork-auction-artworks__header__jump').click(
    function() {
      analytics.track('Click', {
        flow: 'Artwork suggested inventory rails',
        type: 'Link',
        label: 'View all',
        context_module: 'Other works in auction',
        destination_path: $(this).attr('href'),
      })
    }
  )
  $('.artwork-auction-artworks .artwork-section__jump a').click(function() {
    analytics.track('Click', {
      flow: 'Artwork suggested inventory rails',
      type: 'Link',
      label: 'View all bottom link',
      context_module: 'Other works in auction',
      destination_path: $(this).attr('href'),
    })
  })
  $('.artwork-auction-artworks .artwork-brick .artwork-brick__image a').click(
    function() {
      analytics.track('Click', {
        flow: 'Artwork suggested inventory rails',
        type: 'Artwork brick',
        context_module: 'Other works in auction',
        destination_path: $(this).attr('href'),
      })
    }
  )

  analyticsHooks
    .on('artwork:contact-gallery', function(context) {
      analytics.track("Clicked 'Contact Gallery'", {
        artwork_id: context.artwork_id,
        context_type: context.context_type,
      })
    })
    .on('artwork:contact-specialist', function() {
      analytics.track("Clicked 'Contact Artsy Specialist'")
    })
    .on('artwork:confirm-registration', function() {
      analytics.track("Showed 'Confirm registration on artwork page'", {
        nonInteraction: 1,
      })
    })
})()
