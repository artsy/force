import { renderToPipeableStream } from "react-dom/server"
import { ArtsyResponse } from "Server/middleware/artsyExpress"
import { Transform } from "stream"

const STREAM_TIMEOUT = 5000

export function renderToStream(jsx, sheet, res: ArtsyResponse) {
  let didError = false

  const decoder = new TextDecoder("utf-8")

  const stream = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      const renderedHtml =
        chunk instanceof Uint8Array
          ? decoder.decode(chunk, { stream: true })
          : chunk.toString(encoding || "utf8")

      const styledCSS = sheet._emitSheetCSS()
      const CLOSING_TAG_R = /<\/[a-z]*>/i

      sheet.instance.clearTag()

      // Inject CSS into HTML
      if (/<\/head>/.test(renderedHtml)) {
        const replacedHtml = renderedHtml.replace(
          "</head>",
          `${styledCSS}</head>`
        )
        this.push(replacedHtml)
      } else if (CLOSING_TAG_R.test(renderedHtml)) {
        const execResult = CLOSING_TAG_R.exec(renderedHtml) as RegExpExecArray
        const endOfClosingTag = execResult.index + execResult[0].length
        const before = renderedHtml.slice(0, endOfClosingTag)
        const after = renderedHtml.slice(endOfClosingTag)

        this.push(before + styledCSS + after)
      } else {
        this.push(styledCSS + renderedHtml)
      }

      callback()
    },
  })

  let streamTimeout: NodeJS.Timeout

  const { pipe, abort } = renderToPipeableStream(jsx, {
    onError: error => {
      didError = true
      console.error("error", error)
    },
    onShellError: error => {
      didError = true
      console.log("shell error", error)
    },
    onShellReady: () => {
      res.statusCode = didError ? 500 : 200
      res.setHeader("Content-Type", "text/html; charset=utf-8")
      pipe(stream)
    },
    onAllReady: () => {
      clearTimeout(streamTimeout)
    },
  })

  // Abandon and switch to client rendering if enough time passes.
  streamTimeout = setTimeout(() => {
    abort()
  }, STREAM_TIMEOUT)

  return stream
}
