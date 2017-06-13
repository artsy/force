import templateRenderer from '../template_renderer'

describe('components/react/utils/template_renderer.js', () => {
  const output = (content) => (locals = {}) => `
    <html>
      <body>
        ${content} ${JSON.stringify(locals)}
      </body>
    </html>
  `

  before(() => {
    templateRenderer.__Rewire__('jade', {
      compileFile: (content) => output(content)
    })
  })

  after(() => {
    templateRenderer.__ResetDependency__('jade')
  })

  it('throws error if incorrect parameters are passed', () => {
    it('throws if a renderer is not provided', () => {
      (() => {
        templateRenderer()
      }).should.throw()
    })
  })

  it('returns a render function', () => {
    templateRenderer('foo').render.should.be.type('function')
  })

  it('accepts a string or an array of template paths', () => {
    templateRenderer('foo').render().length.should.eql(1)
    templateRenderer(['foo', 'bar']).render().length.should.eql(2)
  })

  it('`render` accept locals and renders them into the template', () => {
    templateRenderer('foo').render({ name: 'will' })[0].should.containEql('foo')
    templateRenderer('foo').render({ name: 'will' })[0].should.containEql('will')
    templateRenderer(['foo', 'bar']).render({ name: 'burroughs' })[1].should.containEql('bar')
    templateRenderer(['foo', 'bar']).render({ name: 'burroughs' })[1].should.containEql('burroughs')
  })

  it('returns an array of rendered template html when `render` is called', () => {
    templateRenderer('foo').render()[0].should.containEql('<html>')
    templateRenderer(['foo']).render()[0].should.containEql('</html>')
  })

  it('accepts an express basePath', (done) => {
    const app = {
      get: (key) => key
    }

    templateRenderer.__Rewire__('jade', {
      compileFile: (path) => {
        path.should.eql('views/foo')
        done()
      }
    })

    templateRenderer('foo', { app }).render()
  })
})
