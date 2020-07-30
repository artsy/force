/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const fs = require("fs")
const Profile = require("../../../models/profile")
const { fabricate } = require("@artsy/antigravity")
const { resolve } = require("path")
const sd = require("sharify").data

const render = function (template) {
  const filename = resolve(__dirname, template)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Main layout template", function () {
  it("includes the sharify script", () =>
    render("../templates/index.jade")({
      sd: { BROWSER: {}, CURRENT_PATH: "/" },
      sharify: {
        script() {
          return "foobar"
        },
      },
      asset(p) {
        return p
      },
    }).should.containEql("/assets/analytics.js"))

  it("excludes analytics for headless browsers", () =>
    render("../templates/index.jade")({
      sd: { BROWSER: { family: "Other" }, CURRENT_PATH: "/" },
      sharify: {
        script() {
          return "foobar"
        },
      },
      asset(p) {
        return p
      },
    }).should.not.containEql("/assets/analytics.js"))

  it("renders user agent, user type, and lab features as a data attribute", function () {
    const html = render("../templates/index.jade")({
      sd: { CURRENT_USER: { lab_features: ["microsite"], type: "Admin" } },
      asset(p) {
        return p
      },
      userAgent: "foo",
    })
    html.should.containEql('data-lab-features="microsite"')
    html.should.containEql('data-useragent="foo"')
    return html.should.containEql('data-user-type="Admin"')
  })

  it("can render the page when CURRENT_USER is missing", () =>
    render("../templates/index.jade")({
      sd: {},
      asset(p) {
        return p
      },
    }).should.containEql("<html"))

  it("can render the page when attrs are missing from CURRENT_USER", () =>
    render("../templates/index.jade")({
      sd: { CURRENT_USER: {} },
      asset(p) {
        return p
      },
    }).should.containEql("<html"))

  it("Does not reCAPTCHA script if RECAPTCHA_KEY is missing", () =>
    render("../templates/index.jade")({
      sd: {},
      asset(p) {
        return p
      },
    }).should.not.containEql('id="google-recaptcha"'))

  it("Does not reCAPTCHA script if is EIGEN", () =>
    render("../templates/index.jade")({
      sd: { EIGEN: true, RECAPTCHA_KEY: sd.RECAPTCHA_KEY },
      asset(p) {
        return p
      },
    }).should.not.containEql('id="google-recaptcha"'))

  return it("loads reCAPTCHA script if RECAPTCHA_KEY is present", () =>
    render("../templates/index.jade")({
      sd,
      asset(p) {
        return p
      },
    }).should.containEql('id="google-recaptcha"'))
})

describe("Head template", () =>
  describe("IS_RESPONSIVE", () =>
    it("renders whether or not there is a user agent", () =>
      render("../templates/head.jade")({
        sd: { IS_RESPONSIVE: true },
        options: { marketo: true },
        asset() {},
      }))))
