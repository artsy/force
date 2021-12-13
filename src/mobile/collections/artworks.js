/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Artworks
const Backbone = require("backbone")
const _ = require("underscore")
const sd = require("sharify").data
const { Fetch } = require("@artsy/backbone-mixins")

export default _Artworks = (function () {
  _Artworks = class Artworks extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(sd.API_URL))
    }

    initialize() {
      return (this.model = require("../models/artwork").Artwork)
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

    // Groups models in to an array of n arrays where n is the numberOfColumns requested.
    // For a collection of eight artworks
    // [
    //   [artworks.at(0), artworks.at(3), artworks.at(6)]
    //   [artworks.at(1), artworks.at(4), artworks.at(7)]
    //   [artworks.at(2), artworks.at(6)]
    // ]
    //
    // @param {Number} numberOfColumns The number of columns of models to return in an array

    groupByColumnsInOrder(numberOfColumns) {
      let column
      let asc, end
      if (numberOfColumns == null) {
        numberOfColumns = 2
      }
      if (numberOfColumns < 2 || this.models.length < 2) {
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
  }
  _Artworks.initClass()
  return _Artworks
})()

export const Artworks = _Artworks