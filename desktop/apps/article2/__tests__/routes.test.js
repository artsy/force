import * as routes from 'desktop/apps/article2/routes'
import * as fixtures from 'desktop/test/helpers/fixtures.coffee'
import sinon from 'sinon'
import { __RewireAPI__ as RoutesRewireApi } from '../routes'

describe('#index', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {
      body: {},
      params: { slug: 'foobar' }
    }
    res = {
      app: { get: sinon.stub().returns('components') },
      locals: { sd: {} },
      render: sinon.stub(),
      send: sinon.stub()
    }
    next = sinon.stub()
  })

  afterEach(() => {
    RoutesRewireApi.__ResetDependency__('positronql')
  })

  it('renders the index with the correct variables', (done) => {
    const data = {
      article: fixtures.article
    }
    RoutesRewireApi.__Rewire__(
      'positronql',
      sinon.stub().returns(Promise.resolve(data))
    )
    const renderReactLayout = sinon.stub()
    RoutesRewireApi.__Rewire__('renderReactLayout', renderReactLayout)
    routes.index(req, res, next)
      .then(() => {
        renderReactLayout.args[0][0].data.article.title.should.equal('Top Ten Booths')
        renderReactLayout.args[0][0].locals.assetPackage.should.equal('article2')
        done()
      })
  })
})
