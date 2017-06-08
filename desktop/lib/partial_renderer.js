import invariant from 'invariant'
import { isArray, isFunction, isString } from 'underscore'

/**
 * Render one or many partials and return a Promise on success
 *
 * @example
 *
 * try {
 *   const [header,  footer] = await partialRenderer(res, [
 *     '/path/to/header.jade',
 *     '/path/to/footer.jade'
 *   ])
 *
 *   res.render('index.jsx', {
 *     header,
 *     footer
 *   })
 * } catch (error) {
 *   next()
 * }
 *
 * @param  {Function} res An express `response` object
 * @return {Promise} If success, an array of rendered html partials
 */
export default function partialRenderer (res, partials, locals) {
  invariant(isFunction(res.render),
    '(lib/partial_renderer.js) ' +
    'Error rendering partials: `res.render` must be a function'
  )

  const isValid = isArray(partials) || isString(partials)

  invariant(isValid,
    '(lib/partial_renderer.js) ' +
    'Error rendering partials: `partials` must be a string or array of ' +
    'strings representing the path to the template'
  )

  const partialSet = isArray(partials)
    ? partials
    : [partials]

  const { render } = renderPartial(res, locals)

  return Promise.all(
    partialSet.map(render)
  )
}

export function renderPartial (res, locals = {}) {
  invariant(isFunction(res.render),
    '(lib/partial_renderer.js) ' +
    'Error rendering partial: `res.render` must be a function'
  )

  return {
    render: (path) => {
      const isValid = isString(path) || isFunction(path)

      invariant(isValid,
        '(lib/partial_renderer.js) ' +
        'Error rendering partial: `path` must be a string'
      )

      return new Promise((resolve, reject) => {
        res.render(path, locals, (error, html) => {
          if (error) {
            reject(error)
          } else {
            resolve(html)
          }
        })
      })
    }
  }
}
