import ddTracer from "dd-trace"

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
  })
  ddTracer.use("http", {
    service: `force.http-client`,
  })
}
