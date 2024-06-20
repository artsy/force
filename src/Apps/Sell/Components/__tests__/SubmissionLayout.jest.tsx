import { screen } from "@testing-library/react"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SellFlowContextProvider } from "Apps/Sell/SellFlowContext"
import { render } from "DevTools/renderWithMockBoot"
import { useRouter } from "System/Hooks/useRouter"
import { Formik } from "formik"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
const onSubmitMock = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))

jest.unmock("react-relay")

describe("SubmissionLayout", () => {
  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      router: {
        push: mockPush,
        replace: mockReplace,
      },
      match: { location: { pathname: "/submissions/submission-id/title" } },
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

    expect(screen.getByText("Back")).toBeInTheDocument()
    expect(screen.getByText("Continue")).toBeInTheDocument()
    expect(screen.getByText("Exit").attributes["href"].value).toBe("/sell")
    expect(screen.getByRole("progressbar")).toBeInTheDocument()

    expect(screen.queryByText("Save & Exit")).not.toBeInTheDocument()
  })

  describe("when navigation is hidden", () => {
    it("does not render the navigation buttons", () => {
      render(
        <Formik<{}> initialValues={{}} onSubmit={jest.fn()}>
          <SellFlowContextProvider>
            <SubmissionLayout hideNavigation />
          </SellFlowContextProvider>
        </Formik>
      )

      expect(screen.getByText("Exit").attributes["href"].value).toBe("/sell")
      expect(screen.getByRole("progressbar")).toBeInTheDocument()

      expect(screen.queryByText("Back")).not.toBeInTheDocument()
      expect(screen.queryByText("Continue")).not.toBeInTheDocument()
    })
  })

  describe("with a submission ID", () => {
    it("renders the 'Save & Exit'button'", () => {
      render(
        <Formik<{}> initialValues={{}} onSubmit={onSubmitMock}>
          <SellFlowContextProvider submissionID="123">
            <SubmissionLayout />
          </SellFlowContextProvider>
        </Formik>
      )

      expect(screen.getByText("Save & Exit").attributes["href"].value).toBe(
        "/sell"
      )

      expect(screen.queryByText("Exit")).not.toBeInTheDocument()
    })
  })
})
