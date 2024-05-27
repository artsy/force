import { render, screen } from "@testing-library/react"
import { ArtworkForm } from "Apps/Consign/Routes/SubmissionFlow2/ArtworkForm"
import { MockBoot } from "DevTools/MockBoot"
import { useTracking } from "react-tracking"
import { useRouter } from "System/Router/useRouter"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Router/useRouter")

const trackEvent = useTracking as jest.Mock

describe("ArtworkForm", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })

    mockUseRouter.mockImplementation(() => ({
      router: {
        push: jest.fn(),
      },
    }))
  })

  it("renders component", () => {
    render(
      <MockBoot>
        <ArtworkForm />
      </MockBoot>
    )

    expect(screen.queryByText("Back")).toBeInTheDocument()
    expect(screen.queryByText("Continue")).toBeInTheDocument()
  })
})
