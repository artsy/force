/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const Introduction = require("../model")
const LoggedOutUser = require("../../../models/logged_out_user")
const Artist = require("../../../models/artist")
const UserInterests = require("../../../collections/user_interests")

describe("Introduction", function () {
  beforeEach(() => sinon.stub(Backbone, "sync").yieldsTo("success"))

  afterEach(() => Backbone.sync.restore())

  return describe("#generate", function () {
    beforeEach(function () {
      return (this.user = new LoggedOutUser(fabricate("user")))
    })

    it("accepts a success callback", function (done) {
      Backbone.sync.restore()
      sinon.stub(Backbone, "sync").yieldsTo("success")
      const introduction = new Introduction()
      return introduction.generate(this.user, null, null, {
        success() {
          return done()
        },
      })
    })

    it("accepts an error callback", function (done) {
      Backbone.sync.restore()
      sinon.stub(Backbone, "sync").yieldsTo("error")
      const introduction = new Introduction()
      return introduction.generate(this.user, null, null, {
        error() {
          return done()
        },
      })
    })

    describe("with userInterests", function () {
      beforeEach(function () {
        this.userInterests = new UserInterests()
        return _.times(5, () =>
          this.userInterests.addInterest(new Artist(fabricate("artist")))
        )
      })

      return it("makes an introduction request for logged out users", function () {
        const introduction = new Introduction()
        introduction.generate(this.user, this.userInterests)
        Backbone.sync.args[0][0].should.equal("create")
        return Backbone.sync.args[0][1].attributes.should.eql({
          name: "Craig Spaeth",
          profession: "engineer",
          collector_level: "5",
          collection: [
            "Pablo Picasso",
            "Pablo Picasso",
            "Pablo Picasso",
            "Pablo Picasso",
            "Pablo Picasso",
          ],
        })
      })
    })

    describe("with user location (and no userInterests)", function () {
      beforeEach(function () {
        return this.user.set({
          location: { city: "New York", country: "United States" },
        })
      })

      return it("makes an introduction request for logged out users", function () {
        const introduction = new Introduction()
        introduction.generate(this.user, null)
        return Backbone.sync.args[0][1].attributes.should.eql({
          name: "Craig Spaeth",
          profession: "engineer",
          collector_level: "5",
          location: {
            city: "New York",
            country: "United States",
            raw: "",
            address: "",
            address_2: "",
            state: "",
            state_code: "",
            postal_code: "",
            coordinates: null,
            summary: "",
          },
        })
      })
    })

    return describe("with attendance", function () {
      beforeEach(function () {
        return (this.attendance = new Backbone.Model({
          name: "The Armory Show",
        }))
      })

      return it("makes an introduction request for logged out users", function () {
        const introduction = new Introduction()
        introduction.generate(this.user, null, this.attendance)
        return Backbone.sync.args[0][1].attributes.should.eql({
          name: "Craig Spaeth",
          profession: "engineer",
          collector_level: "5",
          attending: "The Armory Show",
        })
      })
    })
  })
})
