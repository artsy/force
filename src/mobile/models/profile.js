/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Profile;
const sd = require('sharify').data;
const _ = require('underscore');
const Backbone = require('backbone');
const { CoverImage } = require('./cover_image');
const { Icon } = require('./icon');

const { Markdown } = require('@artsy/backbone-mixins');

export default (_Profile = (function() {
  _Profile = class Profile extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Markdown);
    }

    urlRoot() { return `${sd.API_URL}/api/v1/profile`; }

    href() {
      return `/${this.get('id')}`;
    }

    hasIcon() {
      return this.has('icon') && !_.isUndefined(this.get('icon'));
    }

    hasCover() {
      return this.has('cover_image') && !_.isEmpty(this.get('cover_image') && !_.isUndefined(this.get('cover_image')));
    }

    icon() {
      return new Icon(_.extend(this.get('icon') || {}, {profileId: this.get('id')}));
    }

    iconUrl() {
      return this.icon().imageUrl();
    }

    coverImage() {
      return new CoverImage(this.get('cover_image'), {profileId: this.get('id')});
    }

    coverImageUrl() {
      return this.coverImage().imageUrl('medium');
    }

    bestAvailableImage() {
      if (this.hasCover()) {
        return this.coverImage().imageUrl('medium250x165');
      } else {
        return this.iconUrl();
      }
    }

    initials() {
      let iconInitials;
      const reduceFunction = function(result, name) {
        if (!name[0] || !/\w/.test(name[0])) { return result; }
        return result + name[0];
      };
      return iconInitials = _.reduce(__guard__(this.displayName(), x => x.split(' ')), reduceFunction, '').slice(0, 2);
    }

    displayName() {
      return __guard__(this.get('owner'), x => x.name);
    }

    alphaSortKey() {
      return this.displayName();
    }

    isFairOrganizer() { return this.get('owner_type') === 'FairOrganizer'; }
    isFairOrOrganizer() { return this.isFairOrganizer() || this.isFair(); }
    isFair() { return this.get('owner_type') === 'Fair'; }

    // Get either the default fair id (from FairOrganizer)
    // or the id (from Fair)
    fairOwnerId() {
      return this.get('owner').default_fair_id || this.get('owner').id;
    }

    isGallery() { return this.get('owner_type') === 'PartnerGallery'; }

    isInstitution() {
      const institutionOwnerTypes = [
        'PartnerBrand',
        'PartnerInstitution',
        'PartnerInstitutionalSeller'
      ];
      return _.contains(institutionOwnerTypes, this.get('owner_type'));
    }

    isPartner() { return this.isGallery() || this.isInstitution(); }

    isUser() { return _.contains(['User', 'Admin'], this.get('owner_type')); }
  };
  _Profile.initClass();
  return _Profile;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Profile = _Profile
