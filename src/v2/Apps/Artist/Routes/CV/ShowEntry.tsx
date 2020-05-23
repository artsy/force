import { Serif, SerifSize } from "@artsy/palette"
import React, { SFC } from "react"

const FIXME_DOMAIN = "https://www.artsy.net"

interface ShowEntryProps {
  node: any
  size?: SerifSize
}

// FIXME: Check for null links
// FIXME: Figure out how to always point to artsy.net env? how to handle urls?
export const ShowEntry: SFC<ShowEntryProps> = ({ node, size = "3" }) => (
  <Serif size={size} mb={1}>
    <Serif size={size} display="inline" italic>
      {node.href ? (
        <a href={FIXME_DOMAIN + node.href} className="noUnderline">
          {node.name}
        </a>
      ) : (
        <span>{node.name}</span>
      )}
    </Serif>
    {node.partner && ", "} {renderPartnerInfoSafely(node.partner)}
    {node.city && `, ${node.city}`}
  </Serif>
)

interface PartnerProps {
  href?: string
  name: string
}
const renderPartnerInfoSafely = (partner: PartnerProps) => {
  if (!partner) {
    return null
  }

  if (partner.href) {
    return (
      <a href={FIXME_DOMAIN + partner.href} className="noUnderline">
        {partner.name}
      </a>
    )
  }

  return <span>{partner.name}</span>
}
