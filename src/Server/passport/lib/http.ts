export interface GravityResponse {
  body?: any
  ok: boolean
  status: number
  text: string
}

export interface GravityError extends Error {
  response?: GravityResponse
}

interface GravityRequestOptions {
  body?: unknown
  headers?: Record<string, string | undefined>
  method: "DELETE" | "GET" | "POST"
  timeoutMs?: number
  url: string
}

const DEFAULT_TIMEOUT_MS = 30_000

const emptyResponse = (status = 0): GravityResponse => ({
  body: {},
  ok: false,
  status,
  text: "",
})

export const requestGravity = async ({
  body,
  headers,
  method,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  url,
}: GravityRequestOptions): Promise<GravityResponse> => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  let response: Response
  try {
    response = await fetch(url, {
      body: body == null ? undefined : JSON.stringify(body),
      headers: {
        ...(body == null ? {} : { "Content-Type": "application/json" }),
        ...Object.fromEntries(
          Object.entries(headers ?? {}).filter(
            (entry): entry is [string, string] => entry[1] != null,
          ),
        ),
      },
      method,
      signal: controller.signal,
    })
  } catch (cause) {
    const error = new Error(
      cause instanceof Error ? cause.message : "Network request failed",
    ) as GravityError
    error.response = emptyResponse()
    if (cause instanceof Error) {
      ;(error as Error & { cause?: unknown }).cause = cause
    }
    throw error
  } finally {
    clearTimeout(timer)
  }

  const text = await response.text()
  const gravityResponse: GravityResponse = {
    body: parseBody(text),
    ok: response.ok,
    status: response.status,
    text,
  }

  if (!response.ok) {
    const error = new Error(response.statusText) as GravityError
    error.response = gravityResponse
    throw error
  }

  return gravityResponse
}

const parseBody = (text: string) => {
  if (text === "") {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}
