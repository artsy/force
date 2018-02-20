import sinon from 'sinon'
import Backbone from 'backbone'
import { positronql, __RewireAPI__ as RewireApi } from 'desktop/lib/positronql'

describe('positronql', () => {
  const request = {}
  beforeEach(() => {
    request.set = sinon.stub().returns(request)
    request.query = sinon.stub().returns(request)
    request.end = sinon.stub().returns(request)
    request.get = sinon.stub().returns(request)
    RewireApi.__Rewire__('request', request)
  })

  it('accepts a query and variables and makes a request to the POSITRON_GRAPHQL_URL endpoint', async () => {
    request.end.yields(null, {
      body: {
        data: {
          articles: [
            {
              title: 'New York City Skyline',
            },
          ],
        },
      },
    })

    const data = await positronql({
      query: `
        query articles(published: true) {
          title
        }
      `,
      req: {
        user: new Backbone.Model({
          accessToken: '456',
        }),
      },
    })
    request.set.args[1][1].should.equal('456')
    request.query.args[0][0].query.should.containEql('published: true')
    data.articles[0].title.should.equal('New York City Skyline')
  })

  it('rejects and sets a 404 status code for content not found', async () => {
    request.end.yields(null, {
      body: {
        data: {
          articles: null,
        },
        errors: [
          {
            message: 'Article not found.',
          },
        ],
      },
    })

    await positronql({
      query: `
        query article(id: 'non-existent-article-slug') {
          title
        }
      `,
    }).catch((error) => {
      error.status.should.equal(404)
      error.toString().should.containEql('Article not found.')
    })
  })

  it('rejects and sets a 403 status code for unauthorized access (draft)', async () => {
    request.end.yields(null, {
      body: {
        data: {
          articles: null,
        },
        errors: [
          {
            message:
              'Must be a member of the channel to view an unpublished article.',
          },
        ],
      },
    })

    await positronql({
      query: `
        query article(id: 'draft-article') {
          title
        }
      `,
    }).catch((error) => {
      error.status.should.equal(403)
      error.toString().should.containEql('Must be a member')
    })
  })
})
