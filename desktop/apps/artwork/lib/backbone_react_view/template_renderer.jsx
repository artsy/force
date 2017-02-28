import React, { Component, PropTypes } from 'react'
import { uniqueId } from 'underscore'

export default class TemplateRenderer extends Component {

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
    enableSSR: PropTypes.bool,
    onRender: PropTypes.func,
    template: PropTypes.func.isRequired
  }

  static defaultProps = {
    className: '',
    data: {},
    enableSSR: false,
    onRender: x => x
  }

  state = {
    renderedTemplate: undefined
  }

  __id = uniqueId('react-backbone-template-')

  componentWillMount() {
    const {
      data,
      onRender,
      template
    } = this.props

    const renderedTemplate = template(data)

    this.setState({
      renderedTemplate
    })

    onRender({
      __id: this.__id,
      template: renderedTemplate
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
