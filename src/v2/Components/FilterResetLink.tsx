import { Link, Sans } from "@artsy/palette"
import * as React from "react";
import styled from "styled-components"

const FadingLink = styled(Link)`
  transition: opacity 75ms;
`

interface FilterResetLinkProps {
  /** Reset link should only appear if there are changes to the filter */
  hasChanges: boolean
  onReset: () => void
}

export const FilterResetLink: React.FC<FilterResetLinkProps> = props => {
  return (
    <FadingLink
      style={{ opacity: props.hasChanges ? 1 : 0 }}
      href="#"
      color="black60"
      onClick={e => {
        e.preventDefault()
        if (!props.hasChanges) return

        props?.onReset()
        e.stopPropagation()
      }}
    >
      <Sans size="1">Reset</Sans>
    </FadingLink>
  )
}
