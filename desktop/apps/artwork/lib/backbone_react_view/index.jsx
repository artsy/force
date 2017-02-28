import React, { Component }  from 'react'
import ReactDOM from 'react-dom'
import invariant from 'invariant'
import { createBackboneView } from './backbone_view.jsx'
import { isArray, isEmpty } from 'underscore'

export default function backboneReactView(config) {
  const {
    shouldMount = false,
    views
  } = config

  const isValid = isArray(views) && !isEmpty(views)

  invariant(isValid,
    '(future/path/to/lib.jsx) ' +
    'Error creating ReactBackboneView: an array of `views` must' +
    'be provided.'
  )

  return (Container) => {
    class BackboneViewWrapper extends Component {

      state = {
        Views: []
      }

      /** Don't update instantiable Backbone.View classes within the render cycle */
      shouldComponentUpdate = () => false


      componentWillMount() {
        this.setState({
          Views: views.reduce((classMap, View) => {
            return {
              ...classMap,
              [View.name]: createBackboneView(View)
            }
          }, {})
        })
      }

      render() {
        return (
          <Container
            {...this.props}
            {...this.state}
          />
        )
      }
    }

    if (shouldMount) {
      return {
        mountReactComponent(selector, bootstrapData = {}) {
          const mountPoint = document.querySelector(selector)

          invariant(mountPoint,
            `Error mounting component to DOM: selector ${selector} not found. `
          )

          ReactDOM.render(
            <BackboneViewWrapper {...bootstrapData} />, mountPoint
          )
        }
      }
    } else {
      return BackboneViewWrapper
    }
  }
}
