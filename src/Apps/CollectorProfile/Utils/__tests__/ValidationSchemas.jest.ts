import { editProfileVerificationSchema } from "../ValidationSchemas"

describe("editProfileVerificationSchema", () => {
  describe("name field", () => {
    it("requires a name", async () => {
      await expect(
        editProfileVerificationSchema.validate({
          name: "",
          locationSelected: true,
        }),
      ).rejects.toThrow("Name is required")
    })

    it("accepts a valid name", async () => {
      const result = await editProfileVerificationSchema.validate({
        name: "John Doe",
        locationSelected: true,
      })
      expect(result.name).toBe("John Doe")
    })
  })

  describe("instagram field", () => {
    it("accepts valid instagram handles with letters, numbers, underscores, and periods", async () => {
      const validHandles = [
        "username",
        "user_name",
        "user.name",
        "user123",
        "user_123.name",
        "@username",
        "@user_name",
        "@user.name",
        "@user123",
        "@user_123.name",
      ]

      for (const handle of validHandles) {
        const result = await editProfileVerificationSchema.validate({
          name: "Test",
          locationSelected: true,
          instagram: handle,
        })
        expect(result.instagram).toBe(handle)
      }
    })

    it("accepts empty, null, or undefined instagram values", async () => {
      const emptyValues = ["", null, undefined]

      for (const value of emptyValues) {
        const result = await editProfileVerificationSchema.validate({
          name: "Test",
          locationSelected: true,
          instagram: value,
        })
        expect(result.instagram).toBe(value)
      }
    })

    it("rejects instagram handles with invalid characters", async () => {
      const invalidHandles = [
        "user@name",
        "user name",
        "user-name",
        "user!name",
        "user#name",
        "user$name",
        "user%name",
      ]

      for (const handle of invalidHandles) {
        await expect(
          editProfileVerificationSchema.validate({
            name: "Test",
            locationSelected: true,
            instagram: handle,
          }),
        ).rejects.toThrow(
          "Instagram handle can only contain letters, numbers, underscores, and periods",
        )
      }
    })
  })

  describe("linkedIn field", () => {
    it("accepts valid linkedin handles with letters, numbers, and hyphens", async () => {
      const validHandles = ["username", "user-name", "user123", "user-123-name"]

      for (const handle of validHandles) {
        const result = await editProfileVerificationSchema.validate({
          name: "Test",
          locationSelected: true,
          linkedIn: handle,
        })
        expect(result.linkedIn).toBe(handle)
      }
    })

    it("accepts empty, null, or undefined linkedin values", async () => {
      const emptyValues = ["", null, undefined]

      for (const value of emptyValues) {
        const result = await editProfileVerificationSchema.validate({
          name: "Test",
          locationSelected: true,
          linkedIn: value,
        })
        expect(result.linkedIn).toBe(value)
      }
    })

    it("rejects linkedin handles with invalid characters", async () => {
      const invalidHandles = [
        "user@name",
        "user name",
        "user_name",
        "user.name",
        "user!name",
        "user#name",
        "user$name",
        "user%name",
      ]

      for (const handle of invalidHandles) {
        await expect(
          editProfileVerificationSchema.validate({
            name: "Test",
            locationSelected: true,
            linkedIn: handle,
          }),
        ).rejects.toThrow(
          "LinkedIn handle can only contain letters, numbers, and hyphens",
        )
      }
    })
  })

  describe("locationSelected field", () => {
    it("requires location to be selected from dropdown", async () => {
      await expect(
        editProfileVerificationSchema.validate({
          name: "Test",
          locationSelected: false,
        }),
      ).rejects.toThrow("Please select a city from the dropdown")
    })

    it("accepts when location is selected", async () => {
      const result = await editProfileVerificationSchema.validate({
        name: "Test",
        locationSelected: true,
      })
      expect(result.locationSelected).toBe(true)
    })
  })
})
