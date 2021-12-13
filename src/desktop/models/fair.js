/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS104: Avoid inline assignments
 * DS202: Simplify dynamic range loops
 * DS204: Change includes calls to have a more natural evaluation order
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sd = require("sharify").data
const _ = require("underscore")
const _s = require("underscore.string")
const Backbone = require("backbone")
const { Image, Markdown } = require("@artsy/backbone-mixins")
const { PartnerLocation } = require("./partner_location")
const { OrderedSets } = require("../collections/ordered_sets")
const { Profiles } = require("../collections/profiles")
const DateHelpers = require("../components/util/date_helpers.coffee")
const { Clock } = require("./mixins/clock")
const moment = require("moment")
const { FilterSuggest } = require("./filter_suggest")
const deslugify = require("../components/deslugify/index.coffee")
const { FairRelations } = require("./mixins/relations/fair")
const { MetaOverrides } = require("./mixins/meta_overrides")

const DEFAULT_CACHE_TIME = 60

class FairSearchResult extends Backbone.Model {
  constructor(href, namespace) {
    super()
    this.href = href
    this.namespace = namespace
  }

  href() {
    if (
      this.namespace === "show" &&
      __guard__(this.get("partner_show_ids"), x => x[0])
    ) {
      return `/show/${this.get("partner_show_ids")[0]}`
    } else {
      return `${this.href}/browse/${this.namespace}/${this.get("id")}`
    }
  }

  displayName() {
    return this.get("name")
  }

  imageUrl() {
    let url = `${sd.API_URL}/api/v1/profile/${this.get(
      "default_profile_id"
    )}/image`
    if (sd.ARTSY_XAPP_TOKEN != null) {
      url = url + `?xapp_token=${sd.ARTSY_XAPP_TOKEN}`
    }
    return url
  }
}

class FairSearchResults extends Profiles {
  // comparator: (model) -> model.get('sortable_id')
  groupByColumns(columnCount) {
    if (columnCount == null) {
      columnCount = 3
    }
    const itemsPerColumn = Math.ceil(this.length / 3)
    const columns = []
    for (
      let n = 0, end = columnCount, asc = 0 <= end;
      asc ? n < end : n > end;
      asc ? n++ : n--
    ) {
      columns.push(
        this.models.slice(
          n * itemsPerColumn,
          +((n + 1) * itemsPerColumn - 1) + 1 || undefined
        )
      )
    }
    return columns
  }
}
FairSearchResults.prototype.model = FairSearchResult

