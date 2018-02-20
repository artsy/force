import sinon from 'sinon'
import App from 'desktop/apps/categories/components/App'
import { index } from 'desktop/apps/categories/routes'

const rewire = require('rewire')('../../categories/routes')

let req
let res
let next
let geneFamiliesQuery
let renderLayout
let revertRewire

describe('#index', () => {
  beforeEach(() => {
    req = {
      app: {
        get: sinon
          .stub()
          .withArgs('views')
          .returns('components'),
      },
    }
    res = {}
    next = sinon.stub()
    geneFamiliesQuery = {
      gene_families: {
        edges: [
          {
            node: {
              id: 'materials',
              name: 'Materials',
              genes: [
                {
                  id: 'silver',
                  name: 'Silver',
                },
                {
                  id: 'gold',
                  name: 'Gold',
                },
              ],
            },
          },
        ],
      },
    }

    revertRewire = rewire.__set__(
      'metaphysics',
      sinon.stub().returns(Promise.resolve(geneFamiliesQuery))
    )

    renderLayout = sinon.stub()
    rewire.__set__('renderLayout', renderLayout)
  })

  afterEach(() => {
    revertRewire()
  })

  it('renders the categories app', () => {
    index(req, res, next).then(() => {
      renderLayout.args[0][0].blocks.body.should.equal(App)
      renderLayout.args[0][0].locals.assetPackage.should.equal('categories')
    })
  })
  it('passes the correct variables', () => {
    index(req, res, next).then(() => {
      const expectedFamilies = [
        {
          id: 'materials',
          name: 'Materials',
          genes: [
            {
              id: 'silver',
              name: 'Silver',
            },
            {
              id: 'gold',
              name: 'Gold',
            },
          ],
        },
      ]
      renderLayout.args[0][0].data.geneFamilies.should.eql(expectedFamilies)
    })
  })
})
