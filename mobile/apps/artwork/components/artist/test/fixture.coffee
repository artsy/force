{ fabricate } = require 'antigravity'

module.exports =
  artist = [
    fabricate('artist',
      counts: { artworks: 20, for_sale_artworks: 8, partner_shows: 10 },
      carousel:
        images: [
          {
            resized:
              factor: 0.11645962732919254
              height: 75
              url: "some_img.png"
            title: "A Pile of Crowns for Jean-Michel Basquiat"
            url: "tall.jpg"
          },
          {
            resized:
              factor: 0.116
              height: 75
              url: "some_img_2.png"
            title: "This is a title"
            url: "tall_2.jpg"
          },
          {
            resized:
              factor: 0.116
              height: 75
              url: "some_img_3.png"
            title: "This is a new title"
            url: "tall_3.jpg"
          },
        ]
      articles: [
        {
          author:
            name: "The Art Genome Project"
          href: "/article/the-art-genome-project-art-fair-article"
          image:
            thumb:
              height: 100
              url: "image.png"
              width: 100
          title: "Art Fair Article"
        }
      ],
      bio: 'Born 1970, New York, New York, and based in Paris'
      blurb: "This is Picasso's bio.",
      biography_blurb: {
        text: 'Picasso was a cat.'
        credit: 'Submitted by Catty Partner.'
        partner_id: 'catty-partner'
      }
      exhibition_highlights: [
        {
          href: "/show/retrospective"
          kind: 'solo'
          name: "Marcel Broodthaers: A Retrospective"
          partner:
            name: "Museum of Modern Art"
          start_at: "1/1/2016"
        }
      ]
    ),
    fabricate('artist',
      id: 'the-cleopatra',
      name: 'Cleopatra'
      counts: { artworks: 20, for_sale_artworks: 8 },
      carousel:
        images: [
          {
            resized:
              factor: 0.11645962732919254
              height: 75
              url: "star.png"
            title: "5th Wonder"
            url: "tall.jpg"
          },
          {
            resized:
              factor: 0.116
              height: 75
              url: "circle.png"
            title: "This is an avante garde title"
            url: "tall_2.jpg"
          },
          {
            resized:
              factor: 0.116
              height: 75
              url: "square.png"
            title: "This is a new, bizzare title"
            url: "rectangle.jpg"
          },
        ]
      articles: [
        {
          author:
            name: "The  Project"
          href: "/article/the-project-art-fair-article"
          image:
            thumb:
              height: 100
              url: "image.png"
              width: 100
          title: "Art Fair Article"
        }
      ],
      bio: 'Born 1987, Cairo, Egypt, and lives and works in New York'
      biography: "Some cool bio.",
      exhibition_highlights: [
        {
          href: "/show/warhol"
          kind: 'group'
          name: "A Warhol Show"
          partner:
            name: "The Goog"
          start_at: "1/1/2016"
        }
      ]
    )
  ]
