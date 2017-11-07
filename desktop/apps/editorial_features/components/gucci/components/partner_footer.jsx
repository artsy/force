import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const PartnerFooter = (props) => {
  const {
    partner_link_url,
    partner_logo_footer,
    partner_logo_header
  } = props.curation

  const logoSrc = partner_logo_footer || partner_logo_header

  return (
    <div>
      <Title>Presented In Partnership With</Title>
      <a href={partner_link_url} target='_blank'>
        <img src={logoSrc} />
      </a>
    </div>
  )
}

PartnerFooter.propTypes = {
  curation: PropTypes.object
}

const Title = styled.div`
  ${Fonts.unica('s16', 'medium')}
`
