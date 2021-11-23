/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('underscore');
const Backbone = require('backbone');
const qs = require('qs');
const { FilterArtworks } = require('../../collections/filter_artworks');
const { FilterView } = require('./view');
const { FILTER_ROOT } = require('sharify').data;

export const setupFilter = (options) => {
  const defaults = { startHistory: true };

  const { aggregations, el, stuckParam, stuckFacet } = _.defaults(options, defaults);

  const queryParams = qs.parse(location.search.replace(/^\?/, ''));
  const params = new Backbone.Model(_.extend(queryParams, {
    page: 1,
    size: 10,
    aggregations
  }
  )
  );

  if (stuckParam) {
    params.set(stuckParam, stuckFacet.id);
  }

  const collection = new FilterArtworks;

  const view = new FilterView({
    el,
    collection,
    params,
    stuckFacet,
    stuckParam,
    aggregations
  });

  collection.fetch({
    data: params.toJSON(),
    success() {
      return collection.trigger('initial:fetch');
    }
  });

  return { params, collection, view };
}
