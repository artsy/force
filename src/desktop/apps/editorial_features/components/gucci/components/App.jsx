import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { debounce } from 'lodash'
import { pMedia } from '@artsy/reaction/dist/Components/Helpers'
import { FixedHeader } from './nav/fixed_header.jsx'
import { SeriesHeader } from './series/series_header.jsx'
import { SeriesFooter } from './series/series_footer.jsx'
import { Section } from './section/section.jsx'

export default class App extends Component {
  static propTypes = {
    curation: PropTypes.object,
    activeSection: PropTypes.number,
    isMobile: PropTypes.bool,
  }

  state = {
    activeSection: this.props.activeSection,
    isMobile: this.props.isMobile,
    showHeader: false,
  }

  componentDidMount() {
    // setup window isMobile
    this.checkWindowSize()
    window.addEventListener('resize', debounce(this.checkWindowSize, 30))
    let showHeader = false
    // if landing on slug, go to section and show header
    if (this.props.activeSection) {
      this.onChangeSection(this.props.activeSection)
    }
    // if landing scrolled below header, show fixed header
    if (window.scrollY > 100) {
      showHeader = true
    }
    this.setState({ showHeader })
  }

  checkWindowSize = () => {
    let isMobile = false
    if (document.documentElement.clientWidth < 720) {
      isMobile = true
    }
    this.setState({ isMobile })
  }

  inBody = (showHeader) => {
    this.setState({ showHeader })
  }

  onChangeSection = (index) => {
    const section = this.props.curation.sections[index]
    this.setState({ activeSection: index })
    document.getElementById(section.slug).scrollIntoView()
  }

  onEnterSection = (index, { previousPosition, currentPosition }) => {
    const section = this.props.curation.sections[index]
    if (previousPosition === 'above' && currentPosition === 'inside') {
      this.setState({ activeSection: index })
      document.title = section.title
      window.history.pushState(
        {},
        section.title,
        `/gender-equality/${section.slug}`
      )
    }
  }

  onLeaveSection = (index, { previousPosition, currentPosition }) => {
    const nextSection = this.props.curation.sections[index + 1]
    if (
      nextSection &&
      previousPosition === 'inside' &&
      currentPosition === 'above'
    ) {
      this.setState({ activeSection: index + 1 })
      document.title = nextSection.title
      window.history.pushState(
        {},
        nextSection.title,
        `/gender-equality/${nextSection.slug}`
      )
    }
  }

  render() {
    const { curation } = this.props
    const { activeSection, isMobile, showHeader } = this.state

    return (
      <div className="gucci">
        <FixedHeader // fixed position shows on scroll
          activeSection={activeSection}
          curation={curation}
          onChangeSection={this.onChangeSection}
          isMobile={isMobile}
          isVisible={showHeader}
          isOpen={this.props.activeSection}
        />

        <SeriesHeader // relative position always at content top
          activeSection={activeSection}
          curation={curation}
          inBody={this.inBody}
          isMobile={isMobile}
          onChangeSection={this.onChangeSection}
        />

        <GucciBody>
          {curation.sections.map((section, index) => (
            <div id={section.slug} key={'section-' + index}>
              <Section
                section={section}
                index={index}
                onEnterSection={this.onEnterSection}
                onLeaveSection={this.onLeaveSection}
              />
            </div>
          ))}
          <SeriesFooter curation={curation} isMobile={isMobile} />
        </GucciBody>
      </div>
    )
  }
}

const GucciBody = styled.div`
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
  `};
`
