import React, { Component, PropTypes } from 'react'
import { uniqueId } from 'underscore'

export default class TemplateRenderer extends Component {

  constructor(props) {
    super(props)

    const {
      data,
      template
    } = this.props

    this.__id = uniqueId('template-')

    this.state = {
      renderedTemplate: template(data)
    }
  }

  componentWillMount() {
    this.props.onRender({
      template: this.state.renderedTemplate
    })
  }

  render() {
    return (
      <div
        className={this.props.className}
        id={this.__id}

        // TODO: Implement SSR templates
        // _dangerouslySetInnerHTML={{__html: this.state.renderedTemplate }}
      />
    )
  }
}

TemplateRenderer.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  enableSSR: PropTypes.bool,
  onRender: PropTypes.func,
  template: PropTypes.func.isRequired
}

TemplateRenderer.defaultProps = {
  className: '',
  data: {},
  enableSSR: false,
  onRender: x => x
}
