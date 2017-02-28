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

    static propTypes = {
      className: PropTypes.string,
      data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
      ]),
      onRender: PropTypes.func,
      onRemove: PropTypes.func,
      template: PropTypes.func.isRequired,
      viewProps: PropTypes.object
    }

    static defaultProps =  {
      className: '',
      data: {},
      onRender: x => x,
      onRemove: x => x,
      viewProps: {}
    }

    /**
     * Ref to instantiated Backbone view
     * @type {Backbone.View}
     */
    backboneView = undefined

    /**
     * Ref to node instantiated Backbone view is mounted to
     * @type {Element}
     */
    node = undefined

    /**
     * Template that should be rendered into Backbone view. Contains an
     *   __id: String - unique identifier
     *   template: String - compiled template string to me bounted
     * @type {Object}
     */
    renderedTemplate = undefined

    onTemplateRender = (template) => {
      this.renderedTemplate = template
    }

    /** Don't update instantiable Backbone.View classes within the render cycle */
    shouldComponentUpdate = () => false

    /**
     * Render Backbone view now that DOM is accessible
     */
    componentDidMount = () => this.renderBackboneView()
    componentWillUnmount = () => this.removeBackboneView()


    renderBackboneView() {
      const {
        __id,
        template
      } = this.renderedTemplate

      const {
        id = __id,// If a user doesn't provide an ID, fallback to uniq
        onRender,
        viewProps
      } = this.props

      try {
        this.backboneView = new View({
          id,
          ...viewProps
        })

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

    removeBackboneView() {
      this.backboneView.remove()

      this.props.onRemove({
        [this.instanceName]: {
          instance: this.backboneView,
          node: this.node
        }
      })
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

  return BackboneView
}
