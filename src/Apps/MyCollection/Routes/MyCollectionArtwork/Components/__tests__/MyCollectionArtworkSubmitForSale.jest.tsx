import { fireEvent, screen, waitFor } from "@testing-library/react"
import { MyCollectionArtworkSubmitForSale } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSubmitForSale"
import { createOrUpdateConsignSubmission } from "Apps/Sell/Utils/createOrUpdateConsignSubmission"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useRouter } from "System/Hooks/useRouter"
import { graphql } from "react-relay"

const mockUseFeatureFlag = useFeatureFlag as jest.Mock
const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()

jest.unmock("react-relay")
jest.mock("Apps/Sell/Utils/createOrUpdateConsignSubmission", () => ({
  ...jest.requireActual("Apps/Sell/Utils/createOrUpdateConsignSubmission"),
  createOrUpdateConsignSubmission: jest.fn().mockResolvedValue("submission-id"),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <MyCollectionArtworkSubmitForSale artwork={props.artwork} />
  },
  query: graphql`
    query MyCollectionArtworkSubmitForSale_Test_Query @raw_response_type {
      artwork(id: "artwork-id") {
        ...MyCollectionArtworkSubmitForSale_artwork
      }
    }
  `,
})

describe("MyCollection Artwork SWA Section", () => {
  beforeEach(() => {
    mockUseFeatureFlag.mockImplementation(() => true)
  })

  describe("submit for sale", () => {
    beforeEach(() => {
      mockUseRouter.mockImplementation(() => ({
        router: {
          push: mockPush,
        },
      }))
    })

    describe("when artwork is already submitted", () => {
      it("opens the submission page and does not create a new submission", async () => {
        renderWithRelay({
          Artwork: () => ({
            consignmentSubmission: {
              submissionId: "submission-id",
            },
            artist: {
              targetSupply: {
                priority: "TRUE",
              },
            },
          }),
        })

        fireEvent.click(screen.getByTestId("submit-for-sale-link"))

        expect(mockPush).toBeCalledWith(
          '/sell/submissions/<mock-value-for-field-"internalID">/artist',
        )

        expect(createOrUpdateConsignSubmission).not.toBeCalled()
      })
    })

    describe("when artwork has not not submitted", () => {
      it("creates a new submission and opens the submission page", async () => {
        renderWithRelay({
          Artwork: () => ({
            consignmentSubmission: null,
            artist: {
              targetSupply: {
                priority: "TRUE",
              },
            },
          }),
        })

        fireEvent.click(screen.getByTestId("submit-for-sale-link"))

        await waitFor(() => {
          expect(createOrUpdateConsignSubmission).toHaveBeenCalled()

          expect(mockPush).toBeCalledWith(
            "/sell/submissions/submission-id/artist",
          )
        })
      })
    })
  })

  describe("when artist is not in target supply", () => {
    it("does not render the component", async () => {
      renderWithRelay({
        Artwork: () => ({
          artist: {
            targetSupply: {
              priority: "FALSE",
            },
          },
        }),
      })

      expect(
        screen.queryByText("Interested in Selling This Work?"),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId("submit-for-sale-link"),
      ).not.toBeInTheDocument()
    })
  })
})
