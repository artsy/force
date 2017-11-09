import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const PartnerBlock = (props) => {
  const { logo, url } = props

  return (
    <PartnerBlockContainer className='PartnerBlock'>
      <Title>Presented In Partnership With</Title>
      <a href={url} target='_blank'>
        <img src={logo} />
      </a>
    </PartnerBlockContainer>
  )
}

PartnerBlock.propTypes = {
  logo: PropTypes.string,
  url: PropTypes.string
}

const PartnerBlockContainer = styled.div`
  img {
    max-width: 220px;
    padding-top: 20px;
  }
  ${pMedia.sm`
    img {
      max-width: 195px;
    }
  `}
`

const Title = styled.div`
  ${Fonts.unica('s16', 'medium')}
  font-weight: 600;
  ${pMedia.sm`
    ${Fonts.unica('s14', 'medium')}
  `}
`
