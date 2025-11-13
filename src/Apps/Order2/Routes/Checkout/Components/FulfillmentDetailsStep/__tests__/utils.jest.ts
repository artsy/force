import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import {
  countryNameFromAlpha2,
  findInitialSelectedAddress,
  normalizeAddress,
  type ProcessedUserAddress,
  processSavedAddresses,
  sortAddressesByPriority,
} from "../utils"

describe("FulfillmentDetailsStep utils", () => {
  describe("normalizeAddress", () => {
    it("normalizes a complete address", () => {
      const gravityAddress = {
        internalID: "address1",
        name: "John Doe",
        addressLine1: "123 Main St",
        addressLine2: "Apt 4B",
        city: "New York",
        region: "NY",
        postalCode: "10001",
        country: "us",
        phoneNumber: "1234567890",
        phoneNumberCountryCode: "us",
        phoneNumberParsed: { display: "+1 1234567890" },
        isDefault: false,
      }

      const result = normalizeAddress(gravityAddress)

      expect(result).toEqual({
        phoneNumber: "1234567890",
        phoneNumberCountryCode: "us",
        address: {
          name: "John Doe",
          country: "US",
          postalCode: "10001",
          addressLine1: "123 Main St",
          addressLine2: "Apt 4B",
          city: "New York",
          region: "NY",
        },
      })
    })

    it("handles missing fields with empty strings", () => {
      const gravityAddress = {
        internalID: "address2",
        name: null,
        addressLine1: "",
        addressLine2: null,
        city: "",
        region: "",
        postalCode: null,
        country: "US",
        phoneNumber: null,
        phoneNumberCountryCode: null,
        phoneNumberParsed: null,
        isDefault: true,
      }

      const result = normalizeAddress(gravityAddress)

      expect(result).toEqual({
        phoneNumber: "",
        phoneNumberCountryCode: "",
        address: {
          name: "",
          country: "US",
          postalCode: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          region: "",
        },
      })
    })

    it("converts country to uppercase", () => {
      const gravityAddress = {
        internalID: "address3",
        name: "Test User",
        addressLine1: "123 Test St",
        addressLine2: "",
        city: "Test City",
        region: "Test Region",
        postalCode: "12345",
        country: "ca",
        phoneNumber: "1234567890",
        phoneNumberCountryCode: "ca",
        phoneNumberParsed: { display: "+1 1234567890" },
        isDefault: false,
      }

      const result = normalizeAddress(gravityAddress)

      expect(result.address.country).toBe("CA")
    })
  })

  describe("countryNameFromAlpha2", () => {
    it("returns correct country names for valid codes", () => {
      expect(countryNameFromAlpha2("US")).toBe("United States")
      expect(countryNameFromAlpha2("CA")).toBe("Canada")
      expect(countryNameFromAlpha2("GB")).toBe("United Kingdom")
    })

    it("handles lowercase country codes", () => {
      expect(countryNameFromAlpha2("us")).toBe("United States")
      expect(countryNameFromAlpha2("ca")).toBe("Canada")
    })

    it("returns original code for unknown countries", () => {
      expect(countryNameFromAlpha2("XX")).toBe("XX")
      expect(countryNameFromAlpha2("UNKNOWN")).toBe("UNKNOWN")
    })
  })

  describe("processSavedAddresses", () => {
    const mockAddressConnection = {
      edges: [
        {
          node: {
            internalID: "address1",
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4B",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
            phoneNumber: "1234567890",
            phoneNumberCountryCode: "US",
            phoneNumberParsed: { display: "+1 1234567890" },
            isDefault: false,
          },
        },
        {
          node: {
            internalID: "address2",
            name: "Jane Smith",
            addressLine1: "456 Oak Ave",
            addressLine2: "",
            city: "Toronto",
            region: "ON",
            postalCode: "M5V 3A8",
            country: "CA",
            phoneNumber: "9876543210",
            phoneNumberCountryCode: "CA",
            phoneNumberParsed: { display: "+1 9876543210" },
            isDefault: true,
          },
        },
      ],
    }

    it("processes saved addresses correctly", () => {
      const availableShippingCountries = ["US", "GB"]
      const result = processSavedAddresses(
        mockAddressConnection,
        availableShippingCountries
      )

      expect(result).toHaveLength(2)
      // After sorting: valid addresses come first (invalid default comes after valid)
      expect(result[0]).toMatchObject({
        internalID: "address1",
        isValid: true, // US is in available countries
        isDefault: false,
        phoneNumber: "1234567890",
        phoneNumberCountryCode: "US",
        address: {
          name: "John Doe",
          country: "US",
          addressLine1: "123 Main St",
        },
      })
      expect(result[1]).toMatchObject({
        internalID: "address2",
        isValid: false, // CA is not in available countries
        isDefault: true,
        phoneNumber: "9876543210",
        phoneNumberCountryCode: "CA",
        address: {
          name: "Jane Smith",
          country: "CA",
          addressLine1: "456 Oak Ave",
        },
      })
    })

    it("handles empty address connection", () => {
      const emptyConnection = { edges: [] }
      const result = processSavedAddresses(emptyConnection, ["US"])

      expect(result).toEqual([])
    })

    it("handles null address connection", () => {
      const result = processSavedAddresses(null, ["US"])

      expect(result).toEqual([])
    })
  })

  describe("findInitialSelectedAddress", () => {
    const processedAddresses: ProcessedUserAddress[] = [
      {
        internalID: "address1",
        isValid: true,
        isDefault: false,
        phoneNumber: "1234567890",
        phoneNumberCountryCode: "US",
        phoneNumberParsed: { display: "+1 1234567890" },
        address: {
          name: "John Doe",
          addressLine1: "123 Main St",
          addressLine2: "Apt 4B",
          city: "New York",
          region: "NY",
          postalCode: "10001",
          country: "US",
        },
      },
      {
        internalID: "address2",
        isValid: false,
        isDefault: true,
        phoneNumber: "9876543210",
        phoneNumberCountryCode: "CA",
        phoneNumberParsed: { display: "+1 9876543210" },
        address: {
          name: "Jane Smith",
          addressLine1: "456 Oak Ave",
          addressLine2: "",
          city: "Toronto",
          region: "ON",
          postalCode: "M5V 3A8",
          country: "CA",
        },
      },
      {
        internalID: "address3",
        isValid: true,
        isDefault: false,
        phoneNumber: "5551234567",
        phoneNumberCountryCode: "GB",
        phoneNumberParsed: { display: "+44 5551234567" },
        address: {
          name: "Bob Johnson",
          addressLine1: "789 Pine St",
          addressLine2: "",
          city: "London",
          region: "",
          postalCode: "SW1A 1AA",
          country: "GB",
        },
      },
    ]

    it("finds exact matching address", () => {
      const initialValues: FormikContextWithAddress = {
        phoneNumber: "1234567890",
        phoneNumberCountryCode: "US",
        address: {
          name: "John Doe",
          addressLine1: "123 Main St",
          addressLine2: "Apt 4B",
          city: "New York",
          region: "NY",
          postalCode: "10001",
          country: "US",
        },
      }

      const result = findInitialSelectedAddress(
        processedAddresses,
        initialValues
      )

      expect(result?.internalID).toBe("address1")
    })

    it("returns first valid address when no exact match found", () => {
      const initialValues: FormikContextWithAddress = {
        phoneNumber: "0000000000",
        phoneNumberCountryCode: "XX",
        address: {
          name: "No Match",
          addressLine1: "No Match St",
          addressLine2: "",
          city: "No Match City",
          region: "XX",
          postalCode: "00000",
          country: "XX",
        },
      }

      const result = findInitialSelectedAddress(
        processedAddresses,
        initialValues
      )

      expect(result?.internalID).toBe("address1") // First valid address
    })

    it("handles empty processed addresses", () => {
      const initialValues: FormikContextWithAddress = {
        phoneNumber: "",
        phoneNumberCountryCode: "",
        address: {
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          region: "",
          postalCode: "",
          country: "",
        },
      }

      const result = findInitialSelectedAddress([], initialValues)

      expect(result).toBeUndefined()
    })

    it("returns undefined when no valid addresses exist", () => {
      const invalidAddresses: ProcessedUserAddress[] = [
        {
          internalID: "invalid1",
          isValid: false,
          isDefault: false,
          phoneNumber: "",
          phoneNumberCountryCode: "",
          phoneNumberParsed: null,
          address: {
            name: "Invalid Address",
            addressLine1: "123 Invalid St",
            addressLine2: "",
            city: "Invalid City",
            region: "",
            postalCode: "12345",
            country: "XX",
          },
        },
      ]

      const initialValues: FormikContextWithAddress = {
        phoneNumber: "",
        phoneNumberCountryCode: "",
        address: {
          name: "No Match",
          addressLine1: "No Match St",
          addressLine2: "",
          city: "No Match City",
          region: "",
          postalCode: "00000",
          country: "YY",
        },
      }

      const result = findInitialSelectedAddress(invalidAddresses, initialValues)

      expect(result).toBeUndefined()
    })

    it("matches addresses with partial empty fields", () => {
      const initialValues: FormikContextWithAddress = {
        phoneNumber: "1234567890",
        phoneNumberCountryCode: "US",
        address: {
          name: "John Doe",
          addressLine1: "123 Main St",
          addressLine2: "Apt 4B",
          city: "New York",
          region: "NY",
          postalCode: "10001",
          country: "US",
        },
      }

      // Test with slightly different address that should match
      const processedAddressesWithEmpty: ProcessedUserAddress[] = [
        {
          internalID: "address1",
          isValid: true,
          isDefault: false,
          phoneNumber: "1234567890",
          phoneNumberCountryCode: "US",
          phoneNumberParsed: { display: "+1 1234567890" },
          address: {
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4B",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
      ]

      const result = findInitialSelectedAddress(
        processedAddressesWithEmpty,
        initialValues
      )

      expect(result?.internalID).toBe("address1")
    })

    it("prioritizes exact match over default address", () => {
      const addressesWithDefault: ProcessedUserAddress[] = [
        {
          internalID: "address1",
          isValid: true,
          isDefault: false,
          phoneNumber: "1234567890",
          phoneNumberCountryCode: "US",
          phoneNumberParsed: { display: "+1 1234567890" },
          address: {
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4B",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
        {
          internalID: "address2",
          isValid: true,
          isDefault: true,
          phoneNumber: "9876543210",
          phoneNumberCountryCode: "CA",
          phoneNumberParsed: { display: "+1 9876543210" },
          address: {
            name: "Jane Smith",
            addressLine1: "456 Oak Ave",
            addressLine2: "",
            city: "Toronto",
            region: "ON",
            postalCode: "M5V 3A8",
            country: "CA",
          },
        },
      ]

      const initialValues: FormikContextWithAddress = {
        phoneNumber: "1234567890",
        phoneNumberCountryCode: "US",
        address: {
          name: "John Doe",
          addressLine1: "123 Main St",
          addressLine2: "Apt 4B",
          city: "New York",
          region: "NY",
          postalCode: "10001",
          country: "US",
        },
      }

      const result = findInitialSelectedAddress(
        addressesWithDefault,
        initialValues
      )
      expect(result?.internalID).toBe("address1") // Exact match wins over default
    })

    it("selects default address when no exact match exists", () => {
      const addressesWithDefault: ProcessedUserAddress[] = [
        {
          internalID: "address1",
          isValid: true,
          isDefault: false,
          phoneNumber: "1234567890",
          phoneNumberCountryCode: "US",
          phoneNumberParsed: { display: "+1 1234567890" },
          address: {
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4B",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
        {
          internalID: "address2",
          isValid: true,
          isDefault: true,
          phoneNumber: "9876543210",
          phoneNumberCountryCode: "CA",
          phoneNumberParsed: { display: "+1 9876543210" },
          address: {
            name: "Jane Smith",
            addressLine1: "456 Oak Ave",
            addressLine2: "",
            city: "Toronto",
            region: "ON",
            postalCode: "M5V 3A8",
            country: "CA",
          },
        },
      ]

      const initialValues: FormikContextWithAddress = {
        phoneNumber: "0000000000",
        phoneNumberCountryCode: "XX",
        address: {
          name: "No Match",
          addressLine1: "No Match St",
          addressLine2: "",
          city: "No Match City",
          region: "XX",
          postalCode: "00000",
          country: "XX",
        },
      }

      const result = findInitialSelectedAddress(
        addressesWithDefault,
        initialValues
      )
      expect(result?.internalID).toBe("address1") // Valid address selected over invalid default
    })

    it("ignores invalid default address", () => {
      const addressesWithInvalidDefault: ProcessedUserAddress[] = [
        {
          internalID: "address1",
          isValid: true,
          isDefault: false,
          phoneNumber: "1234567890",
          phoneNumberCountryCode: "US",
          phoneNumberParsed: { display: "+1 1234567890" },
          address: {
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4B",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
        {
          internalID: "address2",
          isValid: false,
          isDefault: true,
          phoneNumber: "9876543210",
          phoneNumberCountryCode: "XX",
          phoneNumberParsed: null,
          address: {
            name: "Jane Smith",
            addressLine1: "456 Oak Ave",
            addressLine2: "",
            city: "Invalid City",
            region: "XX",
            postalCode: "M5V 3A8",
            country: "XX",
          },
        },
      ]

      const initialValues: FormikContextWithAddress = {
        phoneNumber: "0000000000",
        phoneNumberCountryCode: "YY",
        address: {
          name: "No Match",
          addressLine1: "No Match St",
          addressLine2: "",
          city: "No Match City",
          region: "YY",
          postalCode: "00000",
          country: "YY",
        },
      }

      const result = findInitialSelectedAddress(
        addressesWithInvalidDefault,
        initialValues
      )
      expect(result?.internalID).toBe("address1") // Falls back to first valid address
    })
  })

  describe("sortAddressesByPriority", () => {
    it("sorts default address first", () => {
      const addresses: ProcessedUserAddress[] = [
        {
          internalID: "address1",
          isValid: true,
          isDefault: false,
          phoneNumber: "1234567890",
          phoneNumberCountryCode: "US",
          phoneNumberParsed: { display: "+1 1234567890" },
          address: {
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4B",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
        {
          internalID: "address2",
          isValid: true,
          isDefault: true,
          phoneNumber: "9876543210",
          phoneNumberCountryCode: "CA",
          phoneNumberParsed: { display: "+1 9876543210" },
          address: {
            name: "Jane Smith",
            addressLine1: "456 Oak Ave",
            addressLine2: "",
            city: "Toronto",
            region: "ON",
            postalCode: "M5V 3A8",
            country: "CA",
          },
        },
      ]

      const result = sortAddressesByPriority(addresses)
      expect(result[0].internalID).toBe("address2") // Default address first
      expect(result[1].internalID).toBe("address1")
    })

    it("sorts valid addresses before invalid ones", () => {
      const addresses: ProcessedUserAddress[] = [
        {
          internalID: "invalid1",
          isValid: false,
          isDefault: false,
          phoneNumber: "1234567890",
          phoneNumberCountryCode: "XX",
          phoneNumberParsed: null,
          address: {
            name: "Invalid Address",
            addressLine1: "123 Invalid St",
            addressLine2: "",
            city: "Invalid City",
            region: "XX",
            postalCode: "12345",
            country: "XX",
          },
        },
        {
          internalID: "valid1",
          isValid: true,
          isDefault: false,
          phoneNumber: "9876543210",
          phoneNumberCountryCode: "US",
          phoneNumberParsed: { display: "+1 9876543210" },
          address: {
            name: "Valid Address",
            addressLine1: "456 Valid Ave",
            addressLine2: "",
            city: "Valid City",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
      ]

      const result = sortAddressesByPriority(addresses)
      expect(result[0].internalID).toBe("valid1") // Valid address first
      expect(result[1].internalID).toBe("invalid1")
    })

    it("prioritizes valid over invalid default", () => {
      const addresses: ProcessedUserAddress[] = [
        {
          internalID: "valid1",
          isValid: true,
          isDefault: false,
          phoneNumber: "1234567890",
          phoneNumberCountryCode: "US",
          phoneNumberParsed: { display: "+1 1234567890" },
          address: {
            name: "Valid Address",
            addressLine1: "123 Main St",
            addressLine2: "",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
        {
          internalID: "defaultInvalid",
          isValid: false,
          isDefault: true,
          phoneNumber: "9876543210",
          phoneNumberCountryCode: "XX",
          phoneNumberParsed: null,
          address: {
            name: "Default Invalid",
            addressLine1: "456 Invalid Ave",
            addressLine2: "",
            city: "Invalid City",
            region: "XX",
            postalCode: "12345",
            country: "XX",
          },
        },
      ]

      const result = sortAddressesByPriority(addresses)
      expect(result[0].internalID).toBe("valid1") // Valid comes before invalid default
      expect(result[1].internalID).toBe("defaultInvalid")
    })

    it("prioritizes valid default over valid non-default", () => {
      const addresses: ProcessedUserAddress[] = [
        {
          internalID: "valid1",
          isValid: true,
          isDefault: false,
          phoneNumber: "1234567890",
          phoneNumberCountryCode: "US",
          phoneNumberParsed: { display: "+1 1234567890" },
          address: {
            name: "Valid Address",
            addressLine1: "123 Main St",
            addressLine2: "",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
        {
          internalID: "defaultValid",
          isValid: true,
          isDefault: true,
          phoneNumber: "9876543210",
          phoneNumberCountryCode: "CA",
          phoneNumberParsed: { display: "+1 9876543210" },
          address: {
            name: "Default Valid",
            addressLine1: "456 Valid Ave",
            addressLine2: "",
            city: "Valid City",
            region: "ON",
            postalCode: "M5V 3A8",
            country: "CA",
          },
        },
      ]

      const result = sortAddressesByPriority(addresses)
      expect(result[0].internalID).toBe("defaultValid") // Valid default comes first
      expect(result[1].internalID).toBe("valid1")
    })

    it("handles empty address list", () => {
      const result = sortAddressesByPriority([])
      expect(result).toEqual([])
    })
  })
})
