import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const PartnerFooter = (props) => {
  const { logo, url } = props

  return (
    <div className='partner-footer'>
      <Title>Presented In Partnership With</Title>
      <a href={url} target='_blank'>
        <img src={logo} />
      </a>
    </div>
  )
}

PartnerFooter.propTypes = {
  logo: PropTypes.string,
  url: PropTypes.string
}

const Title = styled.div`
  ${Fonts.unica('s16', 'medium')}
  font-weight: 600;
  ${pMedia.sm`
    ${Fonts.unica('s14', 'medium')}
  `}
`
