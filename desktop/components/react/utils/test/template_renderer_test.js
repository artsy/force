import { makeTemplate, __RewireAPI__ } from '../template_renderer'

describe('components/react/utils/template_renderer.js', () => {
  const output = (content) => (locals = {}) => `
    <html>
      <body>
        ${content} ${JSON.stringify(locals)}
      </body>
    </html>
  `

  before(() => {
    __RewireAPI__.__Rewire__('jade', {
      compileFile: (content) => output(content)
    })
  })

  after(() => {
    __RewireAPI__.__ResetDependency__('jade')
  })

  it('throws error if incorrect parameters are passed', () => {
    it('throws if a renderer is not provided', () => {
      (() => {
        makeTemplate()
      }).should.throw()
    })
  })

  it('should be a function function', () => {
    makeTemplate.should.be.type('function')
  })

  it('accepts a string or an array of template paths, and returns a string or an array', () => {
    makeTemplate('foo').should.be.type('string')
    makeTemplate(['foo', 'bar']).length.should.eql(2)
  })

  it('`render` accept locals and renders them into the template', () => {
    makeTemplate('foo', { locals: { name: 'will' } }).should.containEql('foo')
    makeTemplate('foo', { locals: { name: 'will' } }).should.containEql('will')
    makeTemplate(['foo', 'bar'], { locals: { name: 'burroughs' } })[1].should.containEql('bar')
    makeTemplate(['foo', 'bar'], { locals: { name: 'burroughs' } })[1].should.containEql('burroughs')
  })

  it('returns an array of rendered template html when `render` is called', () => {
    makeTemplate('foo').should.containEql('<html>')
    makeTemplate(['foo']).should.containEql('</html>')
    makeTemplate(['foo', 'bar'])[0].should.containEql('<html>')
    makeTemplate(['foo', 'bar'])[1].should.containEql('</html>')
  })

  it('accepts an express basePath', (done) => {
    __RewireAPI__.__Rewire__('jade', {
      compileFile: (path) => {
        path.should.eql('views/foo')
        done()
        return () => {}
      }
    })

    makeTemplate('foo', {
      basePath: 'views'
    })
  })
})
