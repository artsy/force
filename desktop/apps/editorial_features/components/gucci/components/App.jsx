import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Waypoint from 'react-waypoint'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { FixedHeader } from './nav/fixed_header.jsx'
import { SeriesHeader } from './series/series_header.jsx'
import { SeriesFooter } from './series/series_footer.jsx'
import { Section } from './section/section.jsx'

export default class App extends Component {
  static propTypes = {
    curation: PropTypes.object,
    activeSection: PropTypes.number
  }

  state = {
    activeSection: this.props.activeSection,
    sectionPositions: [0, 0, 0],
    showHeader: false
  }

  setSectionPosition = (index, position) => {
    const sectionPositions = this.state.sectionPositions
    sectionPositions[index] = position
    this.setState({ sectionPositions })
  }

  onChangeSection = (index) => {
    this.setState({activeSection: index})
  }

  onEnterSection = (index, data) => {
    if (this.state.activeSection !== index) {
      this.onChangeSection(index)
    }
  }

  render () {
    const { curation } = this.props
    const { activeSection, showHeader } = this.state

    return (
        <div className='gucci'>
          <FixedHeader // fixed position shows on scroll
            activeSection={activeSection}
            curation={curation}
            onChangeSection={this.onChangeSection}
            isVisible={showHeader}
          />
          <SeriesHeader // relative position always at content top
            activeSection={activeSection}
            curation={curation}
            onChangeSection={this.onChangeSection}
          />
          <Waypoint
            onEnter={() => this.setState({showHeader: false})}
            onLeave={() => this.setState({showHeader: true})}
          />

          <GucciContainer>
            {curation.sections.map((section, index) =>
              <div>
                <Waypoint
                  onEnter={(waypointData => this.onEnterSection(index, waypointData))}
                />
                <Section
                  index={index}
                  key={'section-' + index}
                  section={section}
                  setSectionPosition={this.setSectionPosition}
                />
              </div>
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
