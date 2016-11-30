moment = require 'moment'

@counts =
  "hits": []
  "aggregations":
    "total":
      "value": 32

    "dimension_range":
      "*-24.0":
        "name": "Small"
        "count": 8

      "24.0-48.0":
        "name": "Medium"
        "count": 3

      "48.0-84.0":
        "name": "Large"
        "count": 2

      "84.0-*":
        "name": "Very Large"
        "count": 0

    "price_range":
      "*-*":
        "name": "for Sale"
        "count": 11

      "1000-5000":
        "name": "between $1,000 & $5,000"
        "count": 7

      "5000-10000":
        "name": "between $5,000 & $10,000"
        "count": 3

      "*-1000":
        "name": "Under $1,000"
        "count": 1

    "medium":
      "painting":
        "name": "Painting"
        "count": 15

      "prints":
        "name": "Prints"
        "count": 7

      "sculpture":
        "name": "Sculpture"
        "count": 3

      "photography":
        "name": "Photography"
        "count": 2

      "work-on-paper":
        "name": "Work on Paper"
        "count": 1


@section =
  id: '55356a9deca560a0137aa4b7'
  title: 'Vennice Biennalez'
  description: 'The coolest biennale'
  slug: 'vennice-biennale'
  partner_logo_url: 'http://gemini.herokuapp.com/123/miaart-banner.jpg'
  thumbnail_url: 'http://gemini.herokuapp.com/123/miaart-banner.jpg'
  featured_links: [{ title: 'foo', thumbnail_url: 'bar.jpg', url: 'foo.com' }]

@channel =
  id: '55356a9deca560a0137aa4b7'
  name: 'Life at Artsy'
  tagline: 'Office Culture at Artsy'
  slug: 'life-at-artsy'
  image_url: 'http://gemini.herokuapp.com/123/miaart-banner.jpg'
  links: [
    { text: 'Cool Link', url: 'http://artsy.net' }
    { text: 'Another Link', url: 'http://artsy.net/about' }
  ]
  pinned_articles: [
    { index: 1, id: '55356a9deca560a0137aa4b6' }
    { index: 2, id: '55356a9deca560a0137aa4b8' }
    { index: 3, id: '55356a9deca560a0137aa4b9' }
    { index: 4, id: '55356a9deca560a0137aa4b0' }
  ]

@article =
  id: '54276766fd4f50996aeca2b8'
  author_id: '4d8cd73191a5c50ce210002a'
  author:
    id: "506999f123c3980002000342"
    name: "Elena Soboleva"
    profile_id: "5086df0a8523e60002000015"
    profile_handle: "elena"
  contributing_authors: []
  thumbnail_title: 'Top Ten Booths at miart 2014',
  thumbnail_teaser: 'Look here! Before the lines start forming...',
  thumbnail_image: 'http://kitten.com',
  tags: ['Fair Coverage', 'Magazine']
  title: 'Top Ten Booths',
  lead_paragraph: '<p>Just before the lines start forming</p>...',
  published: true,
  published_at: moment().format(),
  updated_at: moment().format(),
  sections: [
    {
      type: 'slideshow',
      items: [
        { type: 'artwork', id: '54276766fd4f50996aeca2b8' }
        { type: 'image', url: '', caption: '' }
        { type: 'video', url: 'http://youtu.be/yYjLrJRuMnY'  }
      ]
    }
    {
      type: 'image',
      url: 'http://gemini.herokuapp.com/123/miaart-banner.jpg'
    }
    {
      type: 'text',
      body: '<p><h1>10. Lisson Gallery</h1></p><p>Mia Bergeron merges the <em>personal</em> and <em>universal</em>...',
    }
    {
      type: 'artworks',
      ids: ['5321b73dc9dc2458c4000196', '5321b71c275b24bcaa0001a5'],
      layout: 'overflow_fillwidth',
      artworks: [
        {
          type: 'artwork'
          id: '5321b73dc9dc2458c4000196'
          slug: "govinda-sah-azad-in-between-1",
          date: "2015",
          title: "In Between",
          image: "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg",
          partner: {
            name: "October Gallery",
            slug: "october-gallery"
          },
          artist: {
            name: "Govinda Sah 'Azad'",
            slug: "govinda-sah-azad"
          }
        },{
          type: 'artwork'
          id: '5321b71c275b24bcaa0001a5'
          slug: "govinda-sah-azad-in-between-2",
          date: "2015",
          title: "In Between 2",
          image: "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ2/larger.jpg",
          partner: {
            name: "October Gallery",
            slug: "october-gallery"
          },
          artist: {
            name: "Govinda Sah 'Azad'",
            slug: "govinda-sah-azad"
          }
        }
      ]
    }
    {
      type: 'text',
      body: 'Check out this video art:',
    }
    {
      type: 'video',
      url: 'http://youtu.be/yYjLrJRuMnY'
    }
  ]
  featured_artist_ids: ['5086df098523e60002000012']
  featured_artwork_ids: ['5321b71c275b24bcaa0001a5']
  gravity_id: '502a6debe8b6470002000004'
  section_ids: []
  is_super_article: false
  super_article: {
    related_articles: ['5086df098523e60002000012']
  }
  hero_section: {}
  channel_id: '5086df098523e60002000011'

@searchResult =
  model: 'artwork'
  id: 'maya-hayuk-untitled'
  display: 'Maya Hayuk - 42 Artworks, Bio & Shows on Artsy'
  image_url: 'https://i.embed.ly/1/display/crop?width=70&heig'
  display_model: 'Artwork'

@parselyArticle =
  _hits: 84,
  author: "Gray Holubar",
  authors: [
    "Gray Holubar"
  ],
  image_url: "http://artsy-media-uploads.s3.amazonaws.com/YBYl5pkWUiTU5kxQjyBMkA%2Fmg.jpg",
  link: "https://www.artsy.net/article/gray-holubar-how-to-get-an-internship-at-artsy-part-i",
  metadata: "",
  pub_date: "2015-12-14T21:32:00",
  section: "Life at Artsy",
  tags: [],
  thumb_url_medium: "https://images.parsely.com/9aLe2Lkm2F_QIIUBEZJvrzSyGc8=/85x85/smart/http%3A//artsy-media-uploads.s3.amazonaws.com/YBYl5pkWUiTU5kxQjyBMkA%252Fmg.jpg",
  title: "How to Get an Internship at Artsy—Part I",
  url: "https://www.artsy.net/article/gray-holubar-how-to-get-an-internship-at-artsy-part-i"
