import _ from 'underscore'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const { ImagesetPreview, Artwork, Image, FeatureHeader } = components

export default class App extends Component {
  static propTypes = {
    article: PropTypes.object
  }

  renderSections (sections) {
    const renderedSections = sections.map((section) => {
      switch (section.type) {
        case 'image_collection':
          const images = section.images.map((image) => {
            if (image.type === 'image') {
              return (
                <div style={{ width: '50%', margin: 'auto' }}>
                  <Image image={image} />
                </div>
              )
            } else if (image.type === 'artwork') {
              return (
                <div style={{ width: '50%', margin: 'auto' }}>
                  <Artwork linked artwork={image} />
                </div>
              )
            }
          })
          return images
        case 'image_set':
          return (
            <div style={{ width: '50%', margin: 'auto' }}>
              <ImagesetPreview images={section.images} />
            </div>
          )
        default:
          return false
      }
    })
    return renderedSections
  }

  renderHeader (article) {
    if (article.hero_section) {
      const header = article.hero_section
      // TODO: Put together this data elsewhere
      const tempHeader = _.extend({}, header, {
        layout: 'full',
        url: header.background_url || header.background_image_url,
        author: article.contributing_authors[0].name,
        date: moment(article.published_at).local().format('MMM Do, YYYY h:mm a'),
        vertical: article.vertical && article.vertical.name
      })
      return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
          <FeatureHeader header={tempHeader} />
        </div>
      )
    } else {
      return (
        <div>
          {article.title}
        </div>
      )
    }
  }

  render () {
    const { article } = this.props
    return (
      <div>
        <div style={{ width: '100%' }}>
          {this.renderHeader(article)}
          <div style={{ margin: '20px' }}>
            {this.renderSections(article.sections)}
          </div>
        </div>
      </div>
    )
  }
}
