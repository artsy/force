{ fabricate } = require 'antigravity'

module.exports.artistsWithoutExhibitions =
  artists: [
    fabricate('artist', {
      bio: 'American, born 1975, Los Angeles, California, based in New York, New York',
      name: 'Dustin Yellin',
      href: '/artist/dustin-yellin',
      biography_blurb: {
        text: 'Dustin Yellin is as known for his image-rich sculptures as he is for his entrepreneurship',
        credit: 'Submitted by Catty Gallery'
      }
      exhibition_highlights: null
      articles: [
        {
          thumbnail_image: {
            href: '/image1.jpg'
            cropped:
              url: '/images/image_1.jpg'
          },
          href: '/article/the-art-genome-project-10-artists-who-defied-classification-in-2015',
          title: '10 Artists Who Defied Classification in 2015',
          author: { name: 'Artsy Editoral' }
        },
        {
          thumbnail_image: {
            href: '/image2.jpg'
            cropped:
              url: '/images/image_2.jpg'
          },
          href: '/article/editorial-dustin-yellin-and-eric-fischls-two-person-show',
          title: 'Dustin Yellin and Eric Fischl’s Two-Person Show Reconsiders the Human Figure',
          author: { name: 'Artsy Editoral' }
        },
        {
          thumbnail_image: {
            href: '/image3.jpg'
            cropped:
              url: '/images/image_1.jpg'
          },
          href: '/article/theavgd-eddie-brannan-and-dustin-yellin-from',
          title: 'Eddie Brannan & Dustin Yellin - From Manhattan to Red Hook',
          author: { name: 'Artsy Editoral' }
        }
      ]
    })
  ]

module.exports.artistsWithExhibitions =
  artists: [
    fabricate('artist', {
      bio: 'American, born 1975, Los Angeles, California, based in New York, New York',
      name: 'Dustin Yellin',
      href: '/artist/dustin-yellin',
      biography_blurb: {
        text: 'Dustin Yellin is as known for his image-rich sculptures as he is for his entrepreneurship',
        credit: 'Submitted by Catty Gallery'
      }
      exhibition_highlights: [
        {
          kind: 'group',
          name: 'Selection from Grey East at Glenn Horowitz Bookseller in East Hampton',
          start_at: '2014-07-05T00:00:00+00:00',
          href: '/show/grey-area-selection-from-grey-east-at-glenn-horowitz-bookseller-in-east-hampton'
          cover_image:
            cropped:
              url: '/images/image_1.jpg'
        },
        {
          kind: 'solo',
          name: 'Selected Works',
          start_at: '2014-06-07T05:00:00+00:00',
          href: '/show/octavia-art-gallery-selected-works'
        },
        {
          kind: 'fair',
          name: 'Winston Wächter Fine Art at Seattle Art Fair 2015',
          start_at: '2015-07-30T15:12:00+00:00',
          href: '/show/winston-wachter-fine-art-winston-wachter-fine-art-at-seattle-art-fair-2015'
        }
      ]
      articles: [
        {
          thumbnail_image: {
            href: '/image1.jpg'
            cropped:
              url: '/images/image_1.jpg'
          },
          href: '/article/the-art-genome-project-10-artists-who-defied-classification-in-2015',
          title: '10 Artists Who Defied Classification in 2015',
          author: { name: 'Artsy Editoral' }
        },
        {
          thumbnail_image: {
            href: '/image2.jpg'
            cropped:
              url: '/images/image_2.jpg'
          },
          href: '/article/editorial-dustin-yellin-and-eric-fischls-two-person-show',
          title: 'Dustin Yellin and Eric Fischl’s Two-Person Show Reconsiders the Human Figure',
          author: { name: 'Artsy Editoral' }
        },
        {
          thumbnail_image: {
            href: '/image3.jpg'
            cropped:
              url: '/images/image_1.jpg'
          },
          href: '/article/theavgd-eddie-brannan-and-dustin-yellin-from',
          title: 'Eddie Brannan & Dustin Yellin - From Manhattan to Red Hook',
          author: { name: 'Artsy Editoral' }
        }
      ]
    })
  ]
