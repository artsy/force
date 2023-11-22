import { createMockEnvironment } from "relay-test-utils"
import { isValid, runAuthIntent } from "Utils/Hooks/useAuthIntent/index"
import Cookies from "cookies-js"
import { followGeneMutation } from "Utils/Hooks/useAuthIntent/mutations/AuthIntentFollowGeneMutation"
import { followArtistMutation } from "Utils/Hooks/useAuthIntent/mutations/AuthIntentFollowArtistMutation"
import { followProfileMutation } from "Utils/Hooks/useAuthIntent/mutations/AuthIntentFollowProfileMutation"
import { saveArtworkMutation } from "Utils/Hooks/useAuthIntent/mutations/AuthIntentSaveArtworkMutation"
import { associateSubmissionMutation } from "Utils/Hooks/useAuthIntent/mutations/AuthIntentAssociateSubmissionMutation"

jest.mock("cookies-js", () => ({
  get: jest.fn(),
  expire: jest.fn(),
}))

jest.mock("../mutations/AuthIntentFollowGeneMutation", () => ({
  followGeneMutation: jest.fn(),
}))

jest.mock("../mutations/AuthIntentFollowArtistMutation", () => ({
  followArtistMutation: jest.fn(),
}))

jest.mock("../mutations/AuthIntentFollowProfileMutation", () => ({
  followProfileMutation: jest.fn(),
}))

jest.mock("../mutations/AuthIntentSaveArtworkMutation", () => ({
  saveArtworkMutation: jest.fn(),
}))

jest.mock("../mutations/AuthIntentAssociateSubmissionMutation", () => ({
  associateSubmissionMutation: jest.fn(),
}))

