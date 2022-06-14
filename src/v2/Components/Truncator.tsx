import { ErrorBoundary } from "v2/System/Router/ErrorBoundary"
import * as React from "react"
import ReactDOM from "react-dom/server"

interface Props {
  maxLineCount?: number
  ellipsis?: string
  ReadMoreLink?: () => any
}

/**
 * @deprecated Use `Text` with `overflowEllipsis` for single line or `lineClamp` for multiple lines.
 * Truncate large bodies of text.
 */
export const Truncator: React.SFC<Props> = ({
  ReadMoreLink,
  children,
  ellipsis,
  maxLineCount,
}) => {
  const html = ReactDOM.renderToStaticMarkup(<span>{children}</span>)
  let readMoreHTML = null

  if (ReadMoreLink) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    readMoreHTML = ReactDOM.renderToStaticMarkup(ReadMoreLink())
  }

  // FIXME: Make safe for tests
  let HTMLEllipsis

  if (process.env.NODE_ENV !== "test") {
    const responsiveHOC = require("react-lines-ellipsis/lib/responsiveHOC")
    HTMLEllipsis = responsiveHOC()(require("react-lines-ellipsis/lib/html"))
  } else {
    HTMLEllipsis = ({ unsafeHTML }) => (
      <div
        dangerouslySetInnerHTML={{
          __html: unsafeHTML,
        }}
      />
    )
  }

  return (
    <ErrorBoundary>
      <HTMLEllipsis
        unsafeHTML={html}
        maxLine={String(maxLineCount || 2)}
        ellipsis={ellipsis}
        ellipsisHTML={readMoreHTML}
      />
    </ErrorBoundary>
  )
}
