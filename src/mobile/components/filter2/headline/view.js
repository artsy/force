/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _HeadlineView;
const _ = require('underscore');
const Backbone = require('backbone');
const _s = require('underscore.string');

export const HeadlineView = (_HeadlineView = class HeadlineView extends Backbone.View {

  initialize({ collection, params, facets, stuckFacet, stuckParam }) {
    this.collection = collection;
    this.params = params;
    this.facets = facets;
    this.stuckFacet = stuckFacet;
    this.stuckParam = stuckParam;
    this.listenTo(this.collection, "initial:fetch", this.setHeadline, this);

    if (this.stuckParam === 'fair_id') { this.stuckFacet = null; }

    for (let facet of Array.from(this.facets)) {
      this.listenTo(this.params, `change:${facet}`, this.setHeadline, this);
    }

    return this.counts = _.clone(this.collection.counts);
  }

  setHeadline() {
    if (this.anyFacetsSelected() || this.stuckFacet) {
      return this.$el.text(this.paramsToHeading()).show();
    } else {
      return this.$el.text("").hide();
    }
  }

  facetName(facet){
    return __guard__(__guard__(this.counts != null ? this.counts[facet] : undefined, x1 => x1[this.params.get(facet)]), x => x.name);
  }

  anyFacetsSelected() {
    return _.any(this.facets, facet => this.params.has(facet));
  }

  humanizeMedium() {
    // replace the 'slash' in 'film-slash-video'
    return _s.humanize(this.params.get('medium')).replace('slash', '/');
  }

  displayMedium() {
    if (this.stuckFacet) {
      if (this.params.has('medium')) {
        return this.humanizeMedium();
      } else {
        return this.stuckFacet.get('name');
      }
    } else {
      return this.humanizeMedium() || 'Artworks';
    }
  }

  paramsToHeading() {
    if (this.anyFacetsSelected() || this.stuckFacet) {
      return _.compact([
        this.facetName('dimension_range'),
        (this.displayMedium()),
        this.facetName('price_range')
      ]).join(' ');
    }
  }
});

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}