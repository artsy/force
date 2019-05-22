import { areThirdPartyAdsEnabled } from "desktop/apps/article/helpers"
import { data as sd } from "sharify"

jest.mock("sharify", () => ({
  data: {
    HASHTAG_LAB_ADS_ALLOWLIST: "alloweduser@email.com,alloweduser2@email.com",
    HASHTAG_LAB_ADS_ENABLED: true,
    CURRENT_USER: {
      type: "Non-Admin",
      email: "someuser@email.com",
    },
  },
}))

describe("feature flag checks when ads should be disabled", () => {
  it("checks that ads are disabled for non-allowlisted users", () => {
    const currentUser = sd.CURRENT_USER.email
    const allowList = sd.HASHTAG_LAB_ADS_ALLOWLIST.split(",").filter(Boolean)
    const isUserAllowed = allowList.includes(currentUser)
    const mockResponse = sd.data

    expect(areThirdPartyAdsEnabled(mockResponse)).toBe(false)
    expect(allowList).toHaveLength(2)
    expect(isUserAllowed).toBe(false)
    expect(allowList).toHaveLength(2)
    expect(allowList).toEqual([
      "alloweduser@email.com",
      "alloweduser2@email.com",
    ])
  })

  it("checks that ads are disabled for current users", () => {
    const currentUser = sd.CURRENT_USER.email
    const allowList = sd.HASHTAG_LAB_ADS_ALLOWLIST.split(",").filter(Boolean)
    const allowedUsers = allowList.includes(currentUser)
    const mockResponse = sd.data

    expect(areThirdPartyAdsEnabled(mockResponse)).toBe(false)
    expect(allowedUsers).not.toContain(currentUser)
  })

  it("checks that ads are disabled for non-admin users", () => {
    const adminUser = sd.CURRENT_USER.type
    const isAdminUser = adminUser === "Admin"
    const mockResponse = sd.data

    expect(areThirdPartyAdsEnabled(mockResponse)).toBe(false)
    expect(isAdminUser).toBe(false)
    expect(adminUser).toEqual("Non-Admin")
  })
})
