/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const sinon = require("sinon")
const Partner = require("../../../../models/partner.coffee")
const Profile = require("../../../../models/profile.coffee")
const Contact = require("../../client/contact.coffee")
const benv = require("benv")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("Contact page", function () {
  beforeEach(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
      })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      return benv.render(
        resolve(__dirname, "../../templates/index.jade"),
        {
          profile: new Profile(fabricate("partner_profile")),
          sd: { PROFILE: fabricate("partner_profile") },
          asset() {},
          params: {},
        },
        () => done()
      )
    })
  )

  afterEach(function () {
    Backbone.sync.restore()
    return benv.teardown()
  })

  return describe("#renderAdditionalInfo", () =>
    it("renders additional info", function () {
      const view = new Contact({
        profile: new Profile(fabricate("partner_profile")),
        partner: new Partner(fabricate("partner", { vat_number: "ABC123" })),
        el: $("body"),
      })
      view.renderAdditionalInfo()
      return $(view.el)
        .html()
        .should.containEql(
          '<div class="partner2-vat-info">VAT ID #: ABC123</div>'
        )
    }))
})
