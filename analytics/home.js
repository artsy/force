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
