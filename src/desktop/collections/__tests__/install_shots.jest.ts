import { times } from "lodash"
import { fabricate } from "@artsy/antigravity"
const { InstallShots } = require("../install_shots")

// A WILD API RESPONSE APPEARS
const response = [
  {
    artists: [],
    artworks: [],
    aspect_ratio: 1.34,
    caption: null,
    default: false,
    id: "52c501be139b21a7550001e6",
    image_url:
      "http://static2.artsy.net/partner_show_images/52c501be139b21a7550001e6/27/:version.jpg",
    image_urls: {},
    image_versions: [],
    original_height: 2232,
    original_width: 3000,
    position: 1,
  },
  {
    artists: [],
    artworks: [],
    aspect_ratio: 1.5,
    caption: null,
    default: false,
    id: "52c501c5275b24e37a0001e1",
    image_url:
      "https://d32dm0rphc51dk.cloudfront.net/Ex2z1yt6iCXtA_uFH0bAfQ/:version.jpg",
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
    image_versions: [
      "featured",
      "general",
      "large",
      "larger",
      "medium",
      "square",
      "tall",
    ],
    original_height: 2000,
    original_width: 3000,
    position: 2,
  },
  {
    artists: [],
    artworks: [],
    aspect_ratio: 1.41,
    caption: null,
    default: false,
    id: "52c501e3cd530eee010001d1",
    image_url:
      "https://d32dm0rphc51dk.cloudfront.net/3-De7pl-mH9FU78JYmtHmQ/:version.jpg",
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
    image_versions: [
      "featured",
      "general",
      "large",
      "larger",
      "medium",
      "square",
      "tall",
    ],
    original_height: 2121,
    original_width: 3000,
    position: 3,
  },
  {
    artists: [],
    artworks: [],
    aspect_ratio: 1.43,
    caption: null,
    default: false,
    id: "52c501e79c18db8ea4000172",
    image_url:
      "https://d32dm0rphc51dk.cloudfront.net/F_uFnffgp0yyJSgkvlGjTA/:version.jpg",
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
    image_versions: [
      "featured",
      "general",
      "large",
      "larger",
      "medium",
      "square",
      "tall",
    ],
    original_height: 2096,
    original_width: 3000,
    position: 4,
  },
]

describe("InstallShots", () => {
  let installShots

  beforeAll(() => {
    installShots = new InstallShots(response, { parse: true })
  })

  it("filters out images without versions", () => {
    installShots.should.have.lengthOf(3)
    expect(response.length).toBe(4)
    installShots
      .pluck("image_versions")
      .should.eql(
        times(3, () => [
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

  it("is comformtable there are no vertsions, as well", () => {
    installShots.reset([{ id: "bad" }, fabricate("show_install_shot")], {
      parse: true,
    })
    installShots.should.have.lengthOf(1)
  })

  describe("#hasCaptions", () => {
    it("returns true if there is at least one caption", () => {
      installShots.hasCaptions().should.be.false()
      installShots.first().set("caption", "existy")
      installShots.hasCaptions().should.be.true()
    })
  })
})
