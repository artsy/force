import qs from "query-string"
import { render, waitFor, screen } from "@testing-library/react"
import { MockBoot, MockRouter } from "v2/DevTools"
import { authenticationRoutes } from "../authenticationRoutes"
import { setCookies } from "v2/Apps/Authentication/Utils/helpers"

jest.mock("../Utils/helpers", () => ({
  ...jest.requireActual("../Utils/helpers"),
  setCookies: jest.fn(),
}))

jest.mock("v2/Utils/EnableRecaptcha", () => ({
  EnableRecaptcha: () => "EnableRecaptcha",
}))

describe("AuthenticationApp", () => {
  const renderTestRoute = route => {
    render(
      <MockBoot>
        <MockRouter initialRoute={route} routes={authenticationRoutes} />
      </MockBoot>
    )
  }

  describe("forgot", () => {
    it("shows reset password title by default", async () => {
      renderTestRoute("/forgot")
      expect((await screen.findAllByText("Reset your password")).length).toBe(2)
    })

    it("shows set password title if `set_password` param passed", async () => {
      renderTestRoute("/forgot?set_password=true")
      expect((await screen.findAllByText("Set your password")).length).toBe(2)
    })
  })

  describe("login", () => {
    it("renders login by default", async () => {
      renderTestRoute("/login")
      expect((await screen.findAllByText("EnableRecaptcha")).length).toBe(1)
      expect((await screen.findAllByText("Login to Artsy")).length).toBe(2)
    })

    it("sets cookie with passed login params on mount", async () => {
      const queryParams = {
        action: "follow",
        destination: "/foo",
        kind: "artist",
        objectId: 123,
        redirectTo: "/bar",
        signupReferer: "referrer",
      }

      renderTestRoute(`/login?${qs.stringify(queryParams)}`)

      await waitFor(() => {
        expect(setCookies).toHaveBeenCalledWith(queryParams)
      })
    })
  })

  describe("signup", () => {
    it("renders signup", async () => {
      renderTestRoute(`/signup`)
      expect((await screen.findAllByText("EnableRecaptcha")).length).toBe(1)
      expect((await screen.findAllByText("Signup to Artsy")).length).toBe(2)
    })

    it("sets cookie with passed login params on mount", async () => {
      const queryParams = {
        action: "follow",
        destination: "/foo",
        kind: "artist",
        objectId: 123,
        redirectTo: "/bar",
        signupReferer: "referrer",
      }

      renderTestRoute(`/signup?${qs.stringify(queryParams)}`)

      await waitFor(() => {
        expect(setCookies).toHaveBeenCalledWith(queryParams)
      })
    })
  })
})
