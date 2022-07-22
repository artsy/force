import { userHasLabFeature, userIsAdmin, userIsTeam } from "../user"

describe("user", () => {
  describe("userHasLabFeature", () => {
    it("returns true when user has specified lab feature", () => {
      const featureName = "my feature"
      const user: User = {
        lab_features: [featureName],
      }

      const result = userHasLabFeature(user, featureName)

      expect(result).toEqual(true)
    })

    it("returns false when user doesn't exist", () => {
      const featureName = "my feature"

      const result = userHasLabFeature(null, featureName)

      expect(result).toEqual(false)
    })

    it("returns false when user doesn't have lab_features", () => {
      const featureName = "my feature"
      const user: User = {}

      const result = userHasLabFeature(user, featureName)

      expect(result).toEqual(false)
    })

    it("returns false when user has other lab features", () => {
      const user: User = {
        lab_features: ["other feature"],
      }

      const result = userHasLabFeature(user, "original feature")

      expect(result).toEqual(false)
    })
  })

  describe("userIsAdmin", () => {
    it("returns undefined if user is undefined", () => {
      const user: User = undefined

      const result = userIsAdmin(user)

      expect(result).toEqual(false)
    })

    it("returns false if user is not of type 'Admin'", () => {
      const user: User = {
        type: "Sous-Chef",
      }

      const result = userIsAdmin(user)

      expect(result).toEqual(false)
    })

    it("returns true if user is of type 'Admin'", () => {
      const user: User = {
        type: "Admin",
      }

      const result = userIsAdmin(user)

      expect(result).toEqual(true)
    })
  })

  describe("userIsTeam", () => {
    it("returns undefined if user is undefined", () => {
      const user: User = undefined

      const result = userIsTeam(user)

      expect(result).toEqual(false)
    })

    it("returns false if user roles do not include 'team'", () => {
      const user: User = {
        roles: ["genomer"],
      }

      const result = userIsTeam(user)

      expect(result).toEqual(false)
    })

    it("returns true if user is of type 'Team'", () => {
      const user: User = {
        roles: ["team"],
      }

      const result = userIsTeam(user)

      expect(result).toEqual(true)
    })
  })
})
