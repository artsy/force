import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

export const PartnerHeader = (props) => {
  const { logo, url } = props

  return (
      <PartnerHeaderContainer className='partner-header'>
        <a href='/' className='icon-logotype' />
        <span className='divider' />
        <a href={url} target='_blank'>
          <img src={logo} />
        </a>
      </PartnerHeaderContainer>
  )
}

PartnerHeader.propTypes = {
  logo: PropTypes.string,
  url: PropTypes.string
}

const PartnerHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    height: 32px;
    img {
      max-width: 100px;
      margin-left 20px;
    }
    .divider:after {
      content: '+';
      margin-left: 20px;
    }
  }
`
