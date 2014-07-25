_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Post = require '../../models/post'
Profile = require '../../models/profile'
Artwork = require '../../models/artwork'
{ fabricate } = require 'antigravity'

describe 'Post', ->

  beforeEach ->
    @profile = fabricate 'profile'

  describe '#extendedSummary', ->

    it 'will leave the first paragraph alone if it is under 385 chars long', ->
      lt385 = "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any."
      body = "<p>#{lt385}</p><p>#{lt385}</p>"
      post = new Post body: body
      post.extendedSummary().should.not.equal body
      post.extendedSummary().should.equal lt385

    it 'will truncate with an ellipsis if the first paragraph is less than 210 chars, but the entire body is greater than 385', ->
      lt210 = "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could."
      body = "<p>#{lt210}</p><p>#{lt210}</p>"
      post = new Post body: body
      summary = post.extendedSummary()
      summary.length.should.be.greaterThan 210
      summary.length.should.be.lessThan 390
      summary.should.containEql '&hellip;'

    it 'summarizes a real post body', ->
      body = "\u003cp>For the occasion of \u003ci>Armory Focus: China\u003c/i> at The Armory Show 2014, Art21 produced four original films featuring \u003cb>Philip Tinari\u003c/b>, director of The Ullens Center for Contemporary Art in Beijing and curator of \u003ci>Armory Focus: China\u003c/i>. In the films, Tinari reflects upon the current state of contemporary art in China, as highlighted through the work of four Chinese artists: \u003ca href=\"https://artsy.net/artist/ai-weiwei\">Ai Weiwei\u003c/a>, \u003ca href=\"https://artsy.net/artist/cao-fei\">Cao Fei\u003c/a>, \u003ca href=\"https://artsy.net/artist/cai-guo-qiang\">Cai Guo-Qiang\u003c/a>, and \u003ca href=\"https://artsy.net/artist/xu-zhen\">Xu Zhen\u003c/a>, the commissioned artist for The Armory Show 2014. All four films will be screened to both fair-going and online audiences. Featured here are the first three films from the series.\u003c/p>\u003cp>When discussing each of the three artists previously featured by Art21—Ai Weiwei, Cao Fei, and Cai Guo-Qiang—Tinari identifies a common interest in the cultural identity of China and the Chinese population, along with its relationships both locally and globally.\u003c/p>\u003cp>In Ai, Tinari notes a fascination with the effect of China’s productivity upon the lives of individuals, as demonstrated through the artist’s frequent employment of local artisans for the creation of his works. Tinari also identifies Western artists Marcel Duchamp and Andy Warhol as key influences for Ai’s work as an artist.\u003c/p>\u003cp>In Cao, Tinari sees “an example of how one can be a Chinese artist working in a global context.” Tinari cities the lengths of time that Cao spent with local factory workers—from factories that produce goods for global consumption—as a representation of the artist’s interest of “engaging with the wider world on her terms.”\u003c/p>\u003cp>Of Cai, Tinari mentions the artist’s signature work with gunpowder, describing the material as something that “speaks to the ingenuity of the Chinese people.” Tinari explores the on-going influence of the artist’s travels to—and current residence in—the West, and its relationship to his own Chinese identity.\u003c/p>\u003cp>These videos serve as companion pieces to each artist’s original appearance in Art21’s \u003ci>Art in the Twenty-First Century\u003c/i> series. These videos, as well as additional videos from Art21’s \u003ci>Exclusive\u003c/i> and \u003ci>Artist to Artist\u003c/i> series, can be viewed on \u003ca href=\"http://www.art21.org\">Art21.org\u003c/a>.\u003c/p>\u003cp>Philip Tinari first partnered with Art21 in 2009, interviewing Cao Fei in Beijing for \u003ca href=\"http://www.art21.org/films/art-in-the-twenty-first-century-season-5-2009\">Season 5\u003c/a> (2009) of the \u003ci>Art in the Twenty-First Century\u003c/i> series. Tinari would again partner with Art21 to interview artist Ai Weiwei in Beijing for \u003ca href=\"http://www.art21.org/films/art-in-the-twenty-first-century-season-6-2012\">Season 6\u003c/a> (2012).\u003c/p>\u003cp>\u003ci>Armory Focus\u003c/i> is a specially curated section of The Armory Show that highlights the artistic landscape of a chosen geographic region. For The Armory Show 2014, Tinari curated \u003ci>Armory Focus: China\u003c/i>, shining new light on the country’s contemporary cultural practice. \u003ci>Armory Focus: China\u003c/i> is on view at The Armory Show in New York from March 6–9, 2014.\u003c/p>"
      post = new Post body: body
      post.extendedSummary().should.
        equal "For the occasion of Armory Focus: China at The Armory Show 2014, Art21 produced four original films featuring Philip Tinari, director of The Ullens Center for Contemporary Art in Beijing and curator of Armory Focus: China. In the films, Tinari reflects upon the current state of contemporary art in China, as highlighted through the work of four Chinese artists: Ai Weiwei, Cao Fei&hellip;"

  describe "#metaTitle", ->

    it "correctly formats meta title", ->
      new Post(profile: @profile).metaTitle().should.equal "Craig Spaeth | Artsy"
      new Post(title: "Title", profile: @profile).metaTitle().should.equal "Craig Spaeth | Title | Artsy"
      new Post(summary: "Body", profile: @profile).metaTitle().should.equal "Craig Spaeth | Body | Artsy"
      new Post(summary: "Body", title: "Title", profile: @profile).metaTitle().should.equal "Craig Spaeth | Title | Artsy"
      new Post(
        profile: @profile
        summary: "I am a much longer body for this post. Wohoo! OMG LOL. The red brown fox jumped over the grey dog."
      ).metaTitle().should.equal "Craig Spaeth | I am a much longer body for this post. Wohoo! OMG LOL. The... | Artsy"

  describe "#metaDescription", ->

    beforeEach ->
      @artwork = fabricate 'artwork'
      @artworkTwo = fabricate 'artwork'

    it "correctly formats meta title", ->
      new Post(profile: @profile, artworks: [@artwork]).metaDescription().should.equal new Artwork(@artwork).toOneLine()
      new Post(title: "Title", profile: @profile, artworks: [@artwork]).metaDescription().should.equal new Artwork(@artwork).toOneLine()
      new Post(title: "Title", profile: @profile, artworks: [@artwork, @artworkTwo]).metaDescription().should.equal "#{new Artwork(@artwork).toOneLine()}, #{new Artwork(@artworkTwo).toOneLine()}"
      new Post(summary: "Body", profile: @profile, artworks: [@artwork]).metaDescription().should.equal "Body | #{new Artwork(@artwork).toOneLine()}"
      new Post(summary: "Body", title: "Title", profile: @profile, artworks: [@artwork]).metaDescription().should.equal "Body | #{new Artwork(@artwork).toOneLine()}"

  describe '#defaultImage', ->

    it 'returns the first image of the first artwork', ->
      postImage =
        type: 'PostImage'
      image =
        is_default: true
      postArtwork =
        artwork: fabricate('artwork', images: [image])
        type: 'PostArtwork'
      post = new Post(attachments: [postImage, postArtwork])

      post.defaultImage().get('is_default').should.equal image.is_default

    it 'returns the first image if there is no artwork', ->
      image = type: 'PostImage'
      post = new Post(attachments: [image])
      post.defaultImage().get('type').should.equal 'PostImage'

    it 'returns the first image if there is no PostImage or artwork', ->
      link = type: 'PostLink', url: 'existy', oembed_json: type: 'photo'
      post = new Post(attachments: [link])
      post.defaultImage().imageUrlFor().should.equal 'existy'
      post.defaultImage().imageUrl().should.equal 'existy'

    it 'returns undefined if there are no attachments', ->
      post = new Post(attachments: [])
      _.isUndefined(post.defaultImage()).should.be.ok

  describe '#relatedArtists', ->

    xit 'returns related artists', ->
      postAttachments = [
        {
          position: 1
          type: "PostArtwork"
          artwork: fabricate('artwork')
        }, {
          position: 2
          type: "PostArtwork"
          artwork: fabricate('artwork')
        }, {
          position: 3
          type: "PostArtwork"
          artwork: fabricate('artwork')
        }]

      post = new Post fabricate('post', attachments: postAttachments)
      relatedArtists = post.relatedArtists(3)
      relatedArtists.length.should.equal 3
      relatedArtists[0].get('id').should.equal postAttachments[0].artwork.artist.id
      relatedArtists[1].get('id').should.equal postAttachments[1].artwork.artist.id
      relatedArtists[2].get('id').should.equal postAttachments[2].artwork.artist.id

    it 'doesnt error with no artists', ->
      post = new Post fabricate('post')
      post.relatedArtists(3).should.be.ok

  describe '#featuredPostsThumbnail', ->

    it 'returns thumbnail', ->
      attachments = [
        {
          id: _.uniqueId()
          position: 1
          type: "PostLink"
          url: "http://www.youtube.com/watch?v=d7zaja7ytWI"
        }, {
          id: _.uniqueId()
          html: "<iframe></iframe>"
          position: 4
          sanitized_html: "<iframe></iframe>"
          type: "PostEmbed"
        }, {
          position: 1
          type: "PostArtwork"
          artwork: fabricate('artwork', artist: fabricate('artist', id: 'andy-01', name: 'andy 1'))
        }]

      post = new Post(fabricate('post', attachments: attachments))
      post.featuredPostsThumbnail().get('artwork').id.should.equal attachments[2].artwork.id

    it 'doesnt error', ->
      post = new Post(fabricate('post'))
      _.isUndefined(post.featuredPostsThumbnail()).should.be.ok

  describe '#onPostPage', ->

    it 'true if on post page', ->
      post = new Post(fabricate('post'))
      post.onPostPage("/post/#{post.get('id')}").should.be.ok
      post.onPostPage("/post/foo").should.not.be.ok

  describe '#toJSONLD', ->

    it 'returns valid json', ->
      post = new Post(fabricate('post', summary: 'summary'))
      json = post.toJSONLD()
      json['@context'].should.equal 'http://schema.org'
      json['@type'].should.equal 'Article'
      json.title.should.equal "summary"
