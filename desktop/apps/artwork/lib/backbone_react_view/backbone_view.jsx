import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import TemplateRenderer from './template_renderer.jsx'
import invariant from 'invariant'
import { camelize } from 'underscore.string'

export function createBackboneView(View) {
  invariant(View,
    '(lib/backbone_react_view/backbone_view.jsx) ' +
    'Error creating ReactBackboneView: `View` is undefined.'
  )

  class BackboneView extends Component {
    constructor(props) {
      super(props)

      this.backboneView = undefined
      this.node = undefined
      this.onTemplateRender = this.onTemplateRender.bind(this)
    }

    componentDidMount() {
      const { __id, template } = this.renderedTemplate

      // If a user doesn't provide an explicit ID, fallback to uniq
      const fallbackId = __id

      const {
        id = fallbackId,
        onRender,
        viewProps
      } = this.props

      try {
        this.backboneView = new View({ ...viewProps, id, instantiated: true })
        this.backboneView.$el.html(template)
        this.backboneView.render()
        this.node = ReactDOM.findDOMNode(this)
        this.node.innerHTML = this.backboneView.$el.html()
        this.backboneView.setElement(this.node)

        onRender({
          [this.instanceName]: {
            instance: this.backboneView,
            node: this.node
          }
        })
      } catch (error) {
        console.error( // eslint-disable-line
          '(lib/backbone_react_view/backbone_view.jsx) \n' +
          'Error rendering ReactBackboneView: ', error
        )
      }
    }

    componentWillUnmount() {
      this.backboneView.remove()

      this.props.onRemove({
        [this.instanceName]: {
          instance: this.backboneView,
          node: this.node
        }
      })
    }

    onTemplateRender(template) {
      this.renderedTemplate = template
    }

    get instanceName() {
      return this.props.name || camelize(View.name, true)
    }

    render() {
      const { className, data, template } = this.props

      return (
        <TemplateRenderer
          className={className}
          data={data}
          onRender={this.onTemplateRender}
          template={template}
        />
      )
    }
  }

  BackboneView.propTypes = {
    className: PropTypes.string,
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    onRender: PropTypes.func,
    template: PropTypes.func.isRequired,
    viewProps: PropTypes.object
  }

  BackboneView.defaultProps =  {
    className: '',
    data: {},
    onRender: x => x,
    viewProps: {}
  }

  return BackboneView
}
