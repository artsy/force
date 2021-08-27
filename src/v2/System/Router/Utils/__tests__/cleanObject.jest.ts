import { cleanObject } from "v2/Utils/cleanObject"

describe("cleanObject", () => {
  it("cleans null and undefined object keys", () => {
    expect(cleanObject({ foo: "bar", baz: null, bam: undefined })).toEqual({
      foo: "bar",
    })
  })
})
