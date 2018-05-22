import React from 'react'
import { Checkbox } from '@artsy/reaction/dist/Components/Checkbox'
import styled from 'styled-components'
import colors from '@artsy/reaction/dist/Assets/Colors'
import { garamond } from '@artsy/reaction/dist/Assets/Fonts'

export const GDPRMessage = props => {
  return (
    <Text>
      {'I agree to Artsy’s '}
      <TextLink href="/terms">Terms of Use</TextLink>
      {' and '}
      <TextLink href="/privacy">Privacy Policy</TextLink>
      {', and to receive emails from Artsy.'}
    </Text>
  )
}

export const GDPRCheckbox = props => {
  return (
    <StyledCheckbox>
      <GDPRMessage />
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 25px;
`

const Text = styled.span`
  ${garamond('s16')};
  color: ${colors.grayDark};
  text-transform: none;
  letter-spacing: normal;
`

const TextLink = styled.a`
  color: ${colors.grayDark};
`
