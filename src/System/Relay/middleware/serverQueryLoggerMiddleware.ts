import { isServer } from "Server/isServer"

/**
 * Middleware that logs GraphQL queries executed during SSR.
 *
 * Outputs query name, variables, full query text, and timing information
 * to the server console for debugging and performance analysis.
 *
 * Only runs on the server - no-op on client.
 */
export const serverQueryLoggerMiddleware = () => {
  return next => async req => {
    if (!isServer) {
      return next(req)
    }

    const operation = (req as any).operation
    const queryName = operation?.name || (req as any).id || "unknown"
    const queryText = operation?.text || ""
    const variables = (req as any).variables

    const separator = "=".repeat(80)

    console.log(`\n${separator}`)
    console.log(`[SSR Query] START: ${queryName}`)

    if (variables) {
      console.log(`Variables: ${JSON.stringify(variables, null, 2)}`)
    }

    if (queryText) {
      console.log(separator)
      console.log(queryText)
    }

    console.log(`${separator}\n`)

    const start = performance.now()
    const res = await next(req)
    const duration = (performance.now() - start).toFixed(1)

    console.log(`[SSR Query] END: ${queryName} (${duration}ms)\n`)

    return res
  }
}
