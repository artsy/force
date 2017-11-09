import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { SeriesNav } from './series_nav.jsx'
import { Header } from '../nav/header.jsx'

export const SeriesHeader = (props) => {
  const { curation, onChangeSection } = props

  return (
    <SeriesHeaderContainer className='SeriesHeader'>
      <Header
        title={curation.name}
        partner_logo={curation.partner_logo_primary}
        partner_url={curation.partner_link_url}
      />
      <Title>
        {curation.name}
      </Title>
      <SeriesNav
        activeSection={null}
        curation={curation}
        onClick={onChangeSection}
      />
    </SeriesHeaderContainer>
  )
}

SeriesHeader.propTypes = {
  curation: PropTypes.object,
  onChangeSection: PropTypes.func
}

const SeriesHeaderContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
  .Header {
    .title {
      display: none;
    }
  }
  .SeriesNav__item {
    color: black;
  }
  ${pMedia.sm`
    .SeriesNav {
      margin-top: 40px;
    }
  `}
`
const Title = styled.div`
  font-size: 120px;
  line-height: 111px;
  letter-spacing: -3.5px;
  text-transform: uppercase;
  margin: 80px auto 40px auto;
  text-align: center;
  max-width: 1060px;
  ${pMedia.lg`
    font-size: 50px;
    line-height: 0.9em;
    letter-spacing: -1.5px;
  `}
`
