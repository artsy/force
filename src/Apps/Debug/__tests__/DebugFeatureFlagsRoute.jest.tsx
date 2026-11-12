import { render, screen } from "@testing-library/react"
import { useFlag, useFlags } from "@unleash/proxy-client-react"
import { DebugFeatureFlagsRoute } from "Apps/Debug/DebugFeatureFlagsRoute"
import { MockBoot } from "DevTools/MockBoot"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn().mockReturnValue(true),
  useVariant: jest.fn().mockReturnValue({ name: "experiment", enabled: true }),
  useFlagsStatus: jest.fn().mockReturnValue({ flagsReady: true }),
  useFlags: jest.fn().mockReturnValue([]),
}))
jest.mock("System/Hooks/useRouter")
jest.mock("System/Hooks/useSystemContext")
jest.mock("Utils/getENV")

const REQUESTED_FLAG = "example_requested-flag"

const renderPage = ({
  environment,
  user,
  flag = REQUESTED_FLAG,
}: {
  environment: string
  user: User
  flag?: unknown
}) => {
  ;(getENV as jest.Mock).mockImplementation((key: string) => {
    return key === "NODE_ENV" ? environment : undefined
  })
  ;(useSystemContext as jest.Mock).mockReturnValue({
    user,
    featureFlags: { isEnabled: () => true },
  })
  ;(useRouter as jest.Mock).mockReturnValue({
    match: { location: { query: { flag } } },
  })

  return render(
    <MockBoot>
      <DebugFeatureFlagsRoute />
    </MockBoot>,
  )
}

describe("DebugFeatureFlagsRoute", () => {
  beforeEach(() => {
    ;(useFlag as jest.Mock).mockClear()
    ;(useFlags as jest.Mock).mockReturnValue([
      {
        name: "example_enabled-flag",
        enabled: true,
        impressionData: false,
        variant: { name: "disabled", enabled: false },
      },
    ])
  })

  it("never evaluates the requested flag for non-team users in production", () => {
    renderPage({
      environment: "production",
      user: { id: "example-user", roles: ["user"] },
    })

    expect(useFlag).not.toHaveBeenCalledWith(REQUESTED_FLAG)
    expect(screen.queryByText(REQUESTED_FLAG)).not.toBeInTheDocument()
    expect(
      screen.getByText(
        "Inspecting a flag is limited to team members in production.",
      ),
    ).toBeInTheDocument()
    // The list only shows what the browser already has, so it stays open
    expect(screen.getByText("example_enabled-flag")).toBeInTheDocument()
  })

  it("lets team members inspect any flag in production", () => {
    renderPage({
      environment: "production",
      user: { id: "example-user", roles: ["user", "team"] },
    })

    expect(useFlag).toHaveBeenCalledWith(REQUESTED_FLAG)
    expect(screen.getByText(REQUESTED_FLAG)).toBeInTheDocument()
  })

  it("lets anyone inspect any flag outside of production", () => {
    renderPage({ environment: "staging", user: null })

    expect(useFlag).toHaveBeenCalledWith(REQUESTED_FLAG)
    expect(screen.getByText(REQUESTED_FLAG)).toBeInTheDocument()
  })

  it("falls back to the default flag when the query isn't a string", () => {
    // `?flag[a]=b` parses to an object, which would crash the server render
    renderPage({ environment: "staging", user: null, flag: { a: "b" } })

    expect(useFlag).toHaveBeenCalledWith("onyx_art-assistant-web")
    expect(screen.getByText("onyx_art-assistant-web")).toBeInTheDocument()
  })
})
