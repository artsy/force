import { fireEvent, screen, waitFor } from "@testing-library/react"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SellFlowContextProvider } from "Apps/Sell/SellFlowContext"
import { render } from "DevTools/renderWithMockBoot"
import { useRouter } from "System/Hooks/useRouter"
import { Formik } from "formik"
import { useTracking } from "react-tracking"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
const onSubmitMock = jest.fn()
const trackEvent = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.unmock("react-relay")

const setMock = jest.fn()
Storage.prototype.setItem = setMock

describe("SubmissionLayout", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })

    mockUseRouter.mockImplementation(() => ({
      router: {
        push: mockPush,
        replace: mockReplace,
      },
      match: {
        location: { pathname: "/submissions/submission-id/dimensions" },
      },
    }))
  })

  it("renders buttons and progressbar", () => {
    render(
      <Formik<{}> initialValues={{}} onSubmit={jest.fn()}>
        <SellFlowContextProvider>
          <SubmissionLayout />
        </SellFlowContextProvider>
      </Formik>
    )

    expect(screen.queryByText("Back")).not.toBeInTheDocument()
    expect(screen.getByText("Continue")).toBeInTheDocument()
    expect(screen.getByText("Exit")).toBeInTheDocument()
    expect(screen.getByTestId("exit-link").attributes["href"].value).toBe(
      "/sell"
    )
    expect(screen.getByRole("progressbar")).toBeInTheDocument()

    expect(screen.queryByText("Save & Exit")).not.toBeInTheDocument()
  })

  describe("without submission ID", () => {
    it("does not render the navigation buttons", () => {
      render(
        <Formik<{}> initialValues={{}} onSubmit={jest.fn()}>
          <SellFlowContextProvider>
            <SubmissionLayout hideNavigation />
          </SellFlowContextProvider>
        </Formik>
      )

      expect(screen.getByText("Exit")).toBeInTheDocument()
      expect(screen.getByTestId("exit-link").attributes["href"].value).toBe(
        "/sell"
      )
      expect(screen.getByRole("progressbar")).toBeInTheDocument()

      expect(screen.queryByText("Back")).not.toBeInTheDocument()
      expect(screen.queryByText("Continue")).not.toBeInTheDocument()
    })
  })

  describe("with a submission ID", () => {
    it("renders the 'Save & Exit'button'", async () => {
      render(
        <Formik<{}> initialValues={{}} onSubmit={onSubmitMock}>
          <SellFlowContextProvider submissionID="123">
            <SubmissionLayout />
          </SellFlowContextProvider>
        </Formik>
      )

      expect(screen.queryByText("Exit")).not.toBeInTheDocument()

      const saveAndExitButton = screen.getByText("Save & Exit")

      fireEvent.click(saveAndExitButton)

      await waitFor(() => {
        expect(trackEvent).toHaveBeenCalledWith({
          action: "tappedSubmissionSaveExit",
          context_module: "sell",
          context_owner_type: "submitArtworkStepAddDimensions",
          submission_id: "123",
          submission_step: "dimensions",
        })

        expect(setMock).toHaveBeenCalledWith("previousSubmissionID", "123")
        expect(setMock).toHaveBeenCalledWith(
          "previousSubmissionStep",
          "dimensions"
        )

        expect(onSubmitMock).toHaveBeenCalled()
        expect(mockPush).toHaveBeenCalledWith("/sell")
      })
    })

    it("renders the 'Back' button", () => {
      render(
        <Formik<{}> initialValues={{}} onSubmit={onSubmitMock}>
          <SellFlowContextProvider submissionID="123">
            <SubmissionLayout />
          </SellFlowContextProvider>
        </Formik>
      )

      const backButton = screen.getByText("Back")

      expect(backButton).toBeInTheDocument()

      fireEvent.click(backButton)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "tappedSubmissionBack",
        context_module: "sell",
        context_owner_type: "submitArtworkStepAddDimensions",
        submission_id: "123",
        submission_step: "dimensions",
      })
    })
  })
})
