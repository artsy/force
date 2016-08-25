{ fabricate } = require 'antigravity'

module.exports =
  artists = [
    fabricate('artist', {
      bio: 'American, born 1975, Los Angeles, California, based in New York, New York',
      name: 'Dustin Yellin',
      href: '/artist/dustin-yellin',
      biography: 'Dustin Yellin is as known for his image-rich sculptures as he is for his entrepreneurship'
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