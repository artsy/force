import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Colors from '@artsy/reaction-force/dist/Assets/Colors'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { SectionsNav } from './sections_nav.jsx'
import { Header } from './header.jsx'

export class FixedHeader extends Component {
  static propTypes = {
    activeSection: PropTypes.number,
    curation: PropTypes.object,
    isOpen: PropTypes.any,
    isVisible: PropTypes.bool,
    onChangeSection: PropTypes.func
  }

  state = {
    isOpen: false,
    scrollPosition: 0
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll, true)
    let isOpen = false
    if (this.props.isOpen) {
      isOpen = true
    }
    this.setState({
      scrollPosition: document.documentElement.scrollTop,
      isOpen
    })
  }

  onScroll = () => {
    const { scrollPosition, isOpen } = this.state
    const fromTop = document.documentElement.scrollTop
    let setOpen = isOpen

    if (fromTop > scrollPosition) {
      setOpen = false
    } else if (fromTop < scrollPosition) {
      setOpen = true
    }
    this.setState({ scrollPosition: fromTop, isOpen: setOpen })
  }

  render () {
    const {
      activeSection,
      curation,
      isVisible,
      onChangeSection
    } = this.props

    const {
      name,
      partner_logo_primary,
      partner_link_url
    } = curation

    return (
      <FixedHeaderContainer
        className='FixedHeader'
        isVisible={isVisible}
        onMouseEnter={() => this.setState({isOpen: true})}
        onMouseLeave={() => this.setState({isOpen: false})}>
        <Header
          title={name}
          partner_logo={partner_logo_primary}
          partner_url={partner_link_url}
        />
        {this.state.isOpen &&
          <SectionsNav
            activeSection={activeSection}
            sections={curation.sections}
            onClick={onChangeSection}
          />
        }
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
  transition: opacity .25s;
  opacity: ${props => props.isVisible ? '1' : '0'};
  border-bottom: 1px solid ${Colors.grayRegular};
  ${pMedia.sm`
    .SeriesNav {
      margin-top: 40px;
    }
  `}
`
