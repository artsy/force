#
# A function that helps create fixture data modeled after the Gravity API.
# Pass in the name of the model and any extending data and it'll return
# a vanilla javascript object populated with fixture json data.
#
# e.g. `fabricate('artwork', { title: 'Three Wolf Moon'` })
#

_ = require 'underscore'
GRAVITY_URL = process.env.ARTSY_URL or 'http://localhost:5000/__gravity'

module.exports = fabricate = (type, extObj = {}) ->

  _.extend switch type

    when 'current_user'
      id: "4d8cd73191a5c50ce200002a"
      name: "Craig Spaeth"
      _links:
        self:
          href: "#{GRAVITY_URL}/api/users/4d8cd73191a5c50ce200002a"

        profile:
          href: "#{GRAVITY_URL}/api/profiles/5086df098523e60002000012"

        user_details:
          href: "#{GRAVITY_URL}/api/user_details/4d8cd73191a5c50ce200002a"

    when 'user_profile'
      id: "5086df098523e60002000012"
      created_at: "2012-10-23T18:16:41+00:00"
      updated_at: "2014-09-24T20:38:41+00:00"
      handle: "craig"
      location: "New York, New York"
      description: "Developer at Artsy. My heart swoons for code, art, & indie games."
      _links:
        curies: [
          name: "image"
          href: "http://stagic3.artsy.net/profile_icons/504e2c4fbb39040002000483/{rel}"
          templated: true
        ]
        thumbnail:
          href: "/assets/shared/missing_image.png"
        "image:self":
          href: "{?image_version}.jpg"
        self:
          href: "https://stagingapi.artsy.net/api/profiles/5086df098523e60002000012"
        permalink:
          href: "https://staging.artsy.net/craig"
        website:
          href: ""
      image_versions: ["square140"]

    when 'user_details'
      id: "4d8cd73191a5c50ce200002a"
      created_at: "2011-07-18T17:53:47+00:00"
      updated_at: "2014-10-03T01:59:14+00:00"
      type: "Admin"
      email: "craig@artsymail.com"
      birthday: null
      phone: ""
      gender: null
      _links:
        self:
          href: "#{GRAVITY_URL}/api/user_details/4d8cd73191a5c50ce200002a"

        user:
          href: "#{GRAVITY_URL}/api/user/4d8cd73191a5c50ce200002a"

    when 'artwork'
      {"id":"4d8b93ba4eb68a1b2c001c5b","created_at":"2010-12-20T19:48:55+00:00","updated_at":"2014-08-12T18:10:21+00:00","title":"Skull","category":"Paintings","medium":"Synthetic polymer paint and silkscreen ink on canvas","date":"1976","dimensions":{"in":{"text":"132 Ã— 150 in","height":132.0,"width":150.0,"depth":0.0,"diameter":null},"cm":{"text":"335.3 Ã— 381 cm","height":335.3,"width":381.0,"depth":0.0,"diameter":null}},"website":"","signature":"","series":null,"provenance":"","literature":"","exhibition_history":"","collecting_institution":"","additional_information":"","image_rights":"Â© 2012 The Andy Warhol Foundation for the Visual Arts, Inc. / Artists Rights Society (ARS), New York","blurb":"","unique":false,"cultural_maker":null,"can_inquire":true,"can_acquire":false,"can_share":true,"sale_message":null,"sold":false,"_links":{"curies":[{"name":"image","href":"http://static0.artsy.net/additional_images/4e68f259528702000104c329/1/{rel}","templated":true}],"thumbnail":{"href":"http://static0.artsy.net/additional_images/4e68f259528702000104c329/1/medium.jpg"},"image:self":{"href":"{?image_version}.jpg","templated":true},"partner":{"href":"#{GRAVITY_URL}/api/partners/4d8b92c44eb68a1b2c0004cb"},"self":{"href":"#{GRAVITY_URL}/api/artworks/4d8b93ba4eb68a1b2c001c5b"},"permalink":{"href":"http://artsy.net/artwork/andy-warhol-skull"},"genes":{"href":"#{GRAVITY_URL}/api/genes?artwork_id=4d8b93ba4eb68a1b2c001c5b"},"artists":{"href":"#{GRAVITY_URL}/api/artists?artwork_id=4d8b93ba4eb68a1b2c001c5b"}},"image_versions":["small","square","medium","large","larger","normalized","tall","medium_rectangle","large_rectangle"],"_embedded":{"editions":[]}}

    when 'artists'
      {"total_count":null,"_links":{"self":{"href":"#{GRAVITY_URL}/api/artists?artwork_id=4d8b93ba4eb68a1b2c001c5b"},"next":{"href":"#{GRAVITY_URL}/api/artists?artwork_id=4d8b93ba4eb68a1b2c001c5b&cursor=warhol-andy%3A4d8b92b34eb68a1b2c0003f4"}},"_embedded":{"artists":[{"id":"4d8b92b34eb68a1b2c0003f4","created_at":"2010-08-23T14:15:30+00:00","updated_at":"2014-10-23T16:44:01+00:00","name":"Andy Warhol","gender":"male","birthday":"1928","hometown":"Pittsburgh, Pennsylvania","location":"New York ","nationality":"American","statement":"","biography":"An American painter, printmaker, sculptor, draughtsman, illustrator, filmmaker, writer and collector, who became one of the most famous artists of the 20th century. Warhol began his career as a successful commercial artist and illustrator for magazines and newspapers but by 1960 was determined to establish his name as a painter. He quickly became renowned for painting everyday advertisements or images from comic strips that looked eerily similar to the originals and contained no traditional marks of an artist. Warhol accentuated this look through the use of silkscreens and by painting in collaboration with a team of assistants in a studio he called \"The Factory.\" In the late sixties, Warhol turned his attention to making experimental films and multimedia events, and in the 1970s, to creating commissioned portraits. During the 1980s Warhol continued to exert an influence on the art world, collaborating with young artists such as Jean-Michel Basquiat and creating a series of paintings, which engaged with Renaissance masterworks.","blurb":"Obsessed with celebrity, consumer culture, and mechanical (re)production, [Pop artist](/gene/pop-art) Andy Warhol created some of the most iconic images of the 20th century. As famous for his quips as for his artâ€”he variously mused that â€œart is what you can get away withâ€ and â€œeveryone will be famous for 15 minutesâ€â€”Warhol drew widely from popular culture and everyday subject matter, creating works like his _32 Campbell's Soup Cans_ (1962), [Brillo pad box sculptures](/artwork/andy-warhol-set-of-four-boxes-campbells-tomato-juice-del-monte-peach-halves-brillo-soap-pads-heinz-tomato-ketchup), and portraits of Marilyn Monroe, using the medium of silk-screen printmaking to achieve his characteristic hard edges and flat areas of color. Known for his cultivation of celebrity, Factory studio (a radical social and creative melting pot), and avant-garde films like _Chelsea Girls_ (1966), Warhol was also a mentor to artists like [Keith Haring](/artist/keith-haring) and [Jean-Michel Basquiat](/artist/jean-michel-basquiat). His Pop sensibility is now standard practice, taken up by major contemporary artists [Richard Prince](/artist/richard-prince), [Takashi Murakami](/artist/takashi-murakami), and [Jeff Koons](/artist/jeff-koons), among countless others.","education":"","awards":"","publications":"","collections":"","soloexhibitions":"","groupexhibitions":"","_links":{"curies":[{"name":"image","href":"http://static1.artsy.net/artist_images/52f6bdda4a04f5d504f69b03/1/{rel}","templated":true}],"thumbnail":{"href":"http://static1.artsy.net/artist_images/52f6bdda4a04f5d504f69b03/1/four_thirds.jpg"},"image:self":{"href":"{?image_version}.jpg","templated":true},"self":{"href":"#{GRAVITY_URL}/api/artists/4d8b92b34eb68a1b2c0003f4"},"permalink":{"href":"http://artsy.net/artist/andy-warhol"},"artworks":{"href":"#{GRAVITY_URL}/api/artworks?artist_id=4d8b92b34eb68a1b2c0003f4"},"genes":{"href":"#{GRAVITY_URL}/api/genes?artist_id=4d8b92b34eb68a1b2c0003f4"}},"image_versions":["square","tall","large","four_thirds"]}]}}

    when 'partner'
      {"id":"4d8b92c44eb68a1b2c0004cb","created_at":"2011-03-24T18:51:48+00:00","updated_at":"2014-10-21T07:01:23+00:00","type":"Gallery","name":"Gagosian Gallery","email":"newyork@gagosian.com","region":"North America","_links":{"self":{"href":"#{GRAVITY_URL}/api/partners/4d8b92c44eb68a1b2c0004cb"},"profile":{"href":"#{GRAVITY_URL}/api/profiles/gagosian-gallery"},"artworks":{"href":"#{GRAVITY_URL}/api/artworks?partner_id=4d8b92c44eb68a1b2c0004cb"},"shows":{"href":"#{GRAVITY_URL}/api/shows?partner_id=4d8b92c44eb68a1b2c0004cb"},"permalink":{"href":"http://artsy.net/gagosian-gallery"},"website":{"href":"http://www.gagosian.com"}}}

    when 'partner_profile'
      {"id":"5159da629a60832439000035","created_at":"2013-04-01T19:05:06+00:00","updated_at":"2013-07-24T16:39:19+00:00","handle":"gagosian-gallery","location":"","description":"Founded by Larry Gagosian in 1980, the gallery has dedicated itself to organizing important exhibitions of contemporary and modern art.","_links":{"curies":[{"name":"image","href":"http://static2.artsy.net/profile_icons/51eefb79275b2420810001fe/{rel}","templated":true}],"thumbnail":{"href":"http://static2.artsy.net/profile_icons/51eefb79275b2420810001fe/square.png"},"image:self":{"href":"{?image_version}.jpg","templated":true},"self":{"href":"https://api.artsy.net/api/profiles/5159da629a60832439000035"},"permalink":{"href":"http://www.artsy.net/gagosian-gallery"},"website":{"href":""}},"image_versions":["circle","square"]}

    when 'search'
      {"total_count":2160,"offset":null,"q":"Skull","_links":{"self":{"href":"https://localhost:5000/__gravity/api/search?q=Skull"},"next":{"href":"https://localhost:5000/__gravity/api/search?offset=10&q=Skull"}},"_embedded":{"results":[{"type":"Artwork","title":"Damien Hirst, Spin skull painting (2012-2013)","description":"From Galerie Laurent Strouk, Damien Hirst, Spin skull painting (2012-2013), \nAcrylic on cardboard, 100 Ã— 100 cm.","og_type":"artsyinc:artwork","_links":{"self":{"href":"https://localhost:5000/__gravity/api/artworks/damien-hirst-spin-skull-painting"},"permalink":{"href":"https://artsy.net/artwork/damien-hirst-spin-skull-painting"},"thumbnail":{"href":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTuMa1OEJa2sokXdDhNeIV2Gv6yraiIwKnsTQJEeoznIbs05lcnhI2oRQc"}}},{"type":"Artwork","title":"Yang Jiechang, Skull (2008), Available for Sale","description":"Available for sale from Ullens Center for Contemporary Art (UCCA), Yang \nJiechang, Skull (2008), Hand-painted Porcelain, 13 Ã— 18 Ã— 12 cm.","og_type":"artsyinc:artwork","_links":{"self":{"href":"https://localhost:5000/__gravity/api/artworks/yang-jiechang-skull"},"permalink":{"href":"https://artsy.net/artwork/yang-jiechang-skull"},"thumbnail":{"href":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSxFqWZzqat5v0r5f0bqiDfTPaKeTtCA4qLxrz2Jd-8R_E6eLrheJvyAT0"}}},{"type":"Artwork","title":"Andy Warhol, Skull (1976)","description":"From Gagosian Gallery, Andy Warhol, Skull (1976), Synthetic polymer paint and \nsilkscreen ink on canvas, 132 Ã— 150 in.","og_type":"artsyinc:artwork","_links":{"self":{"href":"https://localhost:5000/__gravity/api/artworks/andy-warhol-skull"},"permalink":{"href":"https://artsy.net/artwork/andy-warhol-skull"},"thumbnail":{"href":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSFLmC-4wHN2_nWPpfKSRw9xG7k6fQkT1DPahKOGHfLxI1akXvZfOc5vhM"}}},{"type":"Artist","title":"Jim Skull","description":"Find the latest shows, biography, and artworks for sale by Jim Skull.","og_type":"artsyinc:artist","_links":{"self":{"href":"https://localhost:5000/__gravity/api/artists/jim-skull"},"permalink":{"href":"https://artsy.net/artist/jim-skull"},"thumbnail":{"href":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQNAUEvy7-ZH6BrUiJB-M8zJh44d7yth_wxKO6I4ZnI29oVMCwXESATtOeM"}}},{"type":"Artwork","title":"Haroshi, Skull","description":"From Jonathan LeVine Gallery, Haroshi, Skull, Used skateboards, 8 5/8 Ã— 5 1/8 Ã— \n6 3/4 in.","og_type":"artsyinc:artwork","_links":{"self":{"href":"https://localhost:5000/__gravity/api/artworks/haroshi-skull"},"permalink":{"href":"https://artsy.net/artwork/haroshi-skull"},"thumbnail":{"href":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT2zEfE1vAKMfnZzq1biCtSdmqz3tiBJwN9JulckJwR9_iZlEsGkGGEfZk"}}},{"type":"Show","title":"La Lanta at SCOPE New York 2014","description":"Ninja Skull - Black Cloud, 2013, by Shin Koyama Â· Shin Koyama. Ninja Skull - \nBlack Cloud, 2013. La Lanta Fine Art. $600. Blue and White Skull 1, 2013, by \nShinÂ ...","og_type":"artsyinc:exhibition","_links":{"self":{"href":"https://localhost:5000/__gravity/api/shows/la-lanta-la-lanta-at-scope-new-york-2014"},"permalink":{"href":"https://artsy.net/show/la-lanta-la-lanta-at-scope-new-york-2014"},"thumbnail":{"href":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS_jJcAiYsY5yS-Qpob-UEgUvrUyFEVLiHeV6L0MbPMhHb3Re3P4zRR8zNe"}}},{"type":"Artwork","title":"Roy Lichtenstein, Still Life with Cow's Skull (1972)","description":"From Gagosian Gallery, Roy Lichtenstein, Still Life with Cow's Skull (1972), Oil \nand magna on canvas, 54 Ã— 52 in.","og_type":"artsyinc:artwork","_links":{"self":{"href":"https://localhost:5000/__gravity/api/artworks/roy-lichtenstein-still-life-with-cows-skull"},"permalink":{"href":"https://artsy.net/artwork/roy-lichtenstein-still-life-with-cows-skull"},"thumbnail":{"href":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQKrDEshSQ1n9-9YV31NK-7MCD5iOzitZraG1ZZ5hdkIWbeFUdOlN6OxP0z"}}},{"type":"Artwork","title":"Odd Nerdrum, Self Portrait with Child's Skull, Available for Sale","description":"Available for sale from Forum Gallery, Odd Nerdrum, Self Portrait with Child's \nSkull, Oil on canvas, 34 Ã— 30 in.","og_type":"artsyinc:artwork","_links":{"self":{"href":"https://localhost:5000/__gravity/api/artworks/odd-nerdrum-self-portrait-with-childs-skull"},"permalink":{"href":"https://artsy.net/artwork/odd-nerdrum-self-portrait-with-childs-skull"},"thumbnail":{"href":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS_Tzi_35jrXq2UOniK3h5pMKxxsm0qnX3KaqFYBWXxT--arp4L_aW5wPy4"}}},{"type":"Artist","title":"Shin Koyama","description":"Ninja Skull - Karakusa Â· Blue and White Skull 1 Â· Ninja Skull - Flower 4 Â· Ninja \nSkull - Black Cloud Â· Smiling Skull 5 Â· Ninja Skull - Clover Â· Ninja Skull - Sakura.","og_type":"artsyinc:artist","_links":{"self":{"href":"https://localhost:5000/__gravity/api/artists/shin-koyama"},"permalink":{"href":"https://artsy.net/artist/shin-koyama"},"thumbnail":{"href":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYEcQsxVNfXdb6emCgmyZb3NqMWvaHntgCM9j-AWRKQ7K6Fgs8k57rrqbz"}}},{"type":"Artwork","title":"Mark Flood, Skull Rack to the West [black] (2014), Available for Sale ...","description":"Available for sale from Zach Feuer, Mark Flood, Skull Rack to the West [black] (\n2014), Metal battery rack with painted skull casts, 44 Ã— 24 Ã— 10 in.","og_type":"artsyinc:artwork","_links":{"self":{"href":"https://localhost:5000/__gravity/api/artworks/mark-flood-skull-rack-to-the-west-black"},"permalink":{"href":"https://artsy.net/artwork/mark-flood-skull-rack-to-the-west-black"},"thumbnail":{"href":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTGOb0MlQ3eaFqkiBghJvfF1a_wvJH9Vp1GQIgCMj2oaanc1Ci5pf5MGuIG"}}}]}}

    when 'empty_search'
      {"total_count":0,"offset":null,"q":"ajdfkjsalfkdjskalfjlsak","_links":{"self":{"href":"https://api.artsy.net/api/search?q=ajdfkjsalfkdjskalfjlsak"}},"_embedded":{"results":[]}}
