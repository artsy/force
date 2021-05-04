import { createMockEnvironment } from "relay-test-utils"
import { runAuthIntent } from "../index"
import Cookies from "cookies-js"
import { followGeneMutation } from "../mutations/AuthIntentFollowGeneMutation"
import { followArtistMutation } from "../mutations/AuthIntentFollowArtistMutation"
import { followProfileMutation } from "../mutations/AuthIntentFollowProfileMutation"
import { saveArtworkMutation } from "../mutations/AuthIntentSaveArtworkMutation"

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

        await runAuthIntent({}, env as any)

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

        await runAuthIntent({}, env as any)

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

        await runAuthIntent({}, env as any)

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

        await runAuthIntent({}, env as any)

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
      it("follows the artist and expires the cookie", async () => {
        ;(followProfileMutation as jest.Mock).mockImplementation(() =>
          Promise.resolve()
        )

        jest.spyOn(Cookies, "expire")

        await runAuthIntent({}, env as any)

        expect(followProfileMutation).toBeCalledWith(env, "jtt-gallery")
        expect(Cookies.expire).toBeCalledWith("afterSignUpAction")
      })
    })

    describe("failure", () => {
      it("tries to follow the artist; does not expire the cookie", async () => {
        ;(followProfileMutation as jest.Mock).mockImplementation(() =>
          Promise.reject()
        )

        jest.spyOn(Cookies, "expire")
        jest.spyOn(global.console, "error").mockImplementation(jest.fn())

        await runAuthIntent({}, env as any)

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

        await runAuthIntent({}, env as any)

        expect(saveArtworkMutation).toBeCalledWith(
          env,
          "on-kawara-one-million-years"
        )
        expect(Cookies.expire).toBeCalledWith("afterSignUpAction")
      })
    })

    describe("failure", () => {
      it("tries to follow the artist; does not expire the cookie", async () => {
        ;(saveArtworkMutation as jest.Mock).mockImplementation(() =>
          Promise.reject()
        )

        jest.spyOn(Cookies, "expire")
        jest.spyOn(global.console, "error").mockImplementation(jest.fn())

        await runAuthIntent({}, env as any)

        expect(saveArtworkMutation).toBeCalledWith(
          env,
          "on-kawara-one-million-years"
        )
        expect(Cookies.expire).not.toBeCalled()
        expect(global.console.error).toBeCalled()
      })
    })
  })
})
