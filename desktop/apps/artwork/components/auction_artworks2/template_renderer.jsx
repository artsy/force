import $ from 'jquery'
import React, { Component, PropTypes } from 'react'

export default class TemplateRenderer extends Component {

  componentWillMount() {
    const {
      data,
      template
    } = this.props

    this.state = {
      renderedTemplate: template(data)
    }
  }

  componentDidMount() {
    const { renderedTemplate } = this.state

    this.props.onRender({
      _raw: renderedTemplate,
      template: $.parseHTML(renderedTemplate)
    })
  }

  render() {
    return (
      <div
        className={this.props.className}
        dangerouslySetInnerHTML={{__html: this.state.renderedTemplate }}
      />
    )
  }
}

TemplateRenderer.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  onRender: PropTypes.func,
  template: PropTypes.func.isRequired
}

TemplateRenderer.defaultProps = {
  className: '',
  data: {},
  onRender: x => x
}
