import { renderLayout } from '@artsy/stitch'
import { AuthStatic } from '../components/AuthStatic'
import { MobileAuthStatic } from '../components/MobileAuthStatic'
import { index, resetPassword } from '../routes'

jest.mock('@artsy/stitch', () => ({
  renderLayout: jest.fn(),
}))

describe('Routes', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {
      path: '/',
      query: {},
    }
    res = {
      locals: {
        sd: {
          IS_MOBILE: false,
        },
      },
      send: jest.fn(),
    }
    next = jest.fn()
    renderLayout.mockReset()
  })

  describe('#index', () => {
    describe('Component', () => {
      it('Returns AuthStatic component if UA is desktop', done => {
        index(req, res, next).then(() => {
          expect(renderLayout.mock.calls[0][0].blocks.body).toBe(AuthStatic)
          done()
        })
      })

      it('Returns MobileAuthStatic component if sd.IS_MOBILE', done => {
        res.locals.sd.IS_MOBILE = true
        index(req, res, next).then(() => {
          expect(renderLayout.mock.calls[0][0].blocks.body).toBe(
            MobileAuthStatic
          )
          done()
        })
      })
    })

    describe('Data', () => {
      describe('Type', () => {
        it('Returns login type by default', done => {
          index(req, res, next).then(() => {
            expect(renderLayout.mock.calls[0][0].data.type).toBe('login')
            done()
          })
        })

        it('Returns the correct modal.type for /login path', done => {
          req.path = '/login'
          index(req, res, next).then(() => {
            expect(renderLayout.mock.calls[0][0].data.type).toBe('login')
            done()
          })
        })

        it('Returns the correct modal.type for /signup path', done => {
          req.path = '/signup'
          index(req, res, next).then(() => {
            expect(renderLayout.mock.calls[0][0].data.type).toBe('signup')
            done()
          })
        })

        it('Returns the correct modal.type for /forgot path', done => {
          req.path = '/forgot'
          index(req, res, next).then(() => {
            expect(renderLayout.mock.calls[0][0].data.type).toBe(
              'reset_password'
            )
            done()
          })
        })
      })

      describe('Meta', () => {
        it('returns the correct title for login', done => {
          index(req, res, next).then(() => {
            expect(renderLayout.mock.calls[0][0].data.meta.title).toBe(
              'Login to Artsy'
            )
            done()
          })
        })

        it('returns the correct title for signup', done => {
          req.path = '/signup'
          index(req, res, next).then(() => {
            expect(renderLayout.mock.calls[0][0].data.meta.title).toBe(
              'Signup for Artsy'
            )
            done()
          })
        })
      })

      it('Options returns all expected fields from query', done => {
        req.query = {
          afterSignUpAction: 'after signup',
          destination: '/foo',
          redirectTo: '/bar',
          signupIntent: 'follow artist',
          signupReferer: 'referrer',
        }
        index(req, res, next).then(() => {
          const {
            afterSignUpAction,
            destination,
            redirectTo,
            signupIntent,
            signupReferer,
          } = renderLayout.mock.calls[0][0].data.options

          expect(afterSignUpAction).toBe(req.query.afterSignUpAction)
          expect(destination).toBe(req.query.destination)
          expect(redirectTo).toBe(req.query.redirectTo)
          expect(signupIntent).toBe(req.query.signupIntent)
          expect(signupReferer).toBe(req.query.signupReferer)
          done()
        })
      })
    })
  })

  describe('#resetPassword', () => {
    it('does a thing', () => {
      // resetPassword(req, res)
    })
  })
})
