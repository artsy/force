/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('underscore');
const Backbone = require('backbone');
const { Artworks } = require('../../../collections/artworks');
const Flickity = require('flickity');
const carouselTemplate = function() { return require('../templates/sections/slideshow/carousel.jade')(...arguments); };

export const slideshows = function () { $('.article-section-slideshow').each(function() {
  let $el;
  const allItems = ($el = $(this)).data('items');
  const artworkIds = _.pluck(_.where(allItems, {type: 'artwork'}), 'id');
  const artworks = new Artworks(_.map(artworkIds, id => ({
    id
  })));
  const images = _.where(allItems, {type: 'image'});
  const figures = new Backbone.Collection;

  const prepareFigures = _.after(artworks.length, function() {
    figures.reset(artworks.map(artwork => new Backbone.Model({
      url: artwork.defaultImageUrl('large'),
      caption: artwork.get('title')})).concat(_.map(images, image => new Backbone.Model(image))
    )
    );
    return renderCarouselTemplate();
  });

  var renderCarouselTemplate = function() {
    $el.html(carouselTemplate({figures}));
    return _.defer(() => attachFlickity());
  };

  var attachFlickity = function() {
    return this.slideshow = new Flickity('#carousel-track', {
      cellAlign: 'left',
      contain: true,
      prevNextButtons: false,
      wrapAround: false,
      imagesLoaded: true,
      pageDots: false
    }
    );
  };

  return artworks.invoke('fetch', {
    complete: prepareFigures,
    // Artworks frequently become unpublished
    error(model, response, options) {
      return artworks.remove(model);
    }
  }
  );
})};
