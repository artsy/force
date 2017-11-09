import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Waypoint from 'react-waypoint'
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

  // componentDidMount () {
  //   // const videos = ReactDOM.findDOMNode(Section)
  //   // debugger
  // }

  onChangeSection = (index) => {
    this.setState({activeSection: index})
  }

  onEnterSection = (index, data) => {
    if (this.state.activeSection !== index) {
      console.log('entered waypoint', index)
      this.onChangeSection(index)
    }
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
              <div>
                <Waypoint
                  onEnter={(waypointData => this.onEnterSection(index, waypointData))}
                />
                <Section
                  key={'section-' + index}
                  section={section}
                  curation={curation}
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
