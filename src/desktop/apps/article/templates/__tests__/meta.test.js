import * as _ from 'underscore'
import path from 'path'
import jade from 'jade'
import fs from 'fs'
import Article from 'desktop/models/article.coffee'
import fixtures from 'desktop/test/helpers/fixtures.coffee'

const render = templateName => {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe('Meta template', () => {
  it('contains basic meta tags', () => {
    const article = _.extend({}, fixtures.article, {
      slug: 'artsy-editorial-slug',
      indexable: true,
      description: 'Artsy Editorial is an editorial channel.',
      social_description: 'Artsy Editorial is socially friendly.',
      social_image: 'http://kitten-social.com'
    })
    const html = render('meta')({
      article,
      crop: url => url,
      sd: {
        APP_URL: 'https://www.artsy.net',
        CURRENT_PATH: '/article/artsy-editorial-slug'
      }
    })
    html.should.containEql(
      '<title>Top Ten Booths at miart 2014 - Artsy</title>'
    )
    html.should.containEql(
      '<link rel="canonical" href="https://www.artsy.net/article/artsy-editorial-slug"/>'
    )
    html.should.containEql(
      '<meta name="description" content="Artsy Editorial is an editorial channel."/>'
    )
    html.should.containEql(
      '<meta property="og:description" content="Artsy Editorial is socially friendly."/>'
    )
    html.should.containEql(
      '<meta property="og:image" content="http://kitten-social.com"/>'
    )
    html.should.not.containEql('<meta name="robots" content="noindex"/>')
  })

  it('uses a different title extension for news', () => {
    const article = _.extend({}, fixtures.article, {
      slug: 'artsy-editorial-slug',
      description: 'Artsy Editorial is an editorial channel.',
      social_description: 'Artsy Editorial is socially friendly.',
      social_image: 'http://kitten-social.com',
      layout: 'news'
    })
    const html = render('meta')({
      article,
      crop: url => url,
      sd: {
        APP_URL: 'https://www.artsy.net',
        CURRENT_PATH: '/news/artsy-editorial-slug'
      }
    })
    html.should.containEql(
      '<title>Top Ten Booths at miart 2014 - Artsy News</title>'
    )
    html.should.containEql(
      '<link rel="canonical" href="https://www.artsy.net/news/artsy-editorial-slug"/>'
    )
  })
})

describe('Classic meta template', () => {
  it('contains basic meta tags', () => {
    const article = _.extend({}, fixtures.article, {
      slug: 'gallery-insights-slug',
      indexable: true,
      description: 'Gallery Insights is a team channel.',
      social_description:
        'Gallery Insights is a socially friendly team channel.',
      social_image: 'http://kitten-social.com'
    })
    const html = render('classic_meta')({
      article: new Article(article),
      crop: url => url,
      sd: {}
    })
    html.should.containEql('<title>Top Ten Booths at miart 2014</title>')
    html.should.containEql(
      '<link rel="canonical" href="undefined/article/gallery-insights-slug"/>'
    )
    html.should.containEql(
      '<meta property="description" content="Gallery Insights is a team channel."/>'
    )
    html.should.containEql(
      '<meta name="og:description" content="Gallery Insights is a socially friendly team channel."/>'
    )
    html.should.containEql(
      '<meta property="og:image" content="http://kitten-social.com"/>'
    )
    html.should.not.containEql('<meta name="robots" content="noindex"/>')
  })
})
