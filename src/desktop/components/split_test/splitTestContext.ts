import httpContext from "express-http-context"

export function getSplitTest(ENV_VAR) {
  const envVar = httpContext.get(ENV_VAR)
  return envVar
}

export function setSplitTest(ENV_VAR, value) {
  httpContext.set(ENV_VAR, value)
}
