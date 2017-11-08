import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { SeriesHeader } from './series/series_header.jsx'
import { SeriesFooter } from './series/series_footer.jsx'
import { Section } from './section/section.jsx'

export default class App extends Component {
  static propTypes = {
    curation: PropTypes.object,
    activeSection: PropTypes.number
  }

  state = {
    activeSection: this.props.activeSection
  }

  onChangeSection = (index) => {
    this.setState({activeSection: index})
  }

  render () {
    const { curation } = this.props

    return (
        <div className='gucci'>
          <SeriesHeader
            activeSection={this.state.activeSection}
            curation={curation}
            onChangeSection={this.onChangeSection}
          />
          <GucciContainer>
            {curation.sections.map((section, index) =>
              <Section section={section} curation={curation} />
            )}
            <SeriesFooter curation={curation} />
          </GucciContainer>
        </div>
    )
  }
}

const GucciContainer = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  .col {
    max-width: 100%;
    position: relative;
  }
  ${pMedia.sm`
    padding: 0;
  `}
`
