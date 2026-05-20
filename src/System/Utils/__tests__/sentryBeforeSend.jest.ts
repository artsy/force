import type { ErrorEvent } from "@sentry/browser"
import { sentryBeforeSend } from "../sentryBeforeSend"

const CLOUDFLARE_HTML =
  '<!DOCTYPE html><html lang="en-US"><head><title>Just a moment...</title></head></html>'

const makeEvent = (
  type: string | undefined,
  value: string | undefined,
): ErrorEvent =>
  ({
    exception: { values: [{ type, value }] },
  }) as ErrorEvent

describe("sentryBeforeSend", () => {
  it("suppresses RRNLRequestError containing Cloudflare HTML", () => {
    const event = makeEvent(
      "RRNLRequestError",
      `Relay request for \`ArtistEditorialNewsGridQuery\` failed by the following reasons:\n\n${CLOUDFLARE_HTML}`,
    )
    expect(sentryBeforeSend(event)).toBeNull()
  })

  it("passes through RRNLRequestError with non-HTML body", () => {
    const event = makeEvent(
      "RRNLRequestError",
      "Relay request for `SomeQuery` failed by the following reasons:\n\nNetwork error",
    )
    expect(sentryBeforeSend(event)).toBe(event)
  })

  it("passes through RRNLRequestError with HTML that is not a Cloudflare challenge", () => {
    const event = makeEvent(
      "RRNLRequestError",
      "Relay request failed:\n\n<!DOCTYPE html><html><head><title>500 Internal Server Error</title>",
    )
    expect(sentryBeforeSend(event)).toBe(event)
  })
})
