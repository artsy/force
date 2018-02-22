import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Colors from '@artsy/reaction/dist/Assets/Colors'
import { pMedia } from '@artsy/reaction/dist/Components/Helpers'
import { SectionsNav } from './sections_nav.jsx'
import { Header } from './header.jsx'

export class FixedHeader extends Component {
  static propTypes = {
    activeSection: PropTypes.number,
    curation: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    isOpen: PropTypes.any,
    isVisible: PropTypes.bool,
    onChangeSection: PropTypes.func,
  }

  state = {
    isOpen: false,
    scrollPosition: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)

    let isOpen = false
    if (this.props.isOpen) {
      isOpen = true
    }
    this.setState({
      scrollPosition: document.documentElement.scrollTop,
      isOpen,
    })
  }

  onScroll = () => {
    const { scrollPosition, isOpen } = this.state
    const fromTop = document.documentElement.scrollTop
    let setOpen = isOpen

    if (fromTop > scrollPosition) {
      setOpen = false
    } else {
      setOpen = true
    }
    if (fromTop !== scrollPosition) {
      this.setState({ scrollPosition: fromTop, isOpen: setOpen })
    }
  }

  render() {
    const { isOpen } = this.state
    const {
      activeSection,
      curation,
      isMobile,
      isVisible,
      onChangeSection,
    } = this.props

    const { name, partner_logo_primary, partner_link_url } = curation

    return (
      <FixedHeaderContainer
        className="FixedHeader"
        isVisible={isVisible}
        onMouseEnter={() => this.setState({ isOpen: true })}
        onMouseLeave={() => this.setState({ isOpen: false })}
      >
        <Header
          title={name}
          isMobile={isMobile}
          isOpen={isOpen}
          partner_logo={partner_logo_primary}
          partner_url={partner_link_url}
          onOpenMenu={() => this.setState({ isOpen: !isOpen })}
        />
        {this.state.isOpen && (
          <SectionsNav
            animated
            activeSection={activeSection}
            sections={curation.sections}
            onClick={onChangeSection}
          />
        )}
      </FixedHeaderContainer>
    )
  }
}

const FixedHeaderContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: white;
  position: fixed;
  z-index: 100;
  transition: opacity 0.25s;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  border-bottom: 1px solid ${Colors.grayRegular};
  ${pMedia.sm`
    .SeriesNav {
      margin-top: 40px;
    }
  `};
`
