import { render, screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { HomeBasedOnYourRecentSavesRailQueryRenderer } from "Apps/Home/Components/HomeBasedOnYourRecentSavesRail"

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({
    relayEnvironment: {},
    user: { id: "user-1" },
  }),
}))

jest.mock("System/Relay/SystemQueryRenderer", () => ({
  SystemQueryRenderer: () => {
    return <div data-testid="rail-query" />
  },
}))

describe("HomeBasedOnYourRecentSavesRailQueryRenderer", () => {
  it("does not query when the feature flag is off", () => {
    ;(useFlag as jest.Mock).mockReturnValue(false)

    render(<HomeBasedOnYourRecentSavesRailQueryRenderer railPositionY={6} />)

    expect(screen.queryByTestId("rail-query")).not.toBeInTheDocument()
  })

  it("queries when the feature flag is on", () => {
    ;(useFlag as jest.Mock).mockReturnValue(true)

    render(<HomeBasedOnYourRecentSavesRailQueryRenderer railPositionY={6} />)

    expect(screen.getByTestId("rail-query")).toBeInTheDocument()
  })
})
