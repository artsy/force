moment = require 'moment'

@vertical =
  id: '55356a9deca560a0137aa4b7'
  title: 'Vennice Biennalez'
  description: 'The coolest biennale'
  slug: 'vennice-biennale'
  partner_logo_url: 'http://gemini.herokuapp.com/123/miaart-banner.jpg'
  thumbnail_url: 'http://gemini.herokuapp.com/123/miaart-banner.jpg'
  featured_links: [{ title: 'foo', thumbnail_url: 'bar.jpg', url: 'foo.com' }]

@section =
  id: '55356a9deca560a0137aa4b7'
  title: 'Vennice Biennalez'
  description: 'The coolest biennale'
  slug: 'vennice-biennale'
  partner_logo_url: 'http://gemini.herokuapp.com/123/miaart-banner.jpg'
  thumbnail_url: 'http://gemini.herokuapp.com/123/miaart-banner.jpg'
  featured_links: [{ title: 'foo', thumbnail_url: 'bar.jpg', url: 'foo.com' }]

@article =
  id: '54276766fd4f50996aeca2b8'
  author_id: '4d8cd73191a5c50ce210002a'
  author:
    id: "506999f123c3980002000342"
    name: "Elena Soboleva"
    profile_id: "5086df0a8523e60002000015"
    profile_handle: "elena"
  thumbnail_title: 'Top Ten Booths at miart 2014',
  thumbnail_teaser: 'Look here! Before the lines start forming...',
  thumbnail_image: 'http://kitten.com',
  tags: ['Fair Coverage', 'Magazine']
  title: 'Top Ten Booths',
  lead_paragraph: '<p>Just before the lines start forming</p>...',
  published: true,
  published_at: moment().format(),
  updated_at: moment().format(),
  is_super_article: false
  super_article:
    related_articles: []
  sections: [
    {
      type: 'slideshow',
      items: [
        { type: 'artwork', id: '54276766fd4f50996aeca2b8' }
        { type: 'image', url: '', caption: '' }
        { type: 'video', url: '', caption: '' }
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
      layout: 'overflow_fillwidth'
      artworks: [
        type: 'artwork'
        id: '570faa047622dd65850017e2'
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
      ]
    }
    {
      type: 'text',
      body: 'Check out this video art:',
    }
    {
      type: 'video',
      url: 'http://youtu.be/yYjLrJRuMnY',
      caption: 'Doug and Claire get sucked into a marathon of Battlestar Galactica from Season 2 of Portlandia on IFC.'
    }
  ]
  featured_artist_ids: ['5086df098523e60002000012']
  featured_artwork_ids: ['5321b71c275b24bcaa0001a5']
  gravity_id: '502a6debe8b6470002000004'
  contributing_authors: []
  section_ids: []
