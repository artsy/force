import { Box } from "@artsy/palette"
import styled from "styled-components"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { debounce } from "lodash"
import { FixedHeader } from "./nav/fixed_header"
import { SeriesHeader } from "./series/series_header"
import { SeriesFooter } from "./series/series_footer"
import { Section } from "./section/section"

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
    window.addEventListener("resize", debounce(this.checkWindowSize, 30))
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

  inBody = showHeader => {
    this.setState({ showHeader })
  }

  onChangeSection = index => {
    const section = this.props.curation.sections[index]
    this.setState({ activeSection: index })
    document.getElementById(section.slug).scrollIntoView()
  }

  onEnterSection = (index, { previousPosition, currentPosition }) => {
    const section = this.props.curation.sections[index]
    if (previousPosition === "above" && currentPosition === "inside") {
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
      previousPosition === "inside" &&
      currentPosition === "above"
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
      <div>
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

        <Box width="100%" maxWidth="1240px" mx="auto" px={[0, 0, 0, "20"]}>
          {curation.sections.map((section, index) => (
            <div id={section.slug} key={"section-" + index}>
              <Section
                section={section}
                index={index}
                onEnterSection={this.onEnterSection}
                onLeaveSection={this.onLeaveSection}
              />
            </div>
          ))}
          <SeriesFooter curation={curation} isMobile={isMobile} />
        </Box>
      </div>
    )
  }
}
