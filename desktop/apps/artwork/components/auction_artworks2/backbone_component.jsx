import React, { Component }  from 'react'
import ReactDOM from 'react-dom'
import TemplateRenderer from './template_renderer.jsx'
import invariant from 'invariant'
import { invoke, isArray, isEmpty } from 'underscore'

export default function backboneComponent(config) {
  const {
    views,
    shouldMount = false
  } = config

  const isValid = isArray(views) && !isEmpty(views)

  invariant(isValid,
    '(future/path/to/lib.jsx) ' +
    'Error creating <BackboneViewComponent />: an array of `views` must' +
    'be provided.'
  )

  return (BackboneComponent) => {
    class BackboneComponentWrapper extends Component {

      constructor(props) {
        super(props)

        this.state = {
          views: []
        }
      }

      componentWillMount() {
        this.setState({
          views: views.reduce((classMap, view) => {
            return {
              ...classMap,
              [view.name]: class extends Component {
                componentWillMount() {

                }

                componentWillUnmount() {
                  view.remove()
                }

                render() {
                  return (
                    <TemplateRenderer
                      {...this.props}
                    />
                  )
                }
              }
            }
          }, {})
        })
      }

      componentWillUnmount() {
        invoke(this.views, 'remove')
      }

      render() {
        return (
          <BackboneComponent
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
            <BackboneComponentWrapper
              {...bootstrapData}
            />
          , mountPoint)
        }
      }
    } else {
      return BackboneComponentWrapper
    }
  }
}
