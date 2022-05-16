/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Artwork
const _ = require("underscore")
const _s = require("underscore.string")
const sd = require("sharify").data
const Backbone = require("backbone")
const { Edition } = require("./edition")
const { AdditionalImage } = require("./additional_image")
const { compactObject } = require("./mixins/compact_object")
const { Dimensions, Markdown } = require("@artsy/backbone-mixins")
const { ArtworkRelations } = require("./mixins/relations/artwork")

export default _Artwork = (function () {
  _Artwork = class Artwork extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Dimensions)
      _.extend(this.prototype, Markdown)
      _.extend(this.prototype, ArtworkRelations)
    }

    urlRoot() {
      return `${sd.API_URL}/api/v1/artwork`
    }

    bidSuccessUrl() {
      return `${this.href()}/confirm-bid`
    }

    initialize() {
      const { Articles } = require("../collections/articles")
      this.relatedArticles = new Articles()
      return (this.relatedArticles.url += `?artwork_id=${this.get(
        "_id"
      )}&published=true`)
    }

    parse(response, options) {
      this.editions = new Backbone.Collection(
        response != null ? response.edition_sets : undefined,
        { model: Edition }
      )
      return response
    }

    defaultImage() {
      return this.related().images.default() || new AdditionalImage()
    }

    defaultImageUrl(version) {
      if (version == null) {
        version = "medium"
      }
      return this.defaultImage().imageUrl(version)
    }

    isSaved(artworkCollection) {
      return artworkCollection && artworkCollection.isSaved(this)
    }

    // Can the user download the default image
    //
    // return {Boolean}
    isDownloadable(user) {
      return this.defaultImage().isDownloadable(user)
    }

    downloadableFilename() {
      return _s.slugify(this.toOneLine()) + ".jpg"
    }

    downloadableUrl(user) {
      if (user != null ? user.isTeam() : undefined) {
        return `${this.url()}/image/${this.defaultImage().id}/original.jpg`
      } else {
        return this.defaultImageUrl("larger")
      }
    }

    // Can we display a price?
    //
    // return {Boolean}
    isPriceDisplayable() {
      return (
        this.has("price") &&
        !this.isMultipleEditions() &&
        (this.get("inquireable") || this.get("sold")) &&
        !this.isUnavailableButInquireable() &&
        this.get("sale_message") !== "Contact For Price"
      )
    }

    // Should we render a full set of editions,
    // as opposed to a single string? (See: #editionStatus)
    //
    // return {Boolean}
    isMultipleEditions() {
      return __guard__(this.get("edition_sets"), x => x.length) > 1
    }

    // Outputs the [height, width, depth || height, width || diameter] in decimal/cm
    //
    // return {Array}
    normalizedDimensions() {
      return _.map(
        this.dimensions({ metric: "cm", format: "decimal" })
          .replace("cm", "")
          .split(" × "),
        parseFloat
      )
    }

    // Is any side larger than 1524 cm?
    //
    // return {Boolean}
    tooBig() {
      return _.any(this.normalizedDimensions(), x => x > 1524)
    }

    // Is the work two-dimensional and can be
    // used in conjunction with 'View in Room'?
    //
    // return {Boolean}
    isHangable() {
      if (
        __guard__(this.get("category"), x =>
          x.match(/sculpture|installation|design/i)
        )
      ) {
        return false
      }
      if (this.hasDimension("depth")) {
        return false
      }
      if (this.hasDimension("diameter")) {
        return false
      }
      if (
        this.hasDimension("width") &&
        this.hasDimension("height") &&
        !this.tooBig()
      ) {
        return true
      }
      return false
    }

    // Should we include a form or button to contact the partner?
    //
    isContactable() {
      if (this.get("inquireable") || this.get("is_inquireable")) {
        return true
      }
      return this.isArtworkContactable()
    }

    // Independent of a related sale context: is the work contactable
    isArtworkContactable() {
      return (
        this.get("forsale") && this.has("partner") && !this.get("acquireable")
      )
    }

    // The work is not for sale but a buyer may be interested
    // in related works
    //
    // return {Boolean}
    isUnavailableButInquireable() {
      return (
        !this.get("forsale") && this.get("inquireable") && !this.get("sold")
      )
    }

    isEditionAcquireable(edition) {
      return (
        edition.get("forsale") &&
        edition.get("acquireable") &&
        this.get("acquireable")
      )
    }

    // Assuming there is something *vaguely* numeric here
    // this will return true
    //
    // return {Boolean}
    hasDimension(attr) {
      return parseFloat(this.get(attr)) > 0
    }

    // Can we show more info
    //
    // return {Boolean}
    hasMoreInfo() {
      return (
        !_.isEmpty(this.get("blurb")) ||
        !_.isEmpty(this.get("provenance")) ||
        !_.isEmpty(this.get("exhibition_history")) ||
        !_.isEmpty(this.get("signature")) ||
        !_.isEmpty(this.get("additional_information")) ||
        !_.isEmpty(this.get("literature"))
      )
    }

    contactLabel() {
      if (__guard__(this.get("partner"), x => x.type) === "Gallery") {
        return "gallery"
      } else {
        return "seller"
      }
    }

    hasCollectingInstitution() {
      return __guard__(this.get("collecting_institution"), x => x.length) > 0
    }

    partnerName() {
      if (this.hasCollectingInstitution()) {
        return this.get("collecting_institution")
      } else if (this.has("partner")) {
        return this.get("partner").name
      } else {
        return ""
      }
    }

    priceLabel() {
      if (this.get("sold")) {
        return "Sold"
      } else {
        return "Price:"
      }
    }

    // If the price is hidden, contact for price.
    // Fallback on the sale message as well,
    // sometimes this will be 'Contact For Price'
    // without the price_hidden attribute being set
    //
    // return {String}
    priceDisplay() {
      if (this.get("availability") === "for sale" && this.get("price_hidden")) {
        return "Contact For Price"
      } else {
        return (
          this.get("price") ||
          (this.get("sale_message") !== "Sold"
            ? this.get("sale_message")
            : undefined)
        )
      }
    }

    inquiryMicroCopy() {
      if (this.isUnavailableButInquireable()) {
        return "Interested in related works?"
      } else if (this.get("acquireable")) {
        return "Questions about this work?"
      }
    }

    artworkPageSaleMessage() {
      if (this.isUnavailableButInquireable()) {
        return "Work is Not for Sale"
      } else {
        return this.get("sale_message")
      }
    }

    limitedFairPartnershipMessage() {
      return `${this.partnerName()} is an art fair exhibitor, but not an Artsy partner.`
    }

    // For edition sets larger than 1 we render the full list,
    // otherwise this string is displayed
    //
    // return {String}
    editionStatus() {
      if (this.get("unique")) {
        return "Unique"
      } else if (
        (this.editions != null ? this.editions.length : undefined) === 1
      ) {
        return this.editions.first().get("editions")
      }
    }

    href() {
      return `/artwork/${this.id}`
    }

    getTitle() {
      if (this.get("title")) {
        return this.get("title")
      } else {
        return "(Untitled)"
      }
    }

    titleAndYear() {
      return _.compact([
        this.get("title") != null && this.get("title").length > 0
          ? `<em>${this.get("title")}</em>`
          : "",
        this.get("date"),
      ]).join(", ")
    }

    toAltText() {
      return _.compact([
        __guard__(this.related().artist, x => x.get("name")),
        this.get("title") ? `, '${this.get("title")},' ` : undefined,
        this.get("date") ? `${this.get("date")}` : undefined,
        this.get("partner")
          ? `, ${__guard__(this.get("partner"), x1 => x1.name)}`
          : undefined,
      ]).join("")
    }

    toTitleWithDate() {
      return _.compact([
        this.get("title"),
        this.get("date") ? `(${this.get("date")})` : undefined,
      ]).join(" ")
    }

    toTitleWithDateForSale() {
      return _.compact([
        this.toTitleWithDate(),
        this.get("forsale") ? "Available for Sale" : undefined,
      ]).join(", ")
    }

    toPageTitle() {
      return _.compact([
        this.artistsNames(),
        this.toTitleWithDateForSale(),
        "Artsy",
      ]).join(" | ")
    }

    // same as .to_s in Gravity
    toOneLine() {
      return _.compact([
        this.related().artist.get("name"),
        this.toTitleWithDate(),
      ]).join(" ")
    }

    titleByArtist() {
      return _.compact([
        this.getTitle(),
        this.related().artist.get("name"),
      ]).join(" by ")
    }

    partnerDescription() {
      if (!__guard__(this.get("partner"), x => x.name)) {
        return undefined
      }
      if (this.get("forsale")) {
        return `Available for sale from ${this.get("partner").name}`
      } else {
        return `From ${this.get("partner").name}`
      }
    }

    // for meta descriptions
    toPageDescription() {
      return _.compact([
        this.partnerDescription(),
        this.related().artist.get("name"),
        this.toTitleWithDate(),
        this.get("medium"),
        this.dimensions(),
      ]).join(", ")
    }

    saleMessage() {
      if (this.get("availability_hidden")) {
        return
      }
      if (this.get("sale_message") === "Contact For Price") {
        return
      }
      if (
        this.get("availability") === "not for sale" ||
        this.get("availability") === "permanent collection"
      ) {
        return
      }
      if (this.get("availability") === "on hold") {
        if (this.get("price")) {
          return `${this.get("price")}, on hold`
        }
        return "On hold"
      }

      if (__guard__(this.get("sale_message"), x => x.indexOf("Sold")) > -1) {
        return "Sold"
      }

      if (this.get("availability") === "on loan") {
        return "On loan"
      }

      return this.get("sale_message")
    }

    availabilityMessage() {
      if (this.get("availability_hidden")) {
        return
      }
      if (
        __guard__(this.get("partner"), x => x.type) === "Institutional Seller"
      ) {
        return
      }
      if (
        this.get("availability") === "for sale" ||
        this.get("availability") === "not for sale" ||
        this.get("availability") === "permanent collection"
      ) {
        return
      }
      if (
        __guard__(this.get("availability"), x2 => x2.indexOf("on hold")) > -1
      ) {
        return _.compact(["On hold", this.get("price")]).join(" - ")
      } else {
        return _s(this.get("availability")).capitalize().value()
      }
    }

    noPinAttr() {
      if (this.get("can_share_image")) {
        return undefined
      } else {
        return "nopin"
      }
    }

    showMoreInfo() {
      return !_.isFunction(this.saleMessage)
    }

    showActionsList(user) {
      return (
        this.get("website") || this.isDownloadable() || (user && user.isTeam())
      )
    }

    toJSONLD() {
      const creator = compactObject({
        "@type": "Person",
        name: this.related().artist.get("name"),
        sameAs: `${sd.APP_URL}/artist/${this.related().artist.get("id")}`,
      })

      return compactObject({
        "@context": "http://schema.org",
        "@type": "CreativeWork",
        image: this.defaultImageUrl("large"),
        name: this.getTitle(),
        url: `${sd.APP_URL}${this.href()}`,
        creator,
        depth: this.get("depth"),
        width: this.get("width"),
        height: this.get("height"),
        duration: this.get("duration"),
        medium: this.get("medium"),
        description: this.get("blurb"),
      })
    }

    artistName() {
      return (
        this.related().artist.get("name") ||
        _.compact(this.related().artists.pluck("name"))[0] ||
        ""
      )
    }

    artistsNames() {
      const names = _.compact(this.related().artists.pluck("name"))
      if (!(names.length > 1)) {
        return this.artistName()
      }
      names.push(names.splice(-2).join(" and "))
      return names.join(", ")
    }

    // Returns the best image url it can find for the index and size.
    //
    // param {String} version
    // param {Number} i
    // return {String}
    imageUrl(version, i) {
      let img, v
      if (version == null) {
        version = "larger"
      }
      const imgs = this.get("images")
      if (!(imgs != null ? imgs.length : undefined)) {
        return
      }
      if (i) {
        img =
          _.findWhere(imgs, {
            position: i,
          }) ||
          imgs[i] ||
          imgs[0]
      } else {
        img =
          _.findWhere(imgs, {
            is_default: true,
          }) || imgs[0]
      }
      if (!img) {
        return
      }
      let url = img.image_urls != null ? img.image_urls[version] : undefined
      if (
        (v =
          img.image_versions != null ? img.image_versions[version] : undefined)
      ) {
        if (!url) {
          url =
            img.image_url != null
              ? img.image_url.replace(":version", v)
              : undefined
        }
      }
      if (!url) {
        url = _.values(img.image_urls)[0]
      }
      if (!url) {
        url =
          img.image_url != null
            ? img.image_url.replace(":version", _.first(img.image_versions))
            : undefined
      }
      return url
    }

    // Are there comparable artworks;
    // such that we can display a link to auction results
    //
    // return {Boolean}
    isComparable() {
      return (
        this.get("comparables_count") > 0 &&
        this.get("category") !== "Architecture"
      )
    }
  }
  _Artwork.initClass()
  return _Artwork
})()

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
export const Artwork = _Artwork
