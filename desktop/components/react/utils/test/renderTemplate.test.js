import renderTemplate from '../render_template'

describe('components/react/utils/render_template.js', () => {
  const output = (content) => (locals = {}) => `
    <html>
      <body>
        ${content} ${JSON.stringify(locals)}
      </body>
    </html>
  `

  before(() => {
    renderTemplate.__Rewire__('jade', {
      compileFile: (content) => output(content)
    })
  })

  after(() => {
    renderTemplate.__ResetDependency__('jade')
  })

  it('throws error if incorrect parameters are passed', () => {
    it('throws if a renderer is not provided', () => {
      (() => {
        renderTemplate()
      }).should.throw()
    })
  })

  it('should be a function function', () => {
    renderTemplate.should.be.type('function')
  })

  it('accepts a string or an array of template paths, and returns a string or an array', () => {
    renderTemplate('foo').should.be.type('string')
    renderTemplate(['foo', 'bar']).length.should.eql(2)
  })

  it('`render` accept locals and renders them into the template', () => {
    renderTemplate('foo', { locals: { name: 'will' } }).should.containEql('foo')
    renderTemplate('foo', { locals: { name: 'will' } }).should.containEql('will')
    renderTemplate(['foo', 'bar'], { locals: { name: 'burroughs' } })[1].should.containEql('bar')
    renderTemplate(['foo', 'bar'], { locals: { name: 'burroughs' } })[1].should.containEql('burroughs')
  })

  it('returns an array of rendered template html when `render` is called', () => {
    renderTemplate('foo').should.containEql('<html>')
    renderTemplate(['foo']).should.containEql('</html>')
    renderTemplate(['foo', 'bar'])[0].should.containEql('<html>')
    renderTemplate(['foo', 'bar'])[1].should.containEql('</html>')
  })

  it('accepts an express basePath', (done) => {
    renderTemplate.__Rewire__('jade', {
      compileFile: (path) => {
        path.should.eql('views/foo')
        done()
        return () => {}
      }
    })

    renderTemplate('foo', {
      basePath: 'views'
    })
  })
})
