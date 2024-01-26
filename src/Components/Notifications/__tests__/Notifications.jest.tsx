import { screen } from "@testing-library/react"
import { Notifications } from "Components/Notifications/Notifications"
import { NotificationsWrapper } from "Components/Notifications/NotificationsWrapper"
import { render } from "DevTools/renderWithMockBoot"
import { useFeatureFlag } from "System/useFeatureFlag"

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("Notifications", () => {
  beforeEach(() => {
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
  })

  it("should render tabs", () => {
    render(<Notifications mode="page" unreadCounts={0} />)

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
  })

  it("should display new notifications message", () => {
    render(<Notifications mode="page" unreadCounts={5} />)

    expect(screen.getByText("New notifications")).toBeInTheDocument()
  })
})

describe("Notifications with pills", () => {
  beforeEach(() => {
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => true)
  })

  it("should render pills", () => {
    render(<NotificationsWrapper mode="dropdown" unreadCounts={5} />)

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
    expect(screen.getByText("Following")).toBeInTheDocument()
  })
})
