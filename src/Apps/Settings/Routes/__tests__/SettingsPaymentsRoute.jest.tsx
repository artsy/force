import { SettingsPaymentsRouteFragmentContainer } from "Apps/Settings/Routes/Payments/SettingsPaymentsRoute"
import { useDeleteBankAccount } from "Apps/Settings/Routes/Payments/useDeleteBankAccount"
import { useDeleteCreditCard } from "Apps/Settings/Routes/Payments/useDeleteCreditCard"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import type { SettingsPaymentsRoute_Test_Query } from "__generated__/SettingsPaymentsRoute_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Apps/Settings/Routes/Payments/useDeleteBankAccount")
jest.mock("Apps/Settings/Routes/Payments/useDeleteCreditCard")

const { renderWithRelay } =
  setupTestWrapperTL<SettingsPaymentsRoute_Test_Query>({
    Component: ({ me }) => {
      return <SettingsPaymentsRouteFragmentContainer me={me as any} />
    },
    query: graphql`
      query SettingsPaymentsRoute_Test_Query @relay_test_operation {
        me {
          ...SettingsPaymentsRoute_me
        }
      }
    `,
  })

const mockUseDeleteBankAccount = useDeleteBankAccount as jest.Mock
const mockUseDeleteCreditCard = useDeleteCreditCard as jest.Mock

describe("SettingsPaymentsRoute", () => {
  beforeEach(() => {
    mockUseDeleteBankAccount.mockImplementation(() => ({
      submitMutation: jest.fn(),
    }))

    mockUseDeleteCreditCard.mockImplementation(() => ({
      submitMutation: jest.fn(),
    }))
  })

  it("renders an empty state", () => {
    renderWithRelay({
      Me: () => ({
        creditCards: {
          edges: [],
        },
        bankAccounts: () => ({
          edges: [],
        }),
      }),
    })

    expect(screen.getByText("Saved Payment Details")).toBeInTheDocument()
    expect(screen.queryByText("Credit cards")).not.toBeInTheDocument()
    expect(
      screen.getByText(
        "Please add a payment method for faster checkout in the future.",
      ),
    ).toBeInTheDocument()
  })

  describe("credit cards", () => {
    it("renders correctly", () => {
      renderWithRelay({
        CreditCard: () => ({
          name: "Example Name",
          lastDigits: "1234",
        }),
      })

      expect(screen.getByText("Saved Payment Details")).toBeInTheDocument()
      expect(screen.getByText("Credit cards")).toBeInTheDocument()
      expect(screen.getByText("Example Name")).toBeInTheDocument()
      expect(screen.getByText("•••• 1234")).toBeInTheDocument()
    })

    it("removes an card", async () => {
      const mockFn = jest.fn()
      mockUseDeleteCreditCard.mockImplementation(() => ({
        submitMutation: mockFn,
      }))

      renderWithRelay({
        Me: () => ({
          creditCards: {
            edges: [
              {
                node: {
                  internalID: "1",
                },
              },
            ],
          },
          bankAccounts: {
            edges: [],
          },
        }),
      })

      fireEvent.click(screen.getByText("Remove"))

      expect(screen.getByText("Removing")).toBeInTheDocument()
      expect(mockFn).toHaveBeenCalled()
      expect(mockFn).toHaveBeenCalledWith({
        variables: { input: { id: "1" } },
        rejectIf: expect.anything(),
      })
    })
  })

  describe("bank accounts", () => {
    it("renders correctly", () => {
      renderWithRelay({
        BankAccount: () => ({
          last4: "1234",
        }),
      })

      expect(screen.getByText("Saved Payment Details")).toBeInTheDocument()
      expect(screen.getByText("Bank accounts")).toBeInTheDocument()
      expect(screen.getByText("•••• 1234")).toBeInTheDocument()
    })

    it("removes an account", async () => {
      const mockFn = jest.fn()
      mockUseDeleteBankAccount.mockImplementation(() => ({
        submitMutation: mockFn,
      }))

      renderWithRelay({
        Me: () => ({
          creditCards: {
            edges: [],
          },
          bankAccounts: {
            edges: [
              {
                node: {
                  internalID: "1",
                },
              },
            ],
          },
        }),
      })

      fireEvent.click(screen.getByText("Remove"))

      expect(screen.getByText("Removing")).toBeInTheDocument()
      expect(mockFn).toHaveBeenCalled()
      expect(mockFn).toHaveBeenCalledWith({
        variables: { input: { id: "1" } },
        rejectIf: expect.anything(),
      })
    })
  })
})