export class Fair extends Backbone.Model {
  constructor(...args) {
    super(...args)
  }
  static initClass() {
    _.extend(this.prototype, FairRelations)
    _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL))
    _.extend(this.prototype, Markdown)
    _.extend(this.prototype, Clock)
    _.extend(this.prototype, MetaOverrides)

    this.prototype.urlRoot = `${sd.API_URL}/api/v1/fair`
  }

  href() {
    return `/fair/${this.get("id")}`
  }

  profileId() {
    return (
      this.get("default_profile_id") ||
      __guard__(this.get("organizer"), x => x.profile_id)
    )
  }

  fairOrgHref() {
    return `/${__guard__(
      this.get("organizer"),
      x => x.profile_id
    )}/${this.formatYear()}`
  }

  hasImage(version) {
    let needle
    if (version == null) {
      version = "wide"
    }
    return (
      (needle = version),
      Array.from(this.get("image_versions") || []).includes(needle)
    )
  }

  location() {
    if (this.get("location")) {
      return new PartnerLocation(this.get("location"))
    }
  }

  profileImage(version) {
    if (version == null) {
      version = "square140"
    }
    let url = `${sd.API_URL}/api/v1/profile/${this.get(
      "default_profile_id"
    )}/image/${version}`
    if (sd.ARTSY_XAPP_TOKEN != null) {
      url = `${url}?xapp_token=${sd.ARTSY_XAPP_TOKEN}`
    }
    return url
  }

  hasOpened() {
    return moment().isAfter(this.get("start_at"))
  }

  formatLocation() {
    return __guard__(this.location(), x => x.get("city"))
  }

  formatYear() {
    return moment(this.get("start_at")).year()
  }

  formatDates() {
    return DateHelpers.timespanInWords(this.get("start_at"), this.get("end_at"))
  }

  bannerSize() {
    const sizes = {
      "x-large": 1,
      large: 2,
      medium: 3,
      small: 4,
      "x-small": 5,
    }
    return sizes[this.get("banner_size")]
  }

  fetchExhibitors(options) {
    const galleries = this.aToZCollection("show", "partner")
    return galleries.fetchUntilEnd({
      url: `${this.url()}/partners`,
      data: {
        private_partner: false,
      },
      cache: true,
      cacheTime: DEFAULT_CACHE_TIME,
      success() {
        const aToZGroup = galleries.groupByAlphaWithColumns(3)
        return options != null
          ? options.success(aToZGroup, galleries)
          : undefined
      },
      error() {
        return options != null ? options.error() : undefined
      },
    })
  }

  fetchArtists(options) {
    if (options == null) {
      options = {}
    }
    const artists = this.aToZCollection("artist")
    return artists.fetchUntilEnd({
      url: `${this.url()}/artists`,
      cache: true,
      cacheTime: DEFAULT_CACHE_TIME,
      success() {
        const aToZGroup = artists.groupByAlphaWithColumns(3)
        return options.success(aToZGroup, artists)
      },
      error: options.error,
    })
  }

  fetchSections(options) {
    const sections = new Backbone.Collection()
    return sections.fetch(
      _.extend(options, {
        cache: true,
        cacheTime: DEFAULT_CACHE_TIME,
        url: `${this.url()}/sections`,
      })
    )
  }

  fetchPrimarySets(options) {
    const orderedSets = new OrderedSets()
    return orderedSets
      .fetchItemsByOwner("Fair", this.get("id"), {
        cache: options.cache,
        cacheTime: options.cacheTime,
      })
      .done(function () {
        for (let set of Array.from(orderedSets.models)) {
          const items = set
            .get("items")
            .filter(item => item.get("display_on_desktop"))
          set.get("items").reset(items)
        }
        return options.success(orderedSets)
      })
  }

  // Custom A-to-Z-collection for fair urls
  aToZCollection(namespace) {
    return new FairSearchResults(this.href(), namespace)
  }

  fetchShowForPartner(partnerId, options) {
    const shows = new Backbone.Collection()
    shows.url = `${this.url()}/shows`
    return shows.fetch({
      data: {
        partner: partnerId,
      },
      success(shows) {
        if (
          __guard__(
            __guard__(shows.models != null ? shows.models[0] : undefined, x1 =>
              x1.get("results")
            ),
            x => x[0]
          )
        ) {
          return options.success(shows.models[0].get("results")[0])
        } else {
          return options.error()
        }
      },
      error: options.error,
    })
  }

  itemsToColumns(items, numberOfColumns) {
    if (numberOfColumns == null) {
      numberOfColumns = 2
    }
    const maxRows = Math.ceil(items.length / numberOfColumns)
    return __range__(0, numberOfColumns, false).map(i =>
      items.slice(i * maxRows, (i + 1) * maxRows)
    )
  }

  filteredSearchColumns(filterdSearchOptions, numberOfColumns, key, namespace) {
    if (numberOfColumns == null) {
      numberOfColumns = 2
    }
    if (key == null) {
      key = "related_gene"
    }
    if (namespace == null) {
      namespace = "artworks"
    }
    const href = this.href()
    const items = (() => {
      const result = []
      for (let item of Array.from(_.keys(filterdSearchOptions.get(key)))) {
        const actualName = filterdSearchOptions.get(key)[item]["name"]
        const name = actualName || deslugify(item)
        result.push({
          name,
          href: `${href}/browse/${namespace}?${key}=${item}`,
        })
      }
      return result
    })()
    return this.itemsToColumns(items, numberOfColumns)
  }

  // Fetches all of the data necessary to render the initial fair page and returns a
  // giant hash full of those models/az-groups/etc.
  //
  // The hash looks like this:
  //   {
  //     fair: Fair,
  //     profile: Profile
  //     filterSuggest: new FilterSuggest().fetch
  //     filteredSearchOptions: this.filterSuggest
  //     filteredSearchColumns: fair.filteredSearchColumns
  //     sections: fair.fetchSections
  //     galleries: fair.fetchExhibitors
  //     exhibitorsCount: this.galleries.length
  //     exhibitorsAToZGroup: fair.fetchExhibitors
  //     artistsAToZGroup: fair.fetchArtists
  // }
  //
  // @param {Object} options Backbone-like options that calls success with (data)

  fetchOverviewData(options) {
    return this.fetch({
      error: options.error,
      success: () => {
        // Initialize the data hash with the models/collections that can be fetched in parallel
        const data = {
          fair: this,
          filterSuggest: new FilterSuggest({ id: `fair/${this.get("id")}` }),
          sections: null,
          exhibitorsAToZGroup: null,
          artistsAToZGroup: null,
          galleries: null,
        }

        // Setup parallel callback
        const after = _.after(3, () => {
          return options.success(
            _.extend(data, {
              coverImage: this.get("profile").coverImage(),
              exhibitorsCount: data.galleries.length,
            })
          )
        })

        this.fetchSections({
          error: options.error,
          success: x => {
            data.sections = x
            return after()
          },
        })
        this.fetchExhibitors({
          error: options.error,
          success: (x, y) => {
            data.exhibitorsAToZGroup = x
            data.galleries = y
            return after()
          },
        })
        return this.fetchArtists({
          error: options.error,
          success: x => {
            data.artistsAToZGroup = x
            return after()
          },
        })
      },
    })
  }

  isEligible() {
    return (
      this.get("has_full_feature") &&
      this.get("published") &&
      this.related().profile.get("published")
    )
  }

  isEventuallyEligible() {
    return (
      this.get("has_full_feature") &&
      this.get("published") &&
      !this.related().profile.get("published")
    )
  }

  isNotOver() {
    return !this.isOver()
  }

  isOver() {
    const endOfFair = moment.utc(this.get("end_at")).endOf("day")
    const now = moment()
    return now.isAfter(endOfFair)
  }

  isCurrent() {
    return this.isEligible() && this.isNotOver()
  }

  isUpcoming() {
    return this.isEventuallyEligible() && this.isNotOver()
  }

  isPast() {
    return this.isEligible() && this.isOver()
  }

  nameSansYear() {
    return _s.rtrim(this.get("name"), /\s[0-9]/)
  }
}
Fair.initClass()
export default Fair

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}

function __range__(left, right, inclusive) {
  let range = []
  let ascending = left < right
  let end = !inclusive ? right : ascending ? right + 1 : right - 1
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i)
  }
  return range
}
