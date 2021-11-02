/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _SearchResult;
const _ = require('underscore');
const _s = require('underscore.string');
const sd = require('sharify').data;
const moment = require('moment-timezone');
const Backbone = require('backbone');
const { Image } = require('@artsy/backbone-mixins');
const { PartnerShow } = require('./partner_show');

export default (_SearchResult = (function() {
  _SearchResult = class SearchResult extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL));
    }

    initialize(options) {

      this.set({
        slug: this.get('id'),
        id: this.get('_id')
      });

      this.set({
        display: this.display(),
        image_url: this.imageUrl(),
        display_model: this.displayModel(),
        location: this.location(),
        status: this.status()
      });

      this.set({
        about: this.about()});

      // Set value attribute for autocomplete usage
      return this.value = this.display();
    }

    display() {
      return _s.trim(this.get('name') || __guard__(this.get('owner'), x => x.name) || this.get('display'));
    }

    trimmedDisplay() {
      return _s.trim(_s.truncate(this.get('display'), 75));
    }

    location() {
      if (this.get('href')) {
        return this.get('href');
      } else if ((this.get('model') === 'profile') || (this.get('model') === 'page')) {
        return `/${this.get('slug')}`;
      } else if (this.get('model') === 'fair') {
        return `/${this.get('profile_id')}`;
      } else if (this.get('model') === 'partnershow') {
        return `/show/${this.get('slug')}`;
      } else if (this.get('model') === 'sale') {
        return `/auction/${this.get('slug')}`;
      } else if (this.get('model') === 'city') {
        return `/shows/${this.get('slug')}`;
      } else {
        return `/${this.get('model')}/${this.get('slug')}`;
      }
    }

    displayModel() {
      const originalModel = this.get('model');
      const model = (() => { let needle;
      switch (originalModel) {
        case 'gene':
          return 'category';
        case 'partnershow':
          return 'show';
        case 'profile':
          var institutionTypes = ['PartnerInstitution', 'PartnerInstitutionalSeller'];
          if ((needle = this.get('owner_type'), Array.from(institutionTypes).includes(needle))) {
            return 'institution';
          } else if (this.get('owner_type') === 'FairOrganizer') {
            return 'fair';
          } else {
            return 'gallery';
          }
        default:
          return originalModel;
      } })();

      return _s.capitalize(model);
    }

    imageUrl() {
      let needle;
      if ((needle = this.get('display_model'), ['Page', 'City'].includes(needle))) { return "/images/icon-70.png"; } // internal pages
      return this.get('image_url');
    }

    resultsPageTitle() {
      if (this.get('display_model') === 'Artist') {
        return this.get('display') + " - View & Collect Works";
      } else {
        return this.get('display');
      }
    }

    updateForFair(fair) {
      if (this.get('display_model') === 'Show') {
        return this.set({display_model: 'Booth'});
      } else {
        return this.set({location: `${fair.href()}/browse${this.get('location')}`});
      }
    }

    about() {
      let needle, needle1;
      if (this.get('display_model') === 'Article') {
        return this.formatArticleAbout();
      } else if (this.get('display_model') === 'Fair') {
        return this.formatEventAbout('Art fair');
      } else if (this.get('display_model') === 'Sale') {
        return this.formatEventAbout('Sale', "America/New_York");
      } else if ((needle = this.get('display_model'), ['Show', 'Booth'].includes(needle))) {
        return this.formatShowAbout();
      } else if ((needle1 = this.get('display_model'), ['Artwork', 'Feature', 'Gallery', 'Page'].includes(needle1))) {
        return this.get('description');
      } else if (this.get('display_model') === 'City') {
        return this.formatCityAbout();
      } else { return undefined; }
    }

    status() {
      if (this.get('model') === 'partnershow') {
        let startTime;
        if (startTime = this.get('start_at')) {
          let endTime;
          if (endTime = this.get('end_at')) {
            if (moment() > moment(endTime)) {
              return 'closed';
            } else if (moment() > moment(startTime)) {
              return 'running';
            } else {
              return 'upcoming';
            }
          }
        }
      }
    }

    formatCityAbout() {
      return `Browse current exhibitions in ${this.get('display')}`;
    }

    formatArticleAbout() {
      let formattedPublishedTime, publishedTime;
      if (publishedTime = this.get('published_at')) {
        formattedPublishedTime = moment(publishedTime).format("MMM Do, YYYY");
      }

      const excerpt = this.get('description');

      if (publishedTime && excerpt) {
        return `${formattedPublishedTime} ... ${excerpt}`;
      } else if (publishedTime) {
        return formattedPublishedTime;
      } else {
        return excerpt;
      }
    }

    formatShowAbout() {
      let artists;
      if (this.get('artist_names')) {
        for (let artist of Array.from(this.get('artist_names'))) { artists = { name: artist }; }
      } else {
        artists = [];
      }

      const show = new PartnerShow({
        name: this.get('display'),
        start_at: this.get('start_at'),
        end_at: this.get('end_at'),
        status: this.get('status'),
        location: {
          city: this.get('city'),
          address: this.get('address')
        },
        artists
      });

      if (this.get('fair_id')) {
        show.set({fair: { name: this.get('venue') }});
      } else {
        show.set({partner: { name: this.get('venue') }});
      }

      return show.toPageDescription();
    }

    formatEventAbout(title, timezone) {
      let about;
      const formattedStartTime = this.formatEventTime(this.get('start_at'), 'MMM Do', timezone);
      const formattedEndTime = this.formatEventTime(this.get('end_at'), 'MMM Do, YYYY', timezone);
      const location = this.get('city');

      if (formattedStartTime && formattedEndTime) {
        about = `${title} running from ${formattedStartTime} to ${formattedEndTime}`;
        if (location) { about += ` in ${location}`; }
      } else if (formattedStartTime) {
        about = `${title} opening ${formattedStartTime}`;
        if (location) { about += ` in ${location}`; }
      } else {
        about = this.get('description');
      }

      return about;
    }

    formatEventTime(timestamp, format, timezone) {
      if (timestamp) {
        let momentTime = moment(timestamp);

        if (!momentTime.isValid()) {
          return null;
        } else if (timezone) {
          momentTime = momentTime.tz(timezone);
          return `${momentTime.format(format)} (at ${momentTime.format("h:mma z")})`;
        } else {
          return momentTime.format(format);
        }
      }
    }

    href() {
      return this.get('location');
    }
  };
  _SearchResult.initClass();
  return _SearchResult;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export default SearchResult = _SearchResult
