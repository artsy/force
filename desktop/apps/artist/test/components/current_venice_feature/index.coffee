currentItem = require "../../../components/current_venice_feature"
{ isUndefined } = require "underscore"
Q = require "bluebird-q"

describe "current venice feature", ->
  fetch = () -> Q.resolved [
    { slug: "featured", featured: true },
    { slug: "participant", featured: false }
  ]

  it "renders nothing if the given artist is not in the list of artists", ->
    currentItem({ id: "not-featured" }, fetch).then (result) ->
      isUndefined(result).should.be.ok()

  it "renders an artist featured in editorial content", ->
    currentItem({ id: "featured", name: "Banksy" }, fetch).then (result) ->
      result.heading.should.match(/INSIDE/)
      result.name.should.match(/Banksy/)

  it "renders an artist not featured in editorial content", ->
    currentItem({ id: "participant", name: "Banksy" }, fetch).then (result) ->
      result.heading.should.match(/PARTICIPANT/)
      result.name.should.match(/world/)

  describe "concerning name", ->
    it "treats a name not ending with an s correctly", ->
      currentItem({ id: "featured", name: "Banksy" }, fetch).then (result) ->
        result.name.should.match(/See Banksy’s work/)

    it "treats a name ending with an s correctly", ->
      currentItem({ id: "featured", name: "Frits" }, fetch).then (result) ->
        result.name.should.match(/See Frits’ work/)
