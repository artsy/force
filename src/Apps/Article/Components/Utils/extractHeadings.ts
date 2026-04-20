import { JUMP_NAMESPACE } from "Utils/Hooks/useJump"

const JUMP_TARGET_PREFIX = `${JUMP_NAMESPACE}--`

interface OutlineEntry {
  readonly heading: string
  readonly slug: string
}

const stripTags = (html: string): string => html.replace(/<[^>]*>/g, "")

const hasIDAttribute = (attrs: string): boolean => /(?:^|\s)id\s*=/i.test(attrs)

/**
 * Removes paragraphs whose only content is whitespace, `<br>`s, or `&nbsp;`s.
 * These are common authoring artifacts (e.g. trailing carriage returns) that
 * render as visually empty space between sections.
 */
export const stripEmptyParagraphs = (html: string): string =>
  html.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (full, inner) => {
    const visible = inner
      .replace(/<br\s*\/?>/gi, "")
      .replace(/&nbsp;|&#160;/gi, "")
      .replace(/<[^>]*>/g, "")
      .trim()

    return visible.length === 0 ? "" : full
  })

export const createJumpTargetID = ({
  articleSlug,
  slug,
}: {
  articleSlug: string
  slug: string
}): string => {
  return `${JUMP_TARGET_PREFIX}${articleSlug}--${slug}`
}

export const createJumpHash = ({
  articleSlug,
  slug,
}: {
  articleSlug: string
  slug: string
}): string => {
  return `#${createJumpTargetID({ articleSlug, slug })}`
}

export const extractJumpTargetIDFromHash = (hash: string): string | null => {
  const prefix = `#${JUMP_TARGET_PREFIX}`

  if (!hash.startsWith(prefix)) return null

  const targetID = hash.slice(prefix.length)

  return targetID || null
}

const createSlugQueues = (
  outline: ReadonlyArray<OutlineEntry>,
): Map<string, string[]> => {
  const queuesByHeading = new Map<string, string[]>()

  for (let index = outline.length - 1; index >= 0; index -= 1) {
    const { heading, slug } = outline[index]
    const slugs = queuesByHeading.get(heading)

    if (slugs) {
      slugs.push(slug)
      continue
    }

    queuesByHeading.set(heading, [slug])
  }

  return queuesByHeading
}

const injectHeadingIDsWithSlugQueues = (
  body: string,
  queuesByHeading: Map<string, string[]>,
  articleSlug: string,
): string =>
  body.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (fullMatch, attrs, inner) => {
    const text = stripTags(inner).trim()
    if (!text) return fullMatch

    const slugs = queuesByHeading.get(text)
    if (!slugs?.length || hasIDAttribute(attrs)) return fullMatch

    const slug = slugs.pop()
    if (!slug) return fullMatch

    return `<h2${attrs} id="${createJumpTargetID({ articleSlug, slug })}">${inner}</h2>`
  })

/**
 * Injects `id="JUMP--{slug}"` attributes into H2 elements in an HTML
 * string so that `useJump`'s `jumpTo` can locate them.
 */
export const injectHeadingIDs = (
  body: string,
  outline: ReadonlyArray<OutlineEntry>,
  articleSlug: string,
): string =>
  injectHeadingIDsWithSlugQueues(body, createSlugQueues(outline), articleSlug)

export const injectHeadingIDsIntoBodies = (
  bodies: ReadonlyArray<string | null | undefined>,
  outline: ReadonlyArray<OutlineEntry>,
  articleSlug: string,
): Array<string | null> => {
  const slugQueues = createSlugQueues(outline)

  return bodies.map(body =>
    body
      ? injectHeadingIDsWithSlugQueues(
          stripEmptyParagraphs(body),
          slugQueues,
          articleSlug,
        )
      : null,
  )
}
