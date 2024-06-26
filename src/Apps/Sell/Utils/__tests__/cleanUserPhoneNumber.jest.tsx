import { cleanUserPhoneNumber } from "Apps/Sell/Utils/cleanUserPhoneNumber"

describe(cleanUserPhoneNumber, () => {
  it("handles +-prefixed numbers correctly", () => {
    expect(cleanUserPhoneNumber("+33 32423 5342")).toEqual({
      countryCode: "fr",
      phoneNumber: "324235342",
    })
    expect(cleanUserPhoneNumber("+18076221000")).toEqual({
      countryCode: "ca",
      phoneNumber: "8076221000",
    })
    expect(cleanUserPhoneNumber("+1(555)-622-100")).toEqual({
      countryCode: "us",
      phoneNumber: "555622100",
    })
  })
})
