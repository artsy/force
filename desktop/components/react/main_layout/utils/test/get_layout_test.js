import getLayout from '../get_layout'

describe('components/react/main_layout/utils/get_layout.js', () => {
  before(() => {
    getLayout.__Rewire__('makeTemplate', () => ({
      render: (...content) => content
    }))
  })

  after(() => {
    getLayout.__ResetDependency__('makeTemplate')
  })

  it('returns a Header, Body and Footer ', () => {
    getLayout().render().should.have.keys('Header', 'Body', 'Footer')
  })

  it('returns renderable layout components', () => {
    const { Header, Body, Footer } = getLayout().render()
    Header({}).type.should.eql('div')
    Body({}).type.should.eql('div')
    Footer({}).type.should.eql('div')
  })
})
