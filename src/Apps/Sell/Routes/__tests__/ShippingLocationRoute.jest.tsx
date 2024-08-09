import { fireEvent, screen, waitFor } from "@testing-library/react"
import { ShippingLocationRoute } from "Apps/Sell/Routes/AdditionalRoutes/ShippingLocationRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { ShippingLocationRoute_Test_Query$rawResponse } from "__generated__/ShippingLocationRoute_Test_Query.graphql"
import { graphql } from "react-relay"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
let submitMutation: jest.Mock

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("Utils/Hooks/useMutation")
jest.mock("System/Hooks/useSystemContext")
jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

const submissionMock: Partial<
  ShippingLocationRoute_Test_Query$rawResponse["submission"]
> = {
  state: "DRAFT",
  locationCity: "city",
  locationCountry: "Germany",
  locationCountryCode: "DE",
  locationPostalCode: "postalCode",
  locationAddress: "locationAddress",
  locationAddress2: "locationAddress2",
  locationState: "state",
}

const meMock = {
  addressConnection: {
    edges: [
      {
        node: {
          addressLine1: "addressLine1",
          addressLine2: "addressLine2",
          city: "city",
          country: "country",
          isDefault: false,
          name: "name",
          phoneNumber: "phoneNumber",
          phoneNumberCountryCode: "phoneNumberCountryCode",
          postalCode: "postalCode",
          region: "region",
        },
      },
    ],
  },
}

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockImplementation(() => {
    return { isLoggedIn: true }
  })

  mockUseRouter.mockImplementation(() => ({
    router: {
      push: mockPush,
      replace: mockReplace,
    },
    match: {
      location: {
        pathname: "/sell/submissions/submission-id/shipping-location",
      },
    },
  }))

  submitMutation = jest.fn(() => ({ catch: () => {} }))
  ;(useMutation as jest.Mock).mockImplementation(() => {
    return { submitMutation }
  })

  mockPush.mockClear()
  submitMutation.mockClear()
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <SubmissionRoute submission={props.submission}>
        <ShippingLocationRoute submission={props.submission} me={props.me} />
      </SubmissionRoute>
    )
  },
  query: graphql`
    query ShippingLocationRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...ShippingLocationRoute_submission
        ...SubmissionRoute_submission
      }
      me {
        ...ShippingLocationRoute_me
      }
    }
  `,
})

describe("ShippingLocationRoute", () => {
  it("renders the 'Shipping Location' step", async () => {
    renderWithRelay({})

    await waitFor(() => {
      expect(screen.getByText("Shipping Location")).toBeInTheDocument()
    })
  })

  it("initializes the form with the last user address in the list", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => ({ locationCity: null }),
      Me: () => meMock,
    })

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Add address")).toHaveValue(
        "addressLine1"
      )
      expect(screen.getByPlaceholderText("Add address line 2")).toHaveValue(
        "addressLine2"
      )
      expect(screen.getByPlaceholderText("Enter city")).toHaveValue("city")
      expect(screen.getByPlaceholderText("Add postal code")).toHaveValue(
        "postalCode"
      )
      expect(
        screen.getByPlaceholderText("Add state, province, or region")
      ).toHaveValue("region")
    })
  })

  describe("when form is valid", () => {
    it("updates the submission", async () => {
      renderWithRelay({ ConsignmentSubmission: () => submissionMock })

      fireEvent.change(screen.getByPlaceholderText("Add postal code"), {
        target: { value: "new postal code" },
      })

      fireEvent.change(screen.getByPlaceholderText("Add address"), {
        target: { value: "new address" },
      })

      fireEvent.change(screen.getByPlaceholderText("Add address line 2"), {
        target: { value: "new address line 2" },
      })

      fireEvent.change(screen.getByPlaceholderText("Enter city"), {
        target: { value: "new city" },
      })

      fireEvent.change(
        screen.getByPlaceholderText("Add state, province, or region"),
        {
          target: { value: "new state" },
        }
      )

      screen.getByText("Continue").click()

      await waitFor(async () => {
        expect(submitMutation).toHaveBeenCalledWith({
          variables: {
            input: {
              externalId: '<mock-value-for-field-"externalId">',
              locationAddress: "new address",
              locationAddress2: "new address line 2",
              locationCity: "new city",
              locationCountry: "Germany",
              locationCountryCode: "DE",
              locationPostalCode: "new postal code",
              locationState: "new state",
            },
          },
        })
      })
    })
  })

  describe("when form is not valid", () => {
    it("does not update the submission", async () => {
      renderWithRelay({})
    })
  })

  describe("navigation", () => {
    describe("in APPROVED state", () => {
      it("navigates to next step when the Continue button is clicked", async () => {
        renderWithRelay({
          ConsignmentSubmission: () => ({ state: "APPROVED" }),
        })

        mockPush.mockClear()

        screen.getByText("Continue").click()

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith(
            '/sell/submissions/<mock-value-for-field-"externalId">/frame'
          )
        })
      })
    })
  })
})
