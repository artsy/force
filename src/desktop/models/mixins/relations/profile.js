/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")

export const ProfileRelations = {
  related() {
    let owner
    if (this.__related__ != null) {
      return this.__related__
    }

    if (this.isPartner()) {
      const { Partner } = require("../../partner")
      owner = new Partner(this.get("owner"))
    }

    if (this.isUser()) {
      const { User } = require("../../user")
      owner = new User(this.get("owner"))
    }

    return (this.__related__ = {
      owner:
        owner != null ? owner : (owner = new Backbone.Model(this.get("owner"))),
    })
  },
}
