import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { PartnerHeader } from '../partner/partner_header.jsx'
import { SeriesNav } from './series_nav.jsx'

export const SeriesHeader = (props) => {
  const { activeSection, curation, onChangeSection } = props

  return (
    <SeriesHeaderContainer className='SeriesHeader'>
      <HeaderMain>
        <PartnerHeader
          url={curation.partner_link_url}
          logo={curation.partner_logo_primary}
        />
        <div className='title'>
          {curation.name}
        </div>
        <div className='menu'>
          <a href='/articles'>
            Back to Editorial
          </a>
        </div>
      </HeaderMain>
      <SeriesNav
        activeSection={activeSection}
        curation={curation}
        onClick={onChangeSection}
      />
    </SeriesHeaderContainer>
  )
}

SeriesHeader.propTypes = {
  activeSection: PropTypes.number,
  curation: PropTypes.object,
  onChangeSection: PropTypes.func
}

const SeriesHeaderContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
`

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
    height: min-content;
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
