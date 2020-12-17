import path from "path"
import jade from "jade"
import fs from "fs"
const Article = require("desktop/models/article.coffee")
const Channel = require("desktop/models/channel.coffee")

const render = templateName => {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Article Templates", () => {
  it("renders articles in a team channel", () => {
    const html = render("article")({
      article: new Article({
        contributing_authors: [],
        sections: [],
        title: "Channel title",
      }),
      asset: jest.fn(),
      channel: new Channel({
        links: [],
        name: "Gallery Insights",
        type: "team",
      }),
      crop: url => url,
      moment: jest.fn(),
      resize: url => url,
      sd: {},
      stitch: {
        components: {
          NavBar: x => x,
        },
      },
    })
    expect(html).toContain("is-team-channel")
    expect(html).toContain("team-channel-nav")
    expect(html).toContain("Gallery Insights")
  })
})
