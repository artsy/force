<<<<<<< HEAD
if(location.pathname == '/') analytics.track('Home page', { nonInteraction: 1 });

analytics.trackLink($('#home-featured-artworks .grid-item'), 'Clicked homepage artwork');
analytics.trackLink($('.is-via-personalized'), 'Clicked personalized homepage artwork');
analytics.trackLink($('.is-via-featured'), 'Clicked featured homepage artwork');


$('#home-hero-units-right-arrow').click(function() {
  analytics.track('Clicked right arrow on homepage', {
    first_hero_unit: sd.HERO_UNITS[0].id,
    auction_id: sd.AUCTION._id,
    auction_slug: sd.AUCTION.id,
  })
})
=======
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
>>>>>>> 35af2d439c424f71dd0e8e7ce49887a871ee84bb
