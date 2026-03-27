import type { ReactNode } from "react"
import { Highlight } from "./Highlight"

/**
 * Parses an OpenSearch highlight fragment string containing <em> tags
 * into an array of React nodes with <Highlight> wrapping matched terms.
 *
 * Relies on OpenSearch's default pre/post tags (<em>/<\/em>). All content
 * is rendered as React text nodes, so unexpected HTML is safely escaped.
 *
 * Example: "Vincent <em>van Gogh</em>" becomes:
 *   ["Vincent ", <Highlight>van Gogh</Highlight>]
 */
export const parseHighlightFragments = (fragment: string): ReactNode[] => {
  const parts: ReactNode[] = []
  const regex = /<em>(.*?)<\/em>/g
  let lastIndex = 0
  let m = regex.exec(fragment)

  while (m !== null) {
    const matchIndex = m.index
    if (matchIndex > lastIndex) {
      parts.push(fragment.slice(lastIndex, matchIndex))
    }
    parts.push(<Highlight key={matchIndex}>{m[1]}</Highlight>)
    lastIndex = matchIndex + m[0].length
    m = regex.exec(fragment)
  }

  if (lastIndex < fragment.length) {
    parts.push(fragment.slice(lastIndex))
  }

  return parts
}

export interface SearchHighlightData {
  readonly field: string
  readonly fragments: ReadonlyArray<string>
}
