import path from 'path'
import jade from 'jade'
import fs from 'fs'
import Article from 'desktop/models/article.coffee'
import Channel from 'desktop/models/channel.coffee'

const render = (templateName) => {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), {filename})
}

describe('Article Templates', () => {
  it('renders articles in a team channel', () => {
    const html = render('article')({
      article: new Article({
        title: 'Channel title',
        sections: [],
        contributing_authors: []
      }),
      channel: new Channel({
        type: 'team',
        name: 'Gallery Insights',
        links: []
      }),
      crop: url => url,
      resize: url => url,
      moment: () => {},
      asset: () => {},
      sd: {}
    })
    html.should.containEql('is-team-channel')
    html.should.containEql('team-channel-nav')
    html.should.containEql('Gallery Insights')
  })
})
