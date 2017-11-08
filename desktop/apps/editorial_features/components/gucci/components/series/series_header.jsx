import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const SeriesHeader = (props) => {
  const { curation } = props

  return (
    <HeaderContainer>
      <div className='menu-right'>
        <a href='/'>Artsy +</a>
      </div>
      <div className='title'>
        {curation.name}
      </div>
      <div className='menu-left'>
        <a href='/articles'>
          Back to Editorial
        </a>
      </div>
    </HeaderContainer>
  )
}

SeriesHeader.propTypes = {
  curation: PropTypes.object
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  max-width: 1240px;
  margin: 0 auto;
  .menu-right {
    flex: 1;
  }
  .title {
    flex: 2;
    text-align: center;
    font-size: 23px;
    text-transform: uppercase;
  }
  .menu-left {
    flex: 1;
    text-align: right;
    a {
      ${Fonts.unica('s16', 'medium')}
      font-weight: 600;
      text-decoration: none;
    }
  }
  ${pMedia.sm`
    .title {
      display: none;
    }
  `}
`
