;(function() {
  'use strict'
  if (location.pathname !== '/') return

  var $heroUnits = $('.js-homepage-hero-unit')
  analytics.trackLink($heroUnits, 'Clicked homepage banner', function(el) {
    var $el = $(el)
    return {
      banner_link_path: $el.attr('href'),
      banner_position: $heroUnits.index($el),
    }
  })

  analytics.trackLink(
    $('.js-homepage-featured-links a'),
    'Clicked homepage featured link',
    function(el) {
      var $el = $(el)
      return {
        featured_link_path: $el.attr('href'),
        context_type: $el
          .closest('.js-homepage-featured-links')
          .data('context'),
      }
    }
  )

  // "New For You" bubble
  $(document).on('click', '.new-for-you', function() {
    analytics.track('Clicked "New For You" on homepage')
  })

  $(document).on('click', '#hpm-recommended_works-3 a', function() {
    analytics.track('Clicked recommendation on homepage')
  })

  // Artworks rail is rendered client-side
  var selectors = [
    '.js-homepage-featured-links[data-context="works by artists you follow"] a',
    '.js-homepage-featured-links[data-context="featured artworks for sale"] a',
  ].join(',')

  $(document).on('click', selectors, function() {
    var $el = $(this)
    analytics.track('Clicked homepage featured link', {
      featured_link_path: $el.attr('href'),
      context_type: $el.closest('.js-homepage-featured-links').data('context'),
    })
  })

  $(document).on('click', '.abrv-container a', function() {
    var $el = $(this)

    var parentRail = $el.closest('.abrv-container')
    var railID = parentRail.attr('id')

    var eventLog = {
      event_name: 'click',
      type: $el.context.parentElement.className,
      label: 'artwork',
      context_module: railID.slice(4, -2),
      value: railID.slice(-1),
      flow: 'home personalization rails',
      destination_path: $el.attr('href'),
    }
    analytics.track('Clicked rail on homepage', eventLog)
  })
})()
