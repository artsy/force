import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { SeriesNav } from '../series/series_nav.jsx'
import { Header } from './header.jsx'

export class FixedHeader extends Component {
  static propTypes = {
    activeSection: PropTypes.number,
    curation: PropTypes.object,
    isOpen: PropTypes.bool,
    isVisible: PropTypes.bool,
    onChangeSection: PropTypes.func
  }

  state = {
    isOpen: this.props.isOpen || false
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
          <SeriesNav
            activeSection={activeSection}
            curation={curation}
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
  ${pMedia.sm`
    .SeriesNav {
      margin-top: 40px;
    }
  `}
`
