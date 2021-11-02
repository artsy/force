import path from "path"
import jade from "jade"
import fs from "fs"
const Article = require("desktop/models/article")
const Channel = require("desktop/models/channel")

const render = templateName => {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Article Templates", () => {
  it("renders articles in a team channel", () => {
    const html = render("article")({
      article: new Article({
        title: "Channel title",
        sections: [],
        contributing_authors: [],
      }),
      channel: new Channel({
        type: "team",
        name: "Gallery Insights",
        links: [],
      }),
      crop: url => url,
      resize: url => url,
      moment: jest.fn(),
      asset: jest.fn(),
      sd: {},
      stitch: {
        components: {
          NavBar: x => x,
          Footer: x => x,
        },
      },
    })
    expect(html).toContain("is-team-channel")
    expect(html).toContain("team-channel-nav")
    expect(html).toContain("Gallery Insights")
  })
})
