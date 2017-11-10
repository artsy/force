import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import Icon from '@artsy/reaction-force/dist/Components/Icon'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { PartnerInline } from '../partner/partner_inline.jsx'

export class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    isMobile: PropTypes.bool,
    isOpen: PropTypes.bool,
    onOpenMenu: PropTypes.any,
    partner_logo: PropTypes.string,
    partner_url: PropTypes.string
  }

  render () {
    const {
      title,
      isMobile,
      isOpen,
      onOpenMenu,
      partner_logo,
      partner_url
    } = this.props

    return (
      <HeaderMain className='Header'>
        <PartnerInline
          url={partner_url}
          logo={partner_logo}
        />

        {!isMobile &&
          <div className='title'>
            {title}
          </div>
        }

        {!isMobile &&
          <div className='menu'>
            <a href='/articles'>
              Back to Editorial
            </a>
          </div>
        }

        {isMobile && onOpenMenu &&
          <div className='menu' onClick={onOpenMenu}>
            <Icon
              name={isOpen ? 'close' : 'list'}
              color='black'
              fontSize={isOpen ? '35px' : '40px'}
            />
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
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
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
