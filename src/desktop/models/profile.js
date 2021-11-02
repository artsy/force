/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Profile;
const _ = require('underscore');
const _s = require('underscore.string');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { CoverImage } = require('./cover_image');
const { Icon } = require('./icon');
const { Artworks } = require('../collections/artworks');
const { Markdown } = require('@artsy/backbone-mixins');
const { compactObject } = require('./mixins/compact_object');
const { ProfileRelations } = require('./mixins/relations/profile');

export default (_Profile = (function() {
  _Profile = class Profile extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, ProfileRelations);
      _.extend(this.prototype, Markdown);

      this.prototype.GALLERY_OWNER_TYPES = ['PartnerGallery'];
      this.prototype.USER_OWNER_TYPES = [ 'User', 'Admin' ];
      this.prototype.INSTITUTION_OWNER_TYPES = [
        'PartnerBrand',
        'PartnerInstitution',
        'PartnerInstitutionalSeller'
      ];

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/profile`;



      //
      // Logic for page titles and description
      //

      // TITLE
      this.prototype.fairTitle = {
        forYou: "Your Personal Fair Guide",
        posts: "Highlighted Articles",
        info: "Visitor Information",
        search: "Search",
        browse: "Browse",
        favorites: "Favorites",
        follows: "Following"
      };

      this.prototype.partnerTitle = {
        overview: null, // Conditional
        contact: "Contact Information",
        about: "Visitor Information",
        collection: "Collection",
        shop: "Shop",
        shows: "Shows",
        artists: "Artists",
        artist: null,  // Canonical redirects to artist page
        posts: "Posts"
      };


      // DESCRIPTION
      this.prototype.partnerDescription = {
        overview: null, // Conditional
        contact: "Contact information including a map of locations with phone numbers for",
        about: "Visitor information including location and phone number for",
        collection: "Artworks in the collection of",
        shop: null,
        shows: "List of current, upcoming and past shows at",
        artists: "List of artists represented by",
        artist: null,  // Canonical redirects to artist page
        posts: "Articles about and created by"
      };

      this.prototype.fairDescription = {
        forYou: null, // Private
        posts: "Featured articles about the fair",
        info: "Visitor information including location, tickets and phone number for the fair",
        search: null, // Hopefully not indexed
        browse: "Browse artworks at the fair by subject matter, style/technique, movement, price, and booth",
        favorites: null, // Private
        follows: null
      };
    }

    icon() {
      return new Icon(_.extend(this.get('icon') || {}, {profileId: this.get('id')}));
    }

    iconImageUrl() {
      return this.icon().imageUrl();
    }

    hasIconImage() {
      return this.iconImageUrl() !== Icon.DefaultUserIconUrl;
    }

    coverImage() {
      return new CoverImage(this.get('cover_image'), {profileId: this.get('id')});
    }

    bestAvailableImage() {
      if (this.has('cover_image')) {
        return this.coverImage().imageUrl();
      } else {
        // For partners, this should never happen
        return this.iconImageUrl();
      }
    }

    alphaSortKey() {
      return this.displayName();
    }

    href() {
      return `/${this.get('id')}`;
    }

    displayName() {
      return this.related().owner.get('name');
    }

    defaultIconInitials() {
      if (this.isPartner()) { return __guard__(this.related().owner, x => x.defaultIconInitials()); } else { return ''; }
    }

    getFormattedWebsite() {
      if (this.has('website')) {
        return this.get('website').replace('http://', '').replace('https://', '');
      }
    }

    isUser() { return _.contains(this.USER_OWNER_TYPES, this.get('owner_type')); }
    isInstitution() { return _.contains(this.INSTITUTION_OWNER_TYPES, this.get('owner_type')); }
    isGallery() { return _.contains(this.GALLERY_OWNER_TYPES, this.get('owner_type')); }
    isPartner() { return this.isGallery() || this.isInstitution(); }
    isFairOrganizer() { return this.get('owner_type') === 'FairOrganizer'; }
    isFairOrOrganizer() { return this.isFairOrganizer() || this.isFair(); }
    isFair() { return this.get('owner_type') === 'Fair'; }

    // Get either the default fair id (from FairOrganizer)
    // or the id (from Fair)
    fairOwnerId() {
      return this.related().owner.get('default_fair_id') || this.related().owner.get('id');
    }

    profileType() {
      if (this.isUser()) {
        return 'Person';
      } else if (this.isInstitution()) {
        return 'Institution';
      } else if (this.isGallery()) {
        return 'Gallery';
      } else if (this.isFair()) {
        return 'Fair';
      } else if (this.isFairOrganizer()) {
        return 'FairOrganizer';
      }
    }

    isUserClass() {
      if (this.isUser() && (this.get('default_icon_version') === 'circle')) {
        return 'is-user';
      } else {
        return 'is-partner';
      }
    }

    isMe() {
      if (this.has('isCurrentUser')) { return this.get('isCurrentUser'); }
      this.set({
        isCurrentUser: this.get('id') === (sd.CURRENT_USER != null ? sd.CURRENT_USER.default_profile_id : undefined)});
      return this.get('isCurrentUser');
    }

    formatFollowText() {
      if (!this.has('follows_count')) { return; }
      const follows = this.get('follows_count');
      return `${_s.numberFormat(follows)} Follower${follows === 1 ? '' : 's'}`;
    }

    isCurrentProfile() {
      return (sd.CURRENT_USER != null ? sd.CURRENT_USER.default_profile_id : undefined) === this.get('id');
    }

    fetchFavorites(options) {
      const favorites = new Artworks;
      favorites.url = `${sd.API_URL}/api/v1/collection/saved-artwork/artworks`;
      favorites.params = _.extend({
        sort: '-position',
        user_id: this.related().owner.get('id'),
        private: true,
        page: 1
      }, options.data);
      return favorites.fetch(_.extend(options, {data: favorites.params}));
    }

    toJSONLD() {
      return compactObject({
        "@context": "http://schema.org",
        "@type": this.isUser() ? "Person" : "Organization",
        image: this.iconImageUrl(),
        name: this.displayName(),
        url: `${sd.APP_URL}${this.href()}`
      });
    }

    metaTitle(tab) {
      return _.compact([
        (this.displayName() ? `${this.displayName()}` : "Profile"),
        (this.isPartner() && !this.isFairOrganizer() ? this.partnerMetaTitle(tab) : null),
        (this.isFairOrganizer() ? this.fairMetaTitle(tab) : null),
        "Artsy"
      ]).join(" | ");
    }

    fairMetaTitle(tab) {
      let text;
      if ((text = this.fairTitle[tab])) {
        return text;
      } else {
        return "Fair Info, Artists, and Art for Sale";
      }
    }

    partnerMetaTitle(tab) {
      let text;
      if ((text = this.partnerTitle[tab])) {
        return text;
      } else {
        if (this.isGallery()) { return "Artists, Art for Sale, and Contact Info"; } else { return "Artists, Artworks, and Contact Info"; } // Private
      }
    }

    partnerMetaDescription(tab) {
      let text;
      if ((text = this.partnerDescription[tab])) {
        return [text, this.displayName()].join(' ');
      } else {
        return this.profileMetaDescription();
      }
    }

    fairMetaDescription(tab) {
      let text;
      if ((text = this.fairDescription[tab])) {
        return text;
      } else {
        return this.profileMetaDescription();
      }
    }

    profileMetaDescription() {
      if (this.get('bio')) {
        return this.get('bio');
      } else if (this.isGallery()) {
        return `Explore Artists, Artworks, and Shows from ${this.displayName()} on Artsy`;
      } else {
        if (this.displayName()) { return `${this.displayName()} on Artsy`; } else { return "Profile on Artsy"; }
      }
    }

    metaDescription(tab) {
      if (this.isPartner() && !this.isFairOrganizer()) {
        return this.partnerMetaDescription(tab);
      } else if (this.isFairOrganizer()) {
        return this.fairMetaDescription(tab);
      } else {
        return this.profileMetaDescription();
      }
    }
  };
  _Profile.initClass();
  return _Profile;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Profile = _Profile
