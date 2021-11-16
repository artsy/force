import { Address } from "v2/Components/AddressForm"
import { validateAddress, validatePresence } from "../formValidators"

describe("formValidators/validatePresence", () => {
  it("returns error when field is null", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(validatePresence(null)).toBe("This field is required")
  })
  it("returns error when field is undefined", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(validatePresence(undefined)).toBe("This field is required")
  })
  it("returns error when field is empty", () => {
    expect(validatePresence(" \t  ")).toBe("This field is required")
  })
})

describe("formValidators/validateAddress", () => {
  function buildAddress(): Address {
    return {
      name: "Artsy UK Ltd",
      addressLine1: "14 Gower's Walk",
      addressLine2: "Suite 2.5, The Loom",
      city: "Whitechapel",
      region: "London",
      postalCode: "E1 8PY",
      country: "UK",
      phoneNumber: "8475937743",
    }
  }

  it("returns no errors for a valid address", () => {
    const address: Address = buildAddress()

    const result = validateAddress(address)

    expect(result.hasErrors).toEqual(false)
  })

  describe("name", () => {
    it("returns an error for an undefined name", () => {
      const address: Address = buildAddress()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      address.name = undefined

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.name).toEqual("This field is required")
    })

    it("returns an error for a whitespace name", () => {
      const address: Address = buildAddress()
      address.name = "   \t"

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.name).toEqual("This field is required")
    })
  })

  describe("addressLine1", () => {
    it("returns an error for an undefined addressLine1", () => {
      const address: Address = buildAddress()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      address.addressLine1 = undefined

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.addressLine1).toEqual("This field is required")
    })

    it("returns an error for a whitespace addressLine1", () => {
      const address: Address = buildAddress()
      address.addressLine1 = "   \t"

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.addressLine1).toEqual("This field is required")
    })
  })

  describe("city", () => {
    it("returns an error for an undefined city", () => {
      const address: Address = buildAddress()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      address.city = undefined

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.city).toEqual("This field is required")
    })

    it("returns an error for a whitespace city", () => {
      const address: Address = buildAddress()
      address.city = "   \t"

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.city).toEqual("This field is required")
    })
  })

  describe("region", () => {
    it("returns no error for an undefined region if it's not US/CA", () => {
      const address: Address = buildAddress()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      address.region = undefined

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(false)
    })

    it("returns an error for an undefined region if it's US", () => {
      const address: Address = buildAddress()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      address.region = undefined
      address.country = "US"

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.region).toEqual("This field is required")
    })

    it("returns an error for a whitespace region if it's US", () => {
      const address: Address = buildAddress()
      address.region = "   \t"
      address.country = "US"

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.region).toEqual("This field is required")
    })
  })

  describe("country", () => {
    it("returns an error for an undefined country", () => {
      const address: Address = buildAddress()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      address.country = undefined

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.country).toEqual("This field is required")
    })

    it("returns an error for a whitespace country", () => {
      const address: Address = buildAddress()
      address.country = "   \t"

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.country).toEqual("This field is required")
    })
  })

  describe("postalCode", () => {
    it("returns no error for an undefined postalCode if it's not US/CA", () => {
      const address: Address = buildAddress()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      address.postalCode = undefined

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(false)
    })

    it("returns an error for an undefined postalCode if it's US", () => {
      const address: Address = buildAddress()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      address.postalCode = undefined
      address.country = "US"

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.postalCode).toEqual("This field is required")
    })

    it("returns an error for a whitespace postalCode if it's US", () => {
      const address: Address = buildAddress()
      address.postalCode = "   \t"
      address.country = "US"

      const result = validateAddress(address)

      expect(result.hasErrors).toEqual(true)
      expect(result.errors.postalCode).toEqual("This field is required")
    })
  })
})
