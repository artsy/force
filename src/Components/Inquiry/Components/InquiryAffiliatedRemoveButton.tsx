import { CheckIcon, Clickable, ClickableProps, CloseIcon } from "@artsy/palette"
import * as React from "react";
import { useState } from "react"

export const InquiryAffiliatedRemoveButton: React.FC<ClickableProps> = props => {
  const [hovered, setHovered] = useState(false)
  return (
    <Clickable
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Remove"
      {...props}
    >
      {hovered ? <CloseIcon fill="red100" /> : <CheckIcon fill="black60" />}
    </Clickable>
  )
}
