/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const InstallShots = require("../../collections/install_shots")

// A WILD API RESPONSE APPEARS
const response = [
  {
    artworks: [],
    artists: [],
    id: "52c501be139b21a7550001e6",
    position: 1,
    caption: null,
    default: false,
    aspect_ratio: 1.34,
    original_height: 2232,
    original_width: 3000,
    image_url:
      "http://static2.artsy.net/partner_show_images/52c501be139b21a7550001e6/27/:version.jpg",
    image_versions: [],
    image_urls: {},
  },
  {
    artworks: [],
    artists: [],
    id: "52c501c5275b24e37a0001e1",
    position: 2,
    caption: null,
    default: false,
    aspect_ratio: 1.5,
    original_height: 2000,
    original_width: 3000,
    image_url:
      "https://d32dm0rphc51dk.cloudfront.net/Ex2z1yt6iCXtA_uFH0bAfQ/:version.jpg",
    image_versions: [
      "featured",
      "general",
      "large",
      "larger",
      "medium",
      "square",
      "tall",
    ],
    image_urls: {
      featured:
        "https://d32dm0rphc51dk.cloudfront.net/Ex2z1yt6iCXtA_uFH0bAfQ/featured.jpg",
      general:
        "https://d32dm0rphc51dk.cloudfront.net/Ex2z1yt6iCXtA_uFH0bAfQ/general.jpg",
      large:
        "https://d32dm0rphc51dk.cloudfront.net/Ex2z1yt6iCXtA_uFH0bAfQ/large.jpg",
      larger:
        "https://d32dm0rphc51dk.cloudfront.net/Ex2z1yt6iCXtA_uFH0bAfQ/larger.jpg",
      medium:
        "https://d32dm0rphc51dk.cloudfront.net/Ex2z1yt6iCXtA_uFH0bAfQ/medium.jpg",
      square:
        "https://d32dm0rphc51dk.cloudfront.net/Ex2z1yt6iCXtA_uFH0bAfQ/square.jpg",
      tall:
        "https://d32dm0rphc51dk.cloudfront.net/Ex2z1yt6iCXtA_uFH0bAfQ/tall.jpg",
    },
  },
  {
    artworks: [],
    artists: [],
    id: "52c501e3cd530eee010001d1",
    position: 3,
    caption: null,
    default: false,
    aspect_ratio: 1.41,
    original_height: 2121,
    original_width: 3000,
    image_url:
      "https://d32dm0rphc51dk.cloudfront.net/3-De7pl-mH9FU78JYmtHmQ/:version.jpg",
    image_versions: [
      "featured",
      "general",
      "large",
      "larger",
      "medium",
      "square",
      "tall",
    ],
    image_urls: {
      featured:
        "https://d32dm0rphc51dk.cloudfront.net/3-De7pl-mH9FU78JYmtHmQ/featured.jpg",
      general:
        "https://d32dm0rphc51dk.cloudfront.net/3-De7pl-mH9FU78JYmtHmQ/general.jpg",
      large:
        "https://d32dm0rphc51dk.cloudfront.net/3-De7pl-mH9FU78JYmtHmQ/large.jpg",
      larger:
        "https://d32dm0rphc51dk.cloudfront.net/3-De7pl-mH9FU78JYmtHmQ/larger.jpg",
      medium:
        "https://d32dm0rphc51dk.cloudfront.net/3-De7pl-mH9FU78JYmtHmQ/medium.jpg",
      square:
        "https://d32dm0rphc51dk.cloudfront.net/3-De7pl-mH9FU78JYmtHmQ/square.jpg",
      tall:
        "https://d32dm0rphc51dk.cloudfront.net/3-De7pl-mH9FU78JYmtHmQ/tall.jpg",
    },
  },
  {
    artworks: [],
    artists: [],
    id: "52c501e79c18db8ea4000172",
    position: 4,
    caption: null,
    default: false,
    aspect_ratio: 1.43,
    original_height: 2096,
    original_width: 3000,
    image_url:
      "https://d32dm0rphc51dk.cloudfront.net/F_uFnffgp0yyJSgkvlGjTA/:version.jpg",
    image_versions: [
      "featured",
      "general",
      "large",
      "larger",
      "medium",
      "square",
      "tall",
    ],
    image_urls: {
      featured:
        "https://d32dm0rphc51dk.cloudfront.net/F_uFnffgp0yyJSgkvlGjTA/featured.jpg",
      general:
        "https://d32dm0rphc51dk.cloudfront.net/F_uFnffgp0yyJSgkvlGjTA/general.jpg",
      large:
        "https://d32dm0rphc51dk.cloudfront.net/F_uFnffgp0yyJSgkvlGjTA/large.jpg",
      larger:
        "https://d32dm0rphc51dk.cloudfront.net/F_uFnffgp0yyJSgkvlGjTA/larger.jpg",
      medium:
        "https://d32dm0rphc51dk.cloudfront.net/F_uFnffgp0yyJSgkvlGjTA/medium.jpg",
      square:
        "https://d32dm0rphc51dk.cloudfront.net/F_uFnffgp0yyJSgkvlGjTA/square.jpg",
      tall:
        "https://d32dm0rphc51dk.cloudfront.net/F_uFnffgp0yyJSgkvlGjTA/tall.jpg",
    },
  },
]

describe("InstallShots", function () {
  before(function () {
    return (this.installShots = new InstallShots(response, { parse: true }))
  })

  it("filters out images without versions", function () {
    this.installShots.should.have.lengthOf(3)
    response.should.have.lengthOf(4)
    return this.installShots
      .pluck("image_versions")
      .should.eql(
        _.times(3, () => [
          "featured",
          "general",
          "large",
          "larger",
          "medium",
          "square",
          "tall",
        ])
      )
  })

  it("is comformtable there are no vertsions, as well", function () {
    this.installShots.reset([{ id: "bad" }, fabricate("show_install_shot")], {
      parse: true,
    })
    return this.installShots.should.have.lengthOf
  })

  return describe("#hasCaptions", () =>
    it("returns true if there is at least one caption", function () {
      this.installShots.hasCaptions().should.be.false()
      this.installShots.first().set("caption", "existy")
      return this.installShots.hasCaptions().should.be.true()
    }))
})
