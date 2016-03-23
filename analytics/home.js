(function() {
  'use strict';

  if (location.pathname !== '/') return;

  analytics.track('Home page', { nonInteraction: 1 });

  var $heroUnits = $('.js-homepage-hero-unit');
  analytics.trackLink($heroUnits, 'Clicked homepage banner', function(el) {
    var $el = $(el);
    return {
      banner_link_path: $el.attr('href'),
      banner_position: $heroUnits.index($el)
    };
  });

  analytics.trackLink($('.js-homepage-featured-links a'), 'Clicked homepage featured link', function(el) {
    var $el = $(el);
    return {
      featured_link_path: $el.attr('href'),
      context_type: $el.closest('.js-homepage-featured-links').data('context')
    };
  });

  // Artworks rail is rendered client-side
  $(document)
    .on('click', '.js-homepage-featured-links[data-context="works by artists you follow"] a', function() {
      analytics.track('Clicked homepage featured link', {
        featured_link_path: $(this).attr('href'),
        context_type: 'works by artists you follow'
      });
    });
})();
