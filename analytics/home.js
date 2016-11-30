(function () {
  'use strict'
  if (location.pathname !== '/') return

  var $heroUnits = $('.js-homepage-hero-unit')
  analytics.trackLink($heroUnits, 'Clicked homepage banner', function (el) {
    var $el = $(el)
    return {
      banner_link_path: $el.attr('href'),
      banner_position: $heroUnits.index($el)
    }
  })

  analytics.trackLink($('.js-homepage-featured-links a'), 'Clicked homepage featured link', function (el) {
    var $el = $(el)
    return {
      featured_link_path: $el.attr('href'),
      context_type: $el.closest('.js-homepage-featured-links').data('context')
    }
  })

  // "New For You" bubble
  $(document).on('click', '.new-for-you', function () {
    analytics.track('Clicked "New For You" on homepage')
  })

  // Artworks rail is rendered client-side
  var selectors = [
    '.js-homepage-featured-links[data-context="works by artists you follow"] a',
    '.js-homepage-featured-links[data-context="featured artworks for sale"] a'
  ].join(',')

  $(document)
    .on('click', selectors, function () {
      var $el = $(this)
      analytics.track('Clicked homepage featured link', {
        featured_link_path: $el.attr('href'),
        context_type: $el.closest('.js-homepage-featured-links').data('context')
      })
    })
})()
