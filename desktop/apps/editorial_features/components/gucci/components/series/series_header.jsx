import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'
import { PartnerHeader } from '../partner/partner_header.jsx'

export const SeriesHeader = (props) => {
  const { curation } = props

  return (
    <SeriesHeaderContainer className='SeriesHeader'>
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
    </SeriesHeaderContainer>
  )
}

SeriesHeader.propTypes = {
  curation: PropTypes.object
}

const SeriesHeaderContainer = styled.div`
  width: 100%;
  max-width: 1240px;
  padding: 15px 20px;
  margin: 0 auto;
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
