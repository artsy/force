import * as React from "react"
import styled from "styled-components"
import { compact, uniq } from "lodash"
import { media } from "@artsy/palette"
import { PartnerHeader_partner$data } from "__generated__/PartnerHeader_partner.graphql"

export const TextWithNoWrap = styled.span`
  white-space: nowrap;

  ${media.sm`
    white-space: normal;
  `};
`
export const PartnerHeaderAddress: React.FC<
  PartnerHeader_partner$data["locations"]
> = ({ edges }) => {
  const cities = uniq(compact(edges?.map(edge => edge?.node?.city?.trim())))
  if (!cities || cities.length === 0) return null

  return (
    <>
      {cities
        .filter(city => !!city)
        .map<React.ReactNode>((city, index) => (
          <TextWithNoWrap key={`${city}${index}`}>{city}</TextWithNoWrap>
        ))
        .reduce((prev, curr, index) => [
          prev,
          // The last space character is used instead of a non-breaking character
          // for better text wrapping behavior.
          <React.Fragment key={index}>&nbsp;&nbsp;•&nbsp; </React.Fragment>,
          curr,
        ])}
    </>
  )
}
