import PropTypes from 'prop-types'
import React from 'react'
import { Series } from '@artsy/reaction-force/dist/Components/Publishing/Series/Series'
import { Nav } from '@artsy/reaction-force/dist/Components/Publishing/Nav/Nav'

export class SeriesLayout extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    isMobile: PropTypes.bool,
    isSuper: PropTypes.bool,
    subscribed: PropTypes.bool,
    templates: PropTypes.object
  }

  render () {
    const { article } = this.props
    const { sponsor, hero_section } = article

    return (
      <div className='Series'>
        <Nav
          transparent={hero_section && hero_section.url}
          sponsor={sponsor}
        />
        <Series article={article} />
      </div>
    )
  }
}
