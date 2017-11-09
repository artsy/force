import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { PartnerHeader } from '../partner/partner_header.jsx'

export class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    partner_logo: PropTypes.string,
    partner_url: PropTypes.string
  }

  state = {
    isOpen: true
  }

  render () {
    const { title, partner_logo, partner_url } = this.props

    return (
      <HeaderMain className='Header'>
        <PartnerHeader
          url={partner_url}
          logo={partner_logo}
        />
        <div className='title'>
          {title}
        </div>
        <div className='menu'>
          <a href='/articles'>
            Back to Editorial
          </a>
        </div>
      </HeaderMain>
    )
  }
}

const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .PartnerHeader {
    flex: 1;
  }
  .title {
    flex: 2;
    text-align: center;
    font-size: 23px;
    text-transform: uppercase;
    height: 23px;
  }
  .menu {
    flex: 1;
    text-align: right;
    a {
      ${Fonts.unica('s16', 'medium')}
      font-weight: 600;
      text-decoration: none;
      border-bottom: 2px solid;
    }
  }
  ${pMedia.sm`
    .title {
      display: none;
    }
  `}
`
