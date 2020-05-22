import { getConsignSubmissionUrl } from "../getConsignSubmissionUrl"

describe("getConsignSubmissionUrl", () => {
  it("encodes correct query parameters", () => {
    expect(
      getConsignSubmissionUrl({
        contextPath: "/artist/pablo-picasso",
        subject: "baz",
      })
    ).toEqual(
      "/consign/submission?contextPath=%2Fartist%2Fpablo-picasso%2Fconsign&subject=baz"
    )
  })
})
