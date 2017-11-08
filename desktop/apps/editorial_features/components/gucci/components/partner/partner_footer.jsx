import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const PartnerFooter = (props) => {
  const { logo, url } = props

  return (
    <PartnerFooterContainer className='PartnerFooter'>
      <Title>Presented In Partnership With</Title>
      <a href={url} target='_blank'>
        <img src={logo} />
      </a>
    </PartnerFooterContainer>
  )
}

PartnerFooter.propTypes = {
  logo: PropTypes.string,
  url: PropTypes.string
}

const PartnerFooterContainer = styled.div`
  img {
    max-width: 220px;
    padding: 20px 0;
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
