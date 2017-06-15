import * as routes from '../routes'
import Backbone from 'backbone'
import CurrentUser from '../../../models/current_user.coffee'
import sinon from 'sinon'
import { fabricate } from 'antigravity'
import { __RewireAPI__ as RoutesRewireApi } from '../routes'

describe('#redirectToSubmissionFlow', () => {
  let req
  let res
  let next

  beforeEach(() => {
    sinon.stub(Backbone, 'sync')
    req = {
      body: {},
      user: new CurrentUser(fabricate('user'))
    }
    res = { redirect: sinon.stub() }
    next = sinon.stub()
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  it('redirects to the submission page', async () => {
    await routes.redirectToSubmissionFlow(req, res, next)
    res.redirect.args[0][0].should.eql('/consign2/submission')
  })
})

describe('#submissionFlowWithFetch', () => {
  let req
  let res
  let next
  let request

  beforeEach(() => {
    sinon.stub(Backbone, 'sync')
    req = {
      body: {},
      params: { id: 'sub-1' },
      user: new CurrentUser(fabricate('user'))
    }
    res = {
      locals: {
        sd: {
          CONVECTION_APP_URL: 'https://test-convection.artsy.net'
        }
      },
      render: sinon.stub()
    }
    next = sinon.stub()
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  it('sets the correct variables', async () => {
    const artistQuery = {
      artist: {
        id: 'andy-warhol',
        name: 'Andy Warhol'
      }
    }
    request = sinon.stub()
    request.get = sinon.stub().returns(request)
    request.set = sinon.stub().returns({ body: { id: 'my-submission' } })

    RoutesRewireApi.__Rewire__('request', request)
    RoutesRewireApi.__Rewire__('fetchToken', sinon.stub().returns('foo-token'))
    RoutesRewireApi.__Rewire__('metaphysics', sinon.stub().returns(Promise.resolve(artistQuery)))
    await routes.submissionFlowWithFetch(req, res, next)
    res.render.args[0][0].should.eql('submission_flow')
    res.render.args[0][1].user.should.not.eql(undefined)
    res.locals.sd.SUBMISSION.id.should.eql('my-submission')
    res.locals.sd.SUBMISSION_ARTIST_NAME.should.eql('Andy Warhol')
  })
})

