import sinon from 'sinon'
import App from 'desktop/apps/categories3/components/App'
import {
  index,
  __RewireAPI__ as RoutesRewireApi
} from 'desktop/apps/categories3/routes'

let req
let res
let next
let geneFamiliesQuery
let renderReactLayout

describe('#index', () => {
  beforeEach(() => {
    req = {
      app: { get: sinon.stub().withArgs('views').returns('components') }
    }
    res = {}
    next = sinon.stub()
    geneFamiliesQuery = {
      gene_families: [
        {
          id: 'materials',
          name: 'Materials',
          genes: [
            {
              id: 'silver',
              name: 'Silver'
            },
            {
              id: 'gold',
              name: 'Gold'
            }
          ]
        }
      ]
    }

    RoutesRewireApi.__Rewire__(
      'metaphysics',
      sinon.stub().returns(Promise.resolve(geneFamiliesQuery))
    )

    renderReactLayout = sinon.stub()
    RoutesRewireApi.__Rewire__('renderReactLayout', renderReactLayout)
  })

  afterEach(() => {
    RoutesRewireApi.__ResetDependency__('metaphysics')
  })

  it('renders the categories app', () => {
    index(req, res, next).then(() => {
      renderReactLayout.args[0][0].blocks.body.should.equal(App)
      renderReactLayout.args[0][0].locals.assetPackage.should.equal(
        'categories3'
      )
    })
  })
  it('passes the correct variables', () => {
    index(req, res, next).then(() => {
      renderReactLayout.args[0][0].data.geneFamilies.should.equal(
        geneFamiliesQuery.gene_families
      )
    })
  })
})
