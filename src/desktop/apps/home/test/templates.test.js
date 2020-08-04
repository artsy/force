/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const _s = require("underscore.string")
const jade = require("jade")
const markdown = require("../../../components/util/markdown")

const render = function (data) {
  const template = jade.compileFile(
    require.resolve("../templates/hero_unit.jade")
  )
  return template(
    _.extend(
      {},
      {
        _s,
        markdown,
        resize: url => `https://d234.cloudfront.net?resize_to=fit&src=${url}`,
      },
      data
    )
  )
}

describe("Hero unit template", function () {
  it("renders markdown subtitles", () =>
    render({
      heroUnit: { subtitle: "This is a *subtitle*" },
    }).should.containEql("<em>subtitle</em>"))

  it("resizes the image url if the hero unit comes from metaphysics", () =>
    render({
      heroUnit: {
        subtitle: "This is a *subtitle*",
        mode: "LEFT_DARK",
        background_image_url: "d3swk.cloudfront.net/large.jpg",
      },
    }).should.containEql("?resize_to=fit"))

  return it("does not resize the image url if the hero unit is the welcome image", () =>
    render({
      heroUnit: { subtitle: "This is a *subtitle*", mode: "WELCOME" },
    }).should.not.containEql("?resize_to=fit"))
})
