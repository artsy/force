import path from "path"
import pug from "pug"
import fs from "fs"
import Article from "desktop/models/article.coffee"
import Channel from "desktop/models/channel.coffee"

const render = templateName => {
  const filename = path.resolve(__dirname, `../${templateName}.pug`)
  return pug.compile(fs.readFileSync(filename), { filename })
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
      moment: () => {},
      asset: () => {},
      sd: {},
      stitch: {
        components: {
          NavBar: x => x,
        },
      },
    })
    html.should.containEql("is-team-channel")
    html.should.containEql("team-channel-nav")
    html.should.containEql("Gallery Insights")
  })
})
