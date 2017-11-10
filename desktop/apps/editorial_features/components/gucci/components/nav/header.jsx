import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { PartnerInline } from '../partner/partner_inline.jsx'

export class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    isMobile: PropTypes.bool,
    partner_logo: PropTypes.string,
    partner_url: PropTypes.string
  }

  state = {
    isOpen: true
  }

  render () {
    const { title, isMobile, partner_logo, partner_url } = this.props

    return (
      <HeaderMain className='Header'>
        <PartnerInline
          url={partner_url}
          logo={partner_logo}
        />
        <div className='title'>
          {title}
        </div>

        {!isMobile &&
          <div className='menu'>
            <a href='/articles'>
              Back to Editorial
            </a>
          </div>
        }
      </HeaderMain>
    )
  }
}

const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .PartnerInline {
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
