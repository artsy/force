import ddTracer, { Span } from "dd-trace"
import url from "url"
import { Request } from "express"

if (process.env.DD_APM_ENABLED) {
  ddTracer.init({
    hostname: process.env.DD_TRACE_AGENT_HOSTNAME,
    service: "force",
    plugins: false,
  })
  ddTracer.use("express", {
    // We want the root spans of MP to be labelled as just `service`
    service: "force",
    headers: ["User-Agent"],
    // @ts-ignore
    hooks: {
      /**
       * Because of our wildcard routes in `apps/artsy-v2` we need to
       * dynamically construct the path for for a given request.
       * @see https://github.com/DataDog/dd-trace-js/issues/477#issuecomment-470299277
       *
       * TODO: Update this logic by parsing our routes via `path-to-regex`.
       */
      request: (span: Span, req: Request) => {
        if (req?.route?.path?.includes("*")) {
          const pathname = url.parse(req.originalUrl).pathname
          const pathWithoutParams = pathname?.replace(/\/$/, "") // Remove query string, fragment and trailing slash
          const rootPath = pathWithoutParams?.split("/")?.[1] ?? "" // eg, /artist
          span.setTag("http.route", `/${rootPath}`)
        }
      },
    },
  })
  ddTracer.use("http", {
    service: "force.http-client",
  })
  ddTracer.use("redis", {
    service: "force.redis",
  })
}
