/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("PartnerShowButtons", function () {
  describe("with valid data", function () {
    beforeEach(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
        })
        window.jQuery = $
        Backbone.$ = $
        const PartnerShowButtons = benv.require(
          resolve(__dirname, "../show_buttons")
        )
        PartnerShowButtons.__set__(
          "FollowProfileButton",
          (this.FollowProfileButton = sinon.stub())
        )
        PartnerShowButtons.__set__(
          "ShowInquiryModal",
          (this.ShowInquiryModal = sinon.stub())
        )
        this.view = new PartnerShowButtons({
          el: $("body"),
          model: new Backbone.Model(fabricate("show")),
        })
        return done()
      })
    })

    afterEach(() => benv.teardown())

    describe("#initialize", () =>
      it("creates a follow profile button passsing in options", function () {
        return this.ShowInquiryModal.calledWithNew.should.be.ok()
      }))

    return describe("#contactGallery", () =>
      it("creates a new show inquiry modal", function () {
        this.view.contactGallery()
        return this.ShowInquiryModal.calledWithNew.should.be.ok()
      }))
  })

  return describe("with invalid data", function () {
    beforeEach(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
        })
        Backbone.$ = $
        const PartnerShowButtons = benv.require(
          resolve(__dirname, "../show_buttons")
        )
        PartnerShowButtons.__set__(
          "FollowProfileButton",
          (this.FollowProfileButton = sinon.stub())
        )
        PartnerShowButtons.__set__(
          "ShowInquiryModal",
          (this.ShowInquiryModal = sinon.stub())
        )
        this.view = new PartnerShowButtons({
          el: $("body"),
          model: new Backbone.Model(fabricate("show", { partner: null })),
        })
        return done()
      })
    })

    afterEach(() => benv.teardown())

    describe("#initialize", () =>
      it("creates a follow profile button passsing in options", function () {
        return this.ShowInquiryModal.calledWithNew.should.be.ok()
      }))

    return describe("#contactGallery", () =>
      it("creates a new show inquiry modal", function () {
        this.view.contactGallery()
        return this.ShowInquiryModal.calledWithNew.should.be.ok()
      }))
  })
})
