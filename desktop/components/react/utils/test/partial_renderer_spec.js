import partialRenderer, { renderPartial } from '../partial_renderer'

describe('lib/partial_renderer.js', () => {
  describe('#partialRenderer', () => {
    it('throws if a renderer is not provided', () => {
      (() => {
        partialRenderer()
      }).should.throw()
    })

    it('when invoked returns a function', () => {
      partialRenderer({ render: () => {} }, '')
        .then.should.be.type('function')
    })

    it('resolves with an error on error', (done) => {
      const res = {
        render: (path, locals, callback) => {
          callback(new Error('nope'))
        }
      }

      partialRenderer(res, 'foo')
        .catch((error) => {
          error.message.should.eql('nope')
          done()
        })
    })

    it('resolves with an array of partial html on success', (done) => {
      const templateA = (locals) => `
        <html>
          <body>
            ${locals.name}
          </body>
        </html
      `

      const templateB = (locals) => `
        <html>
          <body>
            ${locals.novels}
          </body>
        </html
      `
      const res = {
        render: (path, locals, callback) => {
          callback(undefined, path(locals))
        }
      }

      const locals = {
        name: 'William Burroughs',
        novels: 'Nova Express'
      }

      partialRenderer(res, [templateA, templateB], locals)
        .then(([a, b]) => {
          a.should.eql(templateA(locals))
          b.should.eql(templateB(locals))
          done()
        })
        .catch(done)
    })
  })

  describe('#renderPartial', () => {
    it('throws if a renderer is not provided', () => {
      (() => {
        renderPartial()
      }).should.throw()
    })

    it('when invoked returns a function', () => {
      const { render } = renderPartial({ render: () => {} })
      render.should.be.type('function')
    })

    it('resolves with an error on error', (done) => {
      const res = {
        render: (path, locals, callback) => {
          callback(new Error('nope'))
        }
      }

      renderPartial(res)
        .render('')
          .catch((error) => {
            error.message.should.eql('nope')
            done()
          })
    })

    it('resolves with html on success', (done) => {
      const template = (locals) => `
        <html>
          <body>
            ${locals.name}
          </body>
        </html
      `

      const res = {
        render: (path, locals, callback) => {
          callback(undefined, template(locals))
        }
      }

      const locals = {
        name: 'William Burroughs'
      }

      renderPartial(res, locals)
        .render('foo')
          .then((html) => {
            html.should.eql(template(locals))
            done()
          })
          .catch(done)
    })
  })
})
