import getForceLayout from '../get_force_layout'

describe('components/react/main_layout/utils/get_force_layout.js', () => {
  before(() => {
    getForceLayout.__Rewire__('renderTemplate', (...content) => content)
  })

  after(() => {
    getForceLayout.__ResetDependency__('renderTemplate')
  })

  it('returns a Header, Body and Footer ', () => {
    getForceLayout().should.have.keys('Header', 'Body', 'Footer')
  })

  it('returns renderable layout components', () => {
    const { Header, Body, Footer } = getForceLayout()
    Header({}).type.should.eql('div')
    Body({}).type.should.eql('div')
    Footer({}).type.should.eql('div')
  })
})
