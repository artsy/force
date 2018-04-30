import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { pMedia } from 'reaction/Components/Helpers'
import Icon from 'reaction/Components/Icon'
import { unica } from 'reaction/Assets/Fonts'
import { PartnerInline } from 'reaction/Components/Publishing/Partner/PartnerInline'

export class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    isMobile: PropTypes.bool,
    isOpen: PropTypes.bool,
    onOpenMenu: PropTypes.any,
    partner_logo: PropTypes.string,
    partner_url: PropTypes.string
  }

  render() {
    const {
      title,
      isMobile,
      isOpen,
      onOpenMenu,
      partner_logo,
      partner_url
    } = this.props

    return (
      <HeaderMain className="Header">
        <PartnerInline
          url={partner_url}
          logo={partner_logo}
          trackingData={{
            type: 'external link',
            destination_path: partner_url
          }}
        />

        {!isMobile && <div className="title">{title}</div>}

        {!isMobile && (
          <div className="menu">
            <a href="/articles">Back to Magazine</a>
          </div>
        )}

        {isMobile &&
          onOpenMenu && (
            <div className="menu" onClick={onOpenMenu}>
              <Icon
                name={isOpen ? 'close' : 'list'}
                color="black"
                fontSize={isOpen ? '25px' : '32px'}
              />
            </div>
          )}
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
    img {
      max-width: 120px;
    }
  }
  .title {
    flex: 2;
    text-align: center;
    font-size: 23px;
    text-transform: uppercase;
    height: 23px;
    letter-spacing: -0.25px;
  }
  .menu {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    a {
      ${unica('s16', 'medium')} text-decoration: none;
      border-bottom: 2px solid;
    }
  }
  ${pMedia.lg`
  .title {
    font-size: 19px;
    height: 19px;
  }
`} ${pMedia.md`
    .title {
      display: none;
    }
    .PartnerInline{
      img {
        max-width: 100px;
      }
    }
  `};
`
