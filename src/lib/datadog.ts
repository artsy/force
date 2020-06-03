import ddTracer from "dd-trace"
import url from "url"
import { Request } from "express"
import { Span } from "opentracing"

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
    // See: https://github.com/DataDog/dd-trace-js/issues/477#issuecomment-470299277
    // @ts-ignore
    hooks: {
      request: (span: Span, req: Request) => {
        if (req.route.path.includes("*")) {
          span.setTag(
            "http.route",
            // Remove query string, fragment and trailing slash
            url.parse(req.originalUrl).pathname.replace(/\/$/, "")
          )
        }
      },
    },
  })
  ddTracer.use("http", {
    service: `force.http-client`,
  })
}
