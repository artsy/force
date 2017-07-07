import PropTypes from 'prop-types'
import React, { Component } from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'
const ImagesetPreview = components.ImagesetPreview
const Artwork = components.Artwork

export default class App extends Component {
  static propTypes = {
    article: PropTypes.object
  }

  renderSections (sections) {
    const renderedSections = sections.map((section) => {
      switch (section.type) {
        case 'image_collection': {
          return (
            <Artwork artwork={section.images[0]} />
          )
        }
        case 'image_set': {
          return (
            <ImagesetPreview images={section.images} />
          )
        }
      }
    })
    return renderedSections
  }

  render () {
    const { article } = this.props
    return (
      <div style={{ width: '100%' }}>
        {this.renderSections(article.sections)}
      </div>
    )
  }
}
