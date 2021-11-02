import path from "path"
import jade from "jade"
import fs from "fs"
import Curation from "desktop/models/curation"

const render = templateName => {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Meta template", () => {
  it("contains basic meta tags on the landing page", () => {
    const curation = {
      name: "Artists for Gender Equality",
      type: "editorial-feature",
      sections: [],
      social_title: "What Happened in the Past?",
      description: "Description",
      social_description: "A series of films optimized for social media",
      email_title: "Good Morning, What Happened?",
      email_author: "Artsy Editors",
      email_tags: "magazine,article,gucci",
      keywords: "women,gender,equality",
      thumbnail_image: "http://thumbnail.jpg",
      email_image: "http://emailimage.jpg",
      social_image: "http://socialimage.jpg",
    }
    const html = render("head")({
      crop: url => url,
      sd: {
        IS_NESTED_PATH: false,
        CURATION: curation,
        APP_URL: "https://artsy.net",
      },
    })
    html.should.containEql("<title>Artists for Gender Equality</title>")
    html.should.containEql('<meta name="description" content="Description"/>')
    html.should.containEql(
      '<meta name="keywords" content="women,gender,equality"/>'
    )
  })

  it("contains basic meta tags on a nested route", () => {
    const curation = new Curation({
      name: "Artists for Gender Equality",
      type: "editorial-feature",
      sections: [
        {
          title: "I. PAST",
          slug: "past",
          social_title: "What Happened in the Past?",
          social_description: "A series of films optimized for social media",
          description: "Description",
          email_title: "Good Morning, What Happened?",
          email_author: "Artsy Editors",
          email_tags: "magazine,article,gucci",
          keywords: "women,gender,equality",
          thumbnail_image: "http://thumbnail.jpg",
          email_image: "http://emailimage.jpg",
          social_image: "http://socialimage.jpg",
        },
      ],
    })
    const html = render("head")({
      curation,
      crop: url => url,
      sd: {
        IS_NESTED_PATH: true,
        CURATION: curation.toJSON(),
        APP_URL: "https://artsy.net",
        VIDEO_INDEX: 0,
      },
    })
    html.should.containEql(
      "<title>Artists for Gender Equality: I. PAST</title>"
    )
    html.should.containEql(
      '<link rel="canonical" href="https://artsy.net/gender-equality/past"/>'
    )
    html.should.containEql('<meta name="description" content="Description"/>')
    html.should.containEql(
      '<meta name="keywords" content="women,gender,equality"/>'
    )
  })
})
