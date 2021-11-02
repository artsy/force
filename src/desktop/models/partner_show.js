/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerShow;
const _ = require('underscore');
const sd = require('sharify').data;
const moment = require('moment');
const Backbone = require('backbone');
const { Image, Markdown } = require('@artsy/backbone-mixins');
const DateHelpers = require('../components/util/date_helpers');
const { compactObject } = require('./mixins/compact_object');
const { FairLocation } = require('./fair_location');
const { PartnerLocation } = require('./partner_location');
const { Artworks } = require('../collections/artworks');
const { ImageSizes } = require('./mixins/image_sizes');
const { PartnerRelations } = require('./mixins/relations/partner_show');

export default (_PartnerShow = (function() {
  _PartnerShow = class PartnerShow extends Backbone.Model {
    constructor(...args) {
      super(...args);
    }

    preinitialize() {
      this.formatCity = this.formatCity.bind(this);
      this.formatShowOrFairCity = this.formatShowOrFairCity.bind(this);
    }

    static initClass() {
      _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL));
      _.extend(this.prototype, ImageSizes);
      _.extend(this.prototype, Markdown);
      _.extend(this.prototype, Relations);
    }

    url() {
      if (this.has('partner')) {
        return `${sd.API_URL}/api/v1/partner/${this.get('partner').id}/show/${this.get('id')}`;
      } else {
        return `${sd.API_URL}/api/v1/show/${this.get('id')}`;
      }
    }

    href() {
      return `/show/${this.get('id')}`;
    }

    toPageTitle() {
      return _.compact([
        this.title(),
        __guard__(this.get('partner'), x => x.name) || '',
        "Artsy"
      ]).join(' | ');
    }

    // past / current / upcoming show featuring works by {artists} on view at {gallery name} {location} {dates}
    toPageDescription() {
      let artistText = this.formatArtistText();
      if (artistText) {
        artistText = `featuring works by ${artistText}`;
      }

      const info = _.compact([
        'at',
        this.related().partner.get('name'),
        this.related().fair.get('name'),
        __guard__(this.location(), x => x.singleLine()) || '',
        this.runningDates() || ''
      ]).join(' ');

      return _.compact([
        this.formatLeadHeading(),
        artistText,
        info
      ]).join(' ');
    }

    formatArtistText() {
      let artistText;
      const artists = _.compact(this.related().artists.pluck('name'));
      if (artists.length > 1) {
        return artistText = `${artists.slice(0, (artists.length - 1)).join(', ')} and ${artists[artists.length - 1]}`;
      } else if (artists.length === 1) {
        return artistText = `${artists[0]}`;
      }
    }

    // Get the poster image url of the show (e.g. used in the shows tab in
    // partner profile.)
    //
    // If no available images, it will fetch one for you and trigger a
    // `fetch:posterImageUrl` event on success with the image url.
    posterImageUrl(featured) {
      // try the image of the show
      if (featured == null) { featured = false; }
      let size = featured ? 'featured' : 'large';
      if (this.hasImage(size)) { return this.imageUrl(size); }

      // if not, try the image of its first artwork, if we already have some
      if (featured) { size = 'larger'; }
      if (this.artworks != null ? this.artworks.length : undefined) {
        return this.artworks.first().defaultImage().imageUrl(size);
      }

      // if not, fetch some artworks and use one of their images
      this.artworks = new Artworks([]);
      const options = {
        data: { size: 10, published: true },
        url: `${this.url()}/artworks`,
        cache: true,
        success: () => {
          if (this.artworks != null ? this.artworks.length : undefined) {
            const imageUrl = this.artworks.first().defaultImage().imageUrl(size);
            return this.trigger("fetch:posterImageUrl", imageUrl);
          }
        }
      };
      this.artworks.fetch(options);
      return false;
    }

    metaImageUrl() {
      if (this.imageUrl('large')) {
        return this.imageUrl('large');
      } else if (((this.artworks != null ? this.artworks.length : undefined) > 0) && this.artworks.first().defaultImage()) {
        return this.artworks.first().defaultImage().imageUrl('large');
      } else {
        return null;
      }
    }

    thumbImageUrl() {
      if (this.hasImage('general')) { return this.imageUrl('general'); }
      if (this.hasImage('medium_rectangle')) { return this.imageUrl('medium_rectangle'); }
    }

    title() {
      if (__guard__(this.get('name'), x => x.length)) {
        return this.get('name');
      } else {
        return this.formatArtistText();
      }
    }

    shareTitle() {
      if (this.has('fair_location')) {
        return `${this.get('name')}, ${this.get('fair_location').display} See it on @artsy`;
      } else if (this.has('partner')) {
        return `See \"${this.get('name')}\" at ${this.get('partner').name} on @artsy`;
      } else {
        return `See \"${this.get('name')}\" on @artsy`;
      }
    }

    runningDates() {
      return DateHelpers.timespanInWords(this.get('start_at'), this.get('end_at'));
    }

    date(attr) {
      return moment(this.get(attr));
    }

    isSameYear(date) {
      return date.year() === moment().year();
    }

    dateFormatted(attr, formatString) {
      if (formatString == null) { formatString = 'MMM D'; }
      const date = this.date(attr);
      if (!this.isSameYear(date)) { formatString += ', YYYY'; }
      return date.format(formatString);
    }

    location() {
      if (this.has('location')) {
        return new PartnerLocation(this.get('location'));
      } else if (this.has('fair_location')) {
        return new FairLocation(this.get('fair_location'));
      } else {
        return null;
      }
    }

    partnerName() {
      return this.related().partner.get('name');
    }

    partnerHref() {
      if (this.related().partner.get('default_profile_public')) {
        return this.related().profile.href();
      }
    }

    fairName() {
      return this.related().fair.get('name');
    }

    // Show json is different in the feed and includes an array of artist's short json
    formatArtists(max) {
      if (max == null) { max = Infinity; }
      if (!this.has('artists')) { return ""; }
      const artists = this.get('artists').map(artist => `<a href='/artist/${artist.id}'>${artist.name}</a>`);
      if ((artists != null ? artists.length : undefined) <= max) {
        return artists.join(', ');
      } else {
        return `${artists.slice(0, +(max-1) + 1 || undefined).join(', ')} and ${artists.slice((max-1)).length - 1} more`;
      }
    }

    artists() {
      return this.related().artists;
    }

    formatCity() {
      return __guard__(__guard__(this.get('location'), x1 => x1.city), x => x.trim());
    }

    formatShowOrFairCity() {
      let city = this.formatCity();
      return city != null ? city : (city = __guard__(__guard__(__guard__(this.get('fair'), x2 => x2.location), x1 => x1.city), x => x.trim()));
    }

    formatStreetAddress() {
      return __guard__(__guard__(this.get('location'), x1 => x1.address), x => x.trim());
    }

    formatFeedItemHeading(max) {
      if (max == null) { max = 5; }
      if (__guard__(this.get('name'), x => x.length) > 0) { return this.get('name'); }
      return this.formatArtists(max);
    }

    formatLeadHeading() {
      const status =
        (() => {
        if (this.running()) { return 'Current';
        } else if (this.upcoming()) { return 'Upcoming';
        } else if (this.closed()) { return 'Past'; }
      })();
      const type = this.get('fair') ? 'fair booth' : 'show';
      return `${status} ${type}`;
    }

    statusLabel() {
      const mapping = {
        running: 'Current',
        upcoming: 'Upcoming',
        closed: 'Past'
      };
      return mapping[this.get('status')];
    }

    fairLocationDisplay() {
      let city = this.formatCity();
      if (city) {
        city = `<i>${city}</i> &ndash; `;
      }
      const display = __guard__(this.get('fair_location'), x => x.display) || '';
      return _.compact([city, display]).join('');
    }

    daySchedules() {
      return __guard__(__guard__(this.location(), x1 => x1.get('day_schedules')), x => x.length) > 0;
    }

    // Takes a day of the week as a string and returns a formatted schedule for a day of the week or closed:
    // { start: 'Monday', hours: '10:30am–7pm' } or { start: 'Tuesday', hours: 'Closed'}
    formatDaySchedule(day) {
      if (this.daySchedules()) {
        if (_.contains(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], day)) {
          let hours;
          const daySchedules = _.where((this.location().get('day_schedules')), {day_of_week: day});
          if (daySchedules.length) {
            hours = [];
            for (let daySchedule of Array.from(daySchedules)) {
              const startHour = moment().hour(daySchedule['start_time'] / 60 / 60);
              const startMinute = moment().minutes(daySchedule['start_time'] / 60);
              const endHour = moment().hour(daySchedule['end_time'] / 60 / 60);
              const endMinute = moment().minutes(daySchedule['end_time'] / 60 );
              hours.push(`${startHour.format('h')}\
${ startMinute.format('mm') === '00' ? '' : startMinute.format(':mm')}\
${startHour.format('a')}–\
${endHour.format('h')}\
${endMinute.format('mm') === '00' ? '' : endMinute.format(':mm')}\
${endHour.format('a')}`
              );
            }
            return {
              start: day,
              hours: hours.join(', ')
            };
          } else {
            return {
              start: day,
              hours: 'Closed'
            };
          }
        }
      }
    }

    // Returns an array of formatted 'day schedule' objects for a 7 day week:
    // [{ start: 'Monday', hours: '10am – 7pm'}, {start: 'Tuesday, hours: 'Closed'}, ... ]
    formatDaySchedules() {
      if (this.daySchedules()) {
        return _.map(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], day => {
          return this.formatDaySchedule(day);
        });
      }
    }

    // returns an array of grouped and formatted 'day schedules' objects in the format:
    // [{ days: 'Monday–Thursday, Sunday', hours: '10am - 7pm' }, { days: 'Friday', hours: '6:30am - 7pm' }]
    formatModalDaySchedules() {
      if (this.daySchedules()) {
        const daysOpen = [this.formatDaySchedules()[0]];
        _.each(this.formatDaySchedules().slice(1), function(daySchedule) {
          if (daySchedule['hours'] === _.last(daysOpen)['hours']) {
            return _.extend(_.last(daysOpen), {end: `${daySchedule['start']}`});
          } else {
            return daysOpen.push({start: daySchedule['start'], hours: daySchedule['hours']});
          }
      });
        return _.chain((daysOpen))
          .groupBy('hours')
          .map(schedule => _.chain(schedule)
          .map(day => ({
          days: day['end'] ? `${day['start']}–${day['end']}` : `${day['start']}`,
          hours: schedule[0]['hours']
        }))
          .reduce(function(memo, iteratee) {
            memo['days'] = memo['days'] + `, ${iteratee['days']}`;
            return memo;}).value()).reject(day_schedule => day_schedule['hours'] === 'Closed')
          .value();
      }
    }

    upcoming() {
      return this.get('status') === 'upcoming';
    }

    running() {
      return this.get('status') === 'running';
    }

    closed() {
      return this.get('status') === 'closed';
    }

    // opens at any time between the previous monday and the next sunday if today is between monday and thursday,
    // if between friday and sunday opens between previous monday and friday of the next week
    openingThisWeek(today) {
      let end;
      if (today == null) { today = moment(); }
      const start = moment(today).startOf('week').startOf('day');
      const startAt = this.startAtDate();
      if (moment(today).day() < 5) {
        end = moment(today).endOf('week').endOf('day');
      } else {
        end = moment(today).endOf('week').add(6, 'days').endOf('day');
      }
      return (start < startAt) && (end > startAt);
    }

    startAtDate() {
      return new Date(this.get('start_at'));
    }

    endAtDate() {
      return new Date(this.get('end_at'));
    }

    // Defaults to 5 days
    isEndingSoon(days, today) {
      if (days == null) { days = 5; }
      if (today == null) { today = moment().startOf('day'); }
      const soon = moment.duration(days, 'days').valueOf();
      const diff = moment(this.endAtDate()).diff(today);
      return (diff <= soon) && (diff >= 0);
    }

    endingIn(today) {
      if (today == null) { today = moment().startOf('day'); }
      const days = moment(this.get('end_at')).diff(today, 'days');
      if (days === 0) { return 'today'; } else { return `in ${days} day${days === 1 ? '' : 's'}`; }
    }

    isOpeningToday(today) {
      if (today == null) { today = moment().startOf('day'); }
      return moment(this.get('start_at')).diff(today, 'days') === 0;
    }

    performers() {
      return Array.from(this.artists().models).map((artist) => artist.toJSONLDShort());
    }

    toJSONLD() {
      if (this.get('location')) {
        this.get('location').name = this.partnerName();
      }

      return compactObject({
        "@context": "http://schema.org",
        "@type": "Event",
        name: this.title(),
        image: this.metaImageUrl(),
        url: `${sd.APP_URL}${this.href()}`,
        startDate: this.startAtDate().toISOString(),
        endDate: this.endAtDate().toISOString(),
        location: __guard__(this.location(), x => x.toJSONLD()),
        performer: this.performers()
      });
    }

    isSolo() {
      return __guard__(this.get('artists'), x => x.length) === 1;
    }

    isGroup() {
      return !this.isSolo();
    }

    isFairBooth() {
      return this.has('fair');
    }

    isOnlineExclusive() {
      return !this.has('location') && !this.isFairBooth() && !this.has('partner_city');
    }

    contextualLabel(name) {
      const type = this.isFairBooth() ?
        'Fair Booth'
      : this.isSolo() ?
        'Solo Show'
      :
        'Group Show';
      if ((name != null) && (this.isGroup() || this.isFairBooth())) {
        return `${type} including ${name}`;
      } else {
        return type;
      }
    }
  };
  _PartnerShow.initClass();
  return _PartnerShow;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const PartnerShow = _PartnerShow
