import type { ArtsyRequest } from "Server/middleware/artsyExpress"
import type { ReactNode } from "react"
import { renderToStream as baseRenderToStream } from "react-streaming/server"
import { PassThrough, Transform } from "stream"
import type { ServerStyleSheet } from "styled-components"

interface RenderToStreamProps {
  jsx: ReactNode
  sheet: ServerStyleSheet
  req: ArtsyRequest
}

export interface RenderToStreamResult {
  initStream: () => {
    passThroughStream: PassThrough
    transform: Transform
  }
}

export const renderToStream = async ({
  jsx,
  sheet,
  req,
}: RenderToStreamProps): Promise<RenderToStreamResult> => {
  const decoder = new TextDecoder("utf-8")

  // Intercept stream in order to inject styled-components CSS on the fly
  const transform = new Transform({
    objectMode: true,
    flush(callback) {
      callback()
    },
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

  const { pipe } = await baseRenderToStream(jsx, {
    userAgent: req.header("User-Agent"),
    webStream: false,
  })

  const initStream = () => {
    const passThrough = new PassThrough()

    pipe?.(passThrough)

    const passThroughStream = passThrough.pipe(transform)

    return {
      passThroughStream,
      transform,
    }
  }

  return { initStream }
}
