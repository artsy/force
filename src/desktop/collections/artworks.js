/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS202: Simplify dynamic range loops
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Artworks
const _ = require("underscore")
const _s = require("underscore.string")
const { Artwork } = require("../models/artwork")
const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const { Fetch } = require("@artsy/backbone-mixins")

export default _Artworks = (function () {
  _Artworks = class Artworks extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = Artwork
    }

    initialize(models, options) {
      if (options == null) {
        options = {}
      }
      ;({ artworkCollection: this.artworkCollection } = options)
      return this.on("sync", (a, b, jqXHR) => {
        return (this.totalCount = __guard__(
          jqXHR != null ? jqXHR.xhr : undefined,
          x => x.getResponseHeader("X-Total-Count")
        ))
      })
    }

    // Maps each artwork's images into an array of image { width, height } hashes meant to be
    // passed into fillwidth.
    //
    // @param {Number} maxHeight The max height the image can be

    fillwidthDimensions(maxHeight) {
      const imageWidths = this.map(function (artwork) {
        let image
        if (!(image = artwork.defaultImage())) {
          return null
        }
        const width = Math.round(maxHeight * image.get("aspect_ratio"))
        const height =
          width < maxHeight ? maxHeight : width / image.get("aspect_ratio")
        return { width, height }
      })
      return _.without(imageWidths, null)
    }

    // Groups models in to an array of n arrays where n is the numberOfColumns requested.
    // For a collection of eight artworks
    // [
    //   [artworks.at(0), artworks.at(3), artworks.at(6)]
    //   [artworks.at(1), artworks.at(4), artworks.at(7)]
    //   [artworks.at(2), artworks.at(5)]
    // ]
    //
    // @param {Number} numberOfColumns The number of columns of models to return in an array

    groupByColumnsInOrder(numberOfColumns) {
      let column
      let asc, end
      if (numberOfColumns == null) {
        numberOfColumns = 3
      }
      if (numberOfColumns < 2) {
        return [this.models]
      }
      // Set up the columns to avoid a check in every model pass
      const columns = []
      for (
        column = 0, end = numberOfColumns - 1, asc = 0 <= end;
        asc ? column <= end : column >= end;
        asc ? column++ : column--
      ) {
        columns[column] = []
      }
      // Put models in each column in order
      column = 0
      for (let model of Array.from(this.models)) {
        columns[column].push(model)
        column = column + 1
        if (column === numberOfColumns) {
          column = 0
        }
      }
      return columns
    }

    // Pass in sale_artworks and this will flip it into a collection of artworks with sale info
    // injected into it. Useful for reusing views meant for artworks that have a little bit of
    // sales info along-side such as the artwork_columns component.
    //
    // @param {Collection} saleArtworks Backbone Collection from `/api/v1/sale/:id/sale_artworks`
    // @return The new artworks collection

    static __fromSale__(saleArtworks) {
      return saleArtworks.map(saleArtwork =>
        _.extend(saleArtwork.get("artwork"), {
          sale_artwork: saleArtwork.omit("artwork"),
        })
      )
    }

    static fromSale(saleArtworks) {
      return new Artworks(this.__fromSale__(saleArtworks))
    }

    hasAny(attr) {
      return _.any(_.map(this.pluck(attr), _.negate(_.isEmpty)))
    }

    maxBlurbHeight(displayBlurbs, lineHeight, columnWidth) {
      if (lineHeight == null) {
        lineHeight = 25.5
      }
      if (columnWidth == null) {
        columnWidth = 50
      }
      if (!displayBlurbs) {
        return
      }

      return (
        Math.ceil(
          _.max(
            _.map(
              this.pluck("blurb"),
              blurb =>
                (_s.stripTags(blurb).length / columnWidth) * lineHeight +
                lineHeight
            )
          )
        ) + "px"
      )
    }
  }
  _Artworks.initClass()
  return _Artworks
})()

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
export const Artworks = _Artworks
