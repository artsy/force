import sinon from 'sinon'

const rewire = require('rewire')('../routes')
const { index } = rewire

describe('Personalize routes', () => {
  let req
  let res
  let next
  let renderLayout

  beforeEach(() => {
    req = {
      body: {},
      params: { slug: 'interests' },
      redirect: sinon.stub(),
    }
    res = {
      send: sinon.stub(),
    }
    next = sinon.stub()
  })

  renderLayout = sinon.stub()
  rewire.__set__('renderLayout', renderLayout)

  it('renders the personalize app', () => {
    index(req, res, next).then(() => {
      renderLayout.args[0][0].data.title.should.eql('Personalize | Artsy')
      renderLayout.args[0][0].locals.assetPackage.should.eql('onboarding')
    })
  })
})
