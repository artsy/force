import { fireEvent, screen, waitFor } from "@testing-library/react"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SellFlowContextProvider } from "Apps/Sell/SellFlowContext"
import { render } from "DevTools/renderWithMockBoot"
import { useRouter } from "System/Hooks/useRouter"
import { SubmissionRoute_submission$data } from "__generated__/SubmissionRoute_submission.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Formik } from "formik"
import { useTracking } from "react-tracking"
import { useAuthDialog } from "Components/AuthDialog"

const mockUseRouter = useRouter as jest.Mock
const mockUseSystemContext = useSystemContext as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
const onSubmitMock = jest.fn()
const trackEvent = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("System/Hooks/useSystemContext")
jest.mock("Components/AuthDialog/useAuthDialog", () => ({
  useAuthDialog: jest.fn().mockReturnValue({ showAuthDialog: jest.fn() }),
}))
jest.unmock("react-relay")

const setMock = jest.fn()
Storage.prototype.setItem = setMock

const submissionMock = {
  internalID: "internal-id",
  externalId: "external-id",
} as SubmissionRoute_submission$data

describe("SubmissionLayout", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    mockUseSystemContext.mockImplementation(() => {
      return { isLoggedIn: true }
    })

    mockUseRouter.mockImplementation(() => ({
      router: {
        push: mockPush,
        replace: mockReplace,
      },
      match: {
        location: { pathname: "/sell/submissions/submission-id/dimensions" },
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
          <SellFlowContextProvider submission={submissionMock}>
            <SubmissionLayout />
          </SellFlowContextProvider>
        </Formik>
      )

      expect(screen.queryByText("Exit")).not.toBeInTheDocument()
      expect(screen.getByText("Save & Exit")).toBeInTheDocument()
    })

    it("renders the 'Back' button", () => {
      render(
        <Formik<{}>
          initialValues={{} as SubmissionRoute_submission$data}
          onSubmit={onSubmitMock}
        >
          <SellFlowContextProvider submission={submissionMock}>
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
        submission_id: "internal-id",
        submission_step: "dimensions",
      })
    })
  })

  describe("Save & Exit", () => {
    describe("while logged in", () => {
      it("saves the submission and redirects to the sell page", async () => {
        render(
          <Formik<{}> initialValues={{}} onSubmit={onSubmitMock}>
            <SellFlowContextProvider submission={submissionMock}>
              <SubmissionLayout />
            </SellFlowContextProvider>
          </Formik>
        )

        const saveAndExitButton = screen.getByText("Save & Exit")

        fireEvent.click(saveAndExitButton)

        await waitFor(() => {
          expect(trackEvent).toHaveBeenCalledWith({
            action: "tappedSubmissionSaveExit",
            context_module: "sell",
            context_owner_type: "submitArtworkStepAddDimensions",
            submission_id: "internal-id",
            submission_step: "dimensions",
          })

          expect(setMock).toHaveBeenCalledWith(
            "previousSubmissionID",
            "external-id"
          )
          expect(setMock).toHaveBeenCalledWith(
            "previousSubmissionStep",
            "dimensions"
          )

          expect(onSubmitMock).toHaveBeenCalled()
          expect(mockPush).toHaveBeenCalledWith("/sell")
        })
      })
    })

    describe("while logged out", () => {
      const mockUseAuthDialog = useAuthDialog as jest.Mock

      beforeEach(() => {
        mockUseSystemContext.mockImplementation(() => {
          return { isLoggedIn: false }
        })
      })

      it("prompts for authentication", async () => {
        const showAuthDialog = jest.fn()
        mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

        render(
          <Formik<{}> initialValues={{}} onSubmit={onSubmitMock}>
            <SellFlowContextProvider submission={submissionMock}>
              <SubmissionLayout />
            </SellFlowContextProvider>
          </Formik>
        )

        const saveAndExitButton = screen.getByText("Save & Exit")

        fireEvent.click(saveAndExitButton)

        await waitFor(() => {
          expect(trackEvent).toHaveBeenCalledWith({
            action: "tappedSubmissionSaveExit",
            context_module: "sell",
            context_owner_type: "submitArtworkStepAddDimensions",
            submission_id: "internal-id",
            submission_step: "dimensions",
          })

          expect(showAuthDialog).toBeCalledWith({
            mode: "SignUp",
            options: {
              title: expect.any(Function),
              afterAuthAction: {
                action: "saveAndExitSubmission",
                kind: "submission",
                objectId: "external-id",
                step: "dimensions",
              },
            },
            analytics: {
              contextModule: "sell",
              intent: "saveAndExitSubmission",
              trigger: "click",
            },
          })
        })
      })
    })
  })
})
