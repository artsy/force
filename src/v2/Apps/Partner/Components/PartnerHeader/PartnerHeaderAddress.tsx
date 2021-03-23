import React from "react"
import styled from "styled-components"
import { uniq } from "lodash"
import { PartnerHeader_partner } from "v2/__generated__/PartnerHeader_partner.graphql"

export const TextWithNoWrap = styled.span`
  white-space: nowrap;
`
export const PartnerHeaderAddress: React.FC<
  PartnerHeader_partner["locations"]
> = ({ edges }) => {
  return (
    <>
      {uniq(edges.map(edge => edge.node.city.trim()))
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
