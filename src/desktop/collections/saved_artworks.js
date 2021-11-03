/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _SavedArtworks
const Backbone = require("backbone")
const { stringify } = require("qs")
const { map, groupBy, toArray, without } = require("underscore")
const { API_URL, CURRENT_USER } = require("sharify").data
const { SavedArtwork } = require("../models/saved_artwork")

const chunk = function (array, size) {
  if (size == null) {
    size = 1
  }
  const chunks = groupBy(array, (x, i) => Math.floor(i / size))
  return toArray(chunks)
}

export default _SavedArtworks = (function () {
  _SavedArtworks = class SavedArtworks extends Backbone.Collection {
    static initClass() {
      this.prototype.model = SavedArtwork

      this.prototype.url = `${API_URL}/api/v1/collection/saved-artwork/artworks`

      this.prototype.chunk = 20
    }

    check(ids) {
      if (CURRENT_USER == null) {
        return
      }
      const these = without(ids, ...Array.from(this.pluck("id")))
      return Promise.all(
        map(chunk(these, this.chunk), artworks => {
          return this.fetch({
            remove: false,
            data: stringify(
              {
                private: true,
                size: this.chunk,
                user_id: CURRENT_USER.id,
                artworks,
              },
              { arrayFormat: "brackets" }
            ),
          })
        })
      )
    }
  }
  _SavedArtworks.initClass()
  return _SavedArtworks
})()
export const SavedArtworks = _SavedArtworks
