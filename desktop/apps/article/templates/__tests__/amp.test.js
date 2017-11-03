import path from 'path'
import jade from 'jade'
import fs from 'fs'
import Article from 'desktop/models/article.coffee'
import fixtures from 'desktop/test/helpers/fixtures.coffee'

const render = (templateName) => {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), {filename})
}

describe('AMP Templates', () => {
  it('renders headers and footers', () => {
    const html = render('amp_article')({
      article: new Article(fixtures.article),
      crop: url => url,
      resize: url => url,
      moment: () => {},
      asset: () => {},
      sd: {}
    })
    html.should.containEql('icon-logotype')
    html.should.containEql('<h1 class="large-garamond-header">Top Ten Booths</h1>')
    html.should.containEql('Just before the lines start forming')
    html.should.containEql('<div class="article-author">Elena Soboleva</div>')
  })

  it('renders sections', () => {
    const html = render('amp_article')({
      article: new Article(fixtures.article),
      crop: url => url,
      resize: url => url,
      moment: () => {},
      asset: () => {},
      sd: {}
    })
    html.should.containEql('Lisson Gallery')
    html.should.containEql('Courtesy of Guggenheim.')
    html.should.containEql('https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ2/larger.jpg')
    html.should.containEql('<amp-img src="http://img.jpg" layout="responsive" width="600" height="NaN"></amp-img>')
  })

  it('includes analytics', () => {
    const article = new Article(fixtures.article).set({channel_id: null})
    const html = render('amp_article')({
      article,
      crop: url => url,
      resize: url => url,
      moment: () => {},
      asset: () => {},
      sd: {}
    })
    html.should.containEql('"properties.articleSection": "Other"')
    html.should.containEql('<amp-analytics type="segment">')
  })
})
