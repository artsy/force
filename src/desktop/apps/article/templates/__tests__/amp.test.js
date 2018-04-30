import * as _ from 'underscore'
import embed from 'particle'
import fs from 'fs'
import jade from 'jade'
import path from 'path'
import * as Fixtures from '@artsy/reaction/dist/Components/Publishing/Fixtures/Components'
import Article from 'desktop/models/article.coffee'
import fixtures from 'desktop/test/helpers/fixtures.coffee'

const render = templateName => {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe('AMP Templates', () => {
  let res

  beforeEach(() => {
    res = {
      article: new Article(fixtures.article),
      crop: url => url,
      embed,
      resize: url => url,
      moment: () => {},
      asset: () => {},
      sd: {},
      _
    }
  })

  it('renders headers and footers', () => {
    const html = render('amp_article')(res)

    html.should.containEql('icon-logotype')
    html.should.containEql(
      '<h1 class="large-garamond-header">Top Ten Booths</h1>'
    )
    html.should.containEql('Just before the lines start forming')
    html.should.containEql('<div class="article-author">Elena Soboleva</div>')
  })

  it('renders article content', () => {
    const html = render('amp_article')(res)

    html.should.containEql('Lisson Gallery')
    html.should.containEql('Courtesy of Guggenheim.')
    html.should.containEql(
      'https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ2/larger.jpg'
    )
    html.should.containEql(
      '<amp-img src="http://img.jpg" layout="responsive" width="600" height="NaN"></amp-img>'
    )
  })

  describe('embed sections', () => {
    it('renders embed', () => {
      res.article = new Article({
        sections: Fixtures.Embeds
      })
      const html = render('amp_article')(res)
      html.should.containEql(
        '<amp-iframe src="https://artsy-vanity-files-production.s3.amazonaws.com/documents/1parrasch.html"'
      )
    })

    it('renders social_embed twitter', () => {
      res.article = new Article({
        sections: [Fixtures.SocialEmbedTwitter]
      })
      const html = render('amp_article')(res)
      html.should.containEql('<amp-twitter data-tweetid="965246051107164160"')
    })

    it('renders social_embed instagram', () => {
      res.article = new Article({
        sections: [Fixtures.SocialEmbedInstagram]
      })
      const html = render('amp_article')(res)
      html.should.containEql('<amp-instagram data-shortcode="BfJ2TU9F6sm"')
    })
  })

  describe('image sections', () => {
    it('renders image_collection sections', () => {
      res.article = new Article({
        sections: [
          {
            type: 'image_collection',
            images: [
              {
                type: 'image',
                url: 'http://image.com',
                caption: '<p>An image caption.</p>'
              }
            ]
          }
        ]
      })
      const html = render('amp_article')(res)

      html.should.containEql('<amp-img src="http://image.com"')
      html.should.containEql('An image caption.')
    })

    it('renders image_set sections', () => {
      res.article = new Article({
        sections: [
          {
            type: 'image_set',
            images: [
              {
                type: 'image',
                url: 'http://image.com',
                caption: '<p>An image caption.</p>'
              }
            ]
          }
        ]
      })
      const html = render('amp_article')(res)

      html.should.containEql('<amp-carousel')
      html.should.containEql('<amp-img src="http://image.com"')
      html.should.containEql('An image caption.')
    })
  })

  describe('video sections', () => {
    it('renders youtube videos', () => {
      res.article = new Article({
        sections: [_.extend(Fixtures.Videos[0], { type: 'video' })]
      })
      const html = render('amp_article')(res)
      html.should.containEql('<amp-youtube')
      html.should.containEql(
        'What motivates patrons to fund artists’ wildest dreams?'
      )
    })

    it('renders vimeo videos', () => {
      res.article = new Article({
        sections: [_.extend(Fixtures.Videos[1], { type: 'video' })]
      })
      const html = render('amp_article')(res)
      html.should.containEql('<amp-vimeo')
      html.should.containEql(
        '2016 was a memorable year for the world, and art along with it.'
      )
    })
  })

  it('includes analytics', () => {
    res.article.set({ channel_id: null })
    const html = render('amp_article')(res)

    html.should.containEql('"properties.articleSection": "Other"')
    html.should.containEql('<amp-analytics type="segment">')
  })

  it('includes artsy-icon fonts and fonts.com link', () => {
    res.article.set({ channel_id: null })
    res.sd = { WEBFONT_URL: 'https://webfonts.artsy.net' }
    const html = render('amp_article')(res)

    html.should.containEql(
      'https://fast.fonts.net/cssapi/f7f47a40-b25b-44ee-9f9c-cfdfc8bb2741.css'
    )
    html.should.containEql('https://webfonts.artsy.net/artsy-icons.eot?uo9ko')
    html.should.containEql('<style type="text/css" amp-custom="amp-custom">')
  })
})
