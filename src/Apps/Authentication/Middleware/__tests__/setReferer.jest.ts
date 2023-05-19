import { setReferer } from "Apps/Authentication/Middleware/setReferer"

describe("setReferer", () => {
  it("sets AUTHENTICATION_REFERER based on header", () => {
    const url = "/foo"
    const req = { header: () => url }
    const res = { locals: { sd: { AUTHENTICATION_REFERER: null } } }
    setReferer({ req, res } as any)
    expect(res.locals.sd.AUTHENTICATION_REFERER).toBe(url)
  })

  it("sets AUTHENTICATION_REFERER based on hostname", () => {
    const url = "/foo"
    const req = { header: () => null, hostname: url }
    const res = { locals: { sd: { AUTHENTICATION_REFERER: null } } }
    setReferer({ req, res } as any)
    expect(res.locals.sd.AUTHENTICATION_REFERER).toBe(url)
  })
})
