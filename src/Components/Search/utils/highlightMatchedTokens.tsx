import { Highlight } from "Components/Search/SuggestionItem/Highlight"
import type { ReactNode } from "react"

/**
 * Colours the words the user typed. The entity rows use server-provided <em>
 * fragments instead — see parseHighlightFragments; this row is parsed locally.
 */
export const highlightMatchedTokens = (
  text: string,
  query: string,
): ReactNode[] => {
  const queryKeys = new Set(query.split(/\s+/).map(toKey).filter(Boolean))

  // Split retaining whitespace so the original spacing survives
  return text.split(/(\s+)/).map((part, index) => {
    const key = toKey(part)

    if (!key || !queryKeys.has(key)) return part

    return <Highlight key={index}>{part}</Highlight>
  })
}

const normalize = (word: string): string => {
  return word.toLowerCase().replace(/[^a-z0-9]/g, "")
}

/** So a typed "prints" still lights up a "Print" label, and vice versa */
const singularize = (word: string): string => {
  return word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word
}

const toKey = (word: string): string => {
  return singularize(normalize(word))
}
