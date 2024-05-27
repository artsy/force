import { render, screen } from "@testing-library/react"
import { SubmitArtwork } from "Apps/Consign/Routes/SubmissionFlow2/SubmitArtwork"
import { MockBoot } from "DevTools/MockBoot"
import { Router } from "found"
import { useTracking } from "react-tracking"
import { useRouter } from "System/Router/useRouter"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Router/useRouter")

const trackEvent = useTracking as jest.Mock

describe("SubmitArtwork", () => {
  const mockUseRouter = useRouter as jest.Mock
  const routerPushMock: jest.Mock<Router["push"]> = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })

    mockUseRouter.mockImplementation(() => ({
      router: {
        push: routerPushMock,
      },
    }))
  })

  it("renders component", () => {
    render(
      <MockBoot>
        <SubmitArtwork />
      </MockBoot>
    )

    expect(screen.queryByText("It’s easy to sell on Artsy")).toBeInTheDocument()

    expect(screen.queryByText("Start from My Collection")).toBeInTheDocument()

    expect(screen.queryByText("Start New Submission")).toBeInTheDocument()
  })
})