describe("runAuthIntent", () => {
  const env = createMockEnvironment()

  describe("following a gene", () => {
    beforeEach(() => {
      ;(Cookies.get as jest.Mock).mockImplementation(() =>
        JSON.stringify({
          action: "follow",
          kind: "gene",
          objectId: "representations-of-architecture",
        })
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe("success", () => {
      it("follows the gene and expires the cookie", async () => {
        ;(followGeneMutation as jest.Mock).mockImplementation(() =>
          Promise.resolve()
        )

        jest.spyOn(Cookies, "expire")

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(followGeneMutation).toBeCalledWith(
          env,
          "representations-of-architecture"
        )
        expect(Cookies.expire).toBeCalledWith("afterSignUpAction")
      })
    })

    describe("failure", () => {
      it("tries to follow the gene; does not expire the cookie", async () => {
        ;(followGeneMutation as jest.Mock).mockImplementation(() =>
          Promise.reject()
        )

        jest.spyOn(Cookies, "expire")
        jest.spyOn(global.console, "error").mockImplementation(jest.fn())

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(followGeneMutation).toBeCalledWith(
          env,
          "representations-of-architecture"
        )
        expect(Cookies.expire).not.toBeCalled()
        expect(global.console.error).toBeCalled()
      })
    })
  })

  describe("following an artist", () => {
    beforeEach(() => {
      ;(Cookies.get as jest.Mock).mockImplementation(() =>
        JSON.stringify({
          action: "follow",
          kind: "artist",
          objectId: "roni-horn",
        })
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe("success", () => {
      it("follows the artist and expires the cookie", async () => {
        ;(followArtistMutation as jest.Mock).mockImplementation(() =>
          Promise.resolve()
        )

        jest.spyOn(Cookies, "expire")

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(followArtistMutation).toBeCalledWith(env, "roni-horn")
        expect(Cookies.expire).toBeCalledWith("afterSignUpAction")
      })
    })

    describe("failure", () => {
      it("tries to follow the artist; does not expire the cookie", async () => {
        ;(followArtistMutation as jest.Mock).mockImplementation(() =>
          Promise.reject()
        )

        jest.spyOn(Cookies, "expire")
        jest.spyOn(global.console, "error").mockImplementation(jest.fn())

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(followArtistMutation).toBeCalledWith(env, "roni-horn")
        expect(Cookies.expire).not.toBeCalled()
        expect(global.console.error).toBeCalled()
      })
    })
  })

  describe("following a profile", () => {
    beforeEach(() => {
      ;(Cookies.get as jest.Mock).mockImplementation(() =>
        JSON.stringify({
          action: "follow",
          kind: "profile",
          objectId: "jtt-gallery",
        })
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe("success", () => {
      it("follows the profile and expires the cookie", async () => {
        ;(followProfileMutation as jest.Mock).mockImplementation(() =>
          Promise.resolve()
        )

        jest.spyOn(Cookies, "expire")

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(followProfileMutation).toBeCalledWith(env, "jtt-gallery")
        expect(Cookies.expire).toBeCalledWith("afterSignUpAction")
      })
    })

    describe("failure", () => {
      it("tries to follow the profile; does not expire the cookie", async () => {
        ;(followProfileMutation as jest.Mock).mockImplementation(() =>
          Promise.reject()
        )

        jest.spyOn(Cookies, "expire")
        jest.spyOn(global.console, "error").mockImplementation(jest.fn())

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(followProfileMutation).toBeCalledWith(env, "jtt-gallery")
        expect(Cookies.expire).not.toBeCalled()
        expect(global.console.error).toBeCalled()
      })
    })
  })

  describe("saving an artwork", () => {
    beforeEach(() => {
      ;(Cookies.get as jest.Mock).mockImplementation(() =>
        JSON.stringify({
          action: "save",
          kind: "artworks",
          objectId: "on-kawara-one-million-years",
        })
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe("success", () => {
      it("saves the artwork and expires the cookie", async () => {
        ;(saveArtworkMutation as jest.Mock).mockImplementation(() =>
          Promise.resolve()
        )

        jest.spyOn(Cookies, "expire")

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(saveArtworkMutation).toBeCalledWith(
          env,
          "on-kawara-one-million-years"
        )
        expect(Cookies.expire).toBeCalledWith("afterSignUpAction")
      })
    })

    describe("failure", () => {
      it("tries to save the artwork; does not expire the cookie", async () => {
        ;(saveArtworkMutation as jest.Mock).mockImplementation(() =>
          Promise.reject()
        )

        jest.spyOn(Cookies, "expire")
        jest.spyOn(global.console, "error").mockImplementation(jest.fn())

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(saveArtworkMutation).toBeCalledWith(
          env,
          "on-kawara-one-million-years"
        )
        expect(Cookies.expire).not.toBeCalled()
        expect(global.console.error).toBeCalled()
      })
    })
  })

  describe("creating an alert", () => {
    beforeEach(() => {
      ;(Cookies.get as jest.Mock).mockImplementation(() =>
        JSON.stringify({
          action: "createAlert",
          kind: "artist",
          objectId: "banksy",
        })
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe("success", () => {
      it("doesn't need a mutation; calls the onSuccess callback and expires the cookie", async () => {
        jest.spyOn(Cookies, "expire")

        const onSuccess = jest.fn()

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess,
        })

        expect(onSuccess).toBeCalledWith({
          action: "createAlert",
          kind: "artist",
          objectId: "banksy",
        })

        expect(Cookies.expire).toBeCalledWith("afterSignUpAction")
      })
    })

    // There is no failure branch for this action
  })

  describe("associate a submission", () => {
    beforeEach(() => {
      ;(Cookies.get as jest.Mock).mockImplementation(() =>
        JSON.stringify({
          action: "associateSubmission",
          kind: "submission",
          objectId: "on-kawara-one-million-years",
        })
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe("success", () => {
      it("associates the submission and expires the cookie", async () => {
        ;(associateSubmissionMutation as jest.Mock).mockImplementation(() =>
          Promise.resolve()
        )

        jest.spyOn(Cookies, "expire")

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(associateSubmissionMutation).toBeCalledWith(
          env,
          "on-kawara-one-million-years"
        )
        expect(Cookies.expire).toBeCalledWith("afterSignUpAction")
      })
    })

    describe("failure", () => {
      it("tries to associate the submission; does not expire the cookie", async () => {
        ;(associateSubmissionMutation as jest.Mock).mockImplementation(() =>
          Promise.reject()
        )

        jest.spyOn(Cookies, "expire")
        jest.spyOn(global.console, "error").mockImplementation(jest.fn())

        await runAuthIntent({
          user: {},
          relayEnvironment: env as any,
          onSuccess: () => {},
        })

        expect(associateSubmissionMutation).toBeCalledWith(
          env,
          "on-kawara-one-million-years"
        )
        expect(Cookies.expire).not.toBeCalled()
        expect(global.console.error).toBeCalled()
      })
    })
  })
})

describe("isValid", () => {
  it("validates the cookie object", () => {
    expect(
      isValid({ action: "follow", kind: "artist", objectId: "example" })
    ).toBe(true)
    expect(
      isValid({ action: "save", kind: "artworks", objectId: "example" })
    ).toBe(true)
    expect(isValid({ action: "createAlert" })).toBe(true)
    expect(
      isValid({ action: "follow", kind: "invalid", objectId: "example" })
    ).toBe(false)
    expect(isValid({ action: "follow", kind: "artist" })).toBe(false)
    expect(isValid({ action: "follow", objectId: "example" })).toBe(false)
    expect(isValid({ kind: "artist", objectId: "example" })).toBe(false)
    expect(isValid({ action: "follow" })).toBe(false)
    expect(isValid({ kind: "artist" })).toBe(false)
    expect(isValid({ objectId: "example" })).toBe(false)
    expect(isValid({})).toBe(false)
    expect(isValid("")).toBe(false)
  })
})
