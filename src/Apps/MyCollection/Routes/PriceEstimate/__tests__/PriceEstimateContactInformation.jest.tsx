// import { ActionType } from "@artsy/cohesion"
// import { fireEvent, screen, waitFor } from "@testing-library/react"
// import { getPhoneNumberInformation } from "Apps/Consign/Routes/ArtworkFlow/Utils/phoneNumberUtils"
// import { PriceEstimateContactInformationFragmentContainer } from "Apps/MyCollection/Routes/PriceEstimate/PriceEstimateContactInformation"
// import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
// import { graphql } from "react-relay"
// import { useTracking } from "react-tracking"
// import { SystemContextProvider } from "System"

// jest.unmock("react-relay")
// jest.mock("react-tracking")

// const mockMe = {
//   internalID: "123",
//   name: "Serge",
//   email: "serge@test.test",
//   phone: "+1 415-555-0132",
//   phoneNumber: {
//     isValid: true,
//     international: "+1 415-555-0132",
//     national: "(415) 555-0132",
//     regionCode: "us",
//   },
// }

// const mockEmptyMe = {
//   internalID: null,
//   name: null,
//   email: null,
//   phone: null,
//   phoneNumber: null,
// }

// const mockArtwork = {
//   internalId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
//   slug: "an-artwork",
// }

// const mockRouterPush = jest.fn()
// const mockRouterReplace = jest.fn()

// jest.mock("System/Router/useRouter", () => ({
//   useRouter: jest.fn(() => ({
//     router: { push: mockRouterPush },
//   })),
// }))

// const mockSendToast = jest.fn()

// const mockGetPhoneNumberInformation = getPhoneNumberInformation as jest.Mock
// const mockTracking = useTracking as jest.Mock
// const mockTrackEvent = jest.fn()

// const getWrapper = (user?: User) =>
//   setupTestWrapperTL({
//     Component: (props: any) => {
//       return (
//         <SystemContextProvider user={user} isLoggedIn={!!user}>
//           <PriceEstimateContactInformationFragmentContainer {...props} />
//         </SystemContextProvider>
//       )
//     },
//     query: graphql`
//       query PriceEstimateContactInformation_ArtworkFlowTest_Query(
//         $artworkID: String!
//       ) @relay_test_operation {
//         artwork(id: $artworkID) @principalField {
//           ...PriceEstimateContactInformation_artwork
//         }
//         me {
//           ...PriceEstimateContactInformation_me
//         }
//       }
//     `,
//     variables: {
//       artworkID: mockArtwork.internalId,
//     },
//   })

// const simulateTyping = async (field: string, text: string) => {
//   const input = getInput(field)
//   input && fireEvent.change(input, { target: { name: field, value: text } })
// }

// const getSubmitButton = () => screen.getByTestId("save-button")
// const getInput = name =>
//   screen.getAllByRole("textbox").find(c => c.getAttribute("name") === name)

// describe("Contact Information step", () => {
//   beforeAll(() => {
//     mockGetPhoneNumberInformation.mockResolvedValue(mockMe.phoneNumber)
//     mockTracking.mockImplementation(() => ({
//       trackEvent: mockTrackEvent,
//     }))
//   })

//   afterEach(() => {
//     jest.clearAllMocks()
//   })

//   describe("Initial render", () => {
//     it("renders correctly", async () => {
//       getWrapper().renderWithRelay({
//         Me: () => mockMe,
//         ConsignmentArtwork: () => mockArtwork,
//       })

//       expect(
//         screen.getByText("Let us know how to reach you")
//       ).toBeInTheDocument()
//       expect(
//         screen.getByText(
//           "We will only use these details to contact you regarding your artwork."
//         )
//       ).toBeInTheDocument()
//       expect(screen.getByText("Back")).toBeInTheDocument()
//       expect(
//         screen.getAllByRole("link").find(c => c.textContent?.includes("Back"))
//       ).toHaveAttribute(
//         "href",
//         `/sell/artwork/${mockArtwork.externalId}/upload-photos`
//       )

//       expect(getSubmitButton()).toBeInTheDocument()
//     })
//   })

//   describe("Save and Continue button", () => {
//     it("is disabled if at least one field is not valid", async () => {
//       getWrapper().renderWithRelay({
//         Me: () => mockEmptyMe,
//         ConsignmentArtwork: () => mockArtwork,
//       })

//       expect(getSubmitButton()).toBeDisabled()

//       simulateTyping("name", "Banksy")

//       await waitFor(() => {
//         expect(getSubmitButton()).toBeDisabled()
//       })

//       simulateTyping("email", "banksy@test.test")

//       await waitFor(() => {
//         expect(getSubmitButton()).toBeDisabled()
//       })

//       simulateTyping("phone", "(415) 555-0132")

//       await waitFor(() => {
//         expect(getSubmitButton()).toBeEnabled()
//       })
//     })

//     it("is enabled if  all fields is valid", async () => {
//       getWrapper().renderWithRelay({
//         Me: () => mockMe,
//         ConsignmentArtwork: () => mockArtwork,
//       })

//       expect(getSubmitButton()).toBeEnabled()
//     })

//     it("is disabled when number is removed by user", async () => {
//       getWrapper().renderWithRelay({
//         Me: () => mockEmptyMe,
//         ConsignmentArtwork: () => mockArtwork,
//       })

//       simulateTyping("name", "Banksy")
//       simulateTyping("email", "banksy@test.test")
//       simulateTyping("phone", "+1 415-555-0132")

//       await waitFor(() => {
//         expect(getSubmitButton()).toBeEnabled()
//       })

//       simulateTyping("phone", "")

//       await waitFor(() => {
//         expect(getSubmitButton()).toBeDisabled()
//       })
//     })

//     it("show error modal if consingment artwork fails", async () => {
//       mockCreateOrUpdateConsignArtwork.mockRejectedValueOnce("rejected")
//       getWrapper().renderWithRelay({
//         Me: () => mockMe,
//         ConsignmentArtwork: () => mockArtwork,
//       })

//       fireEvent.click(getSubmitButton())

//       await waitFor(() => {
//         expect(mockSendToast).toBeCalled()
//       })
//     })
//   })

//   describe("If not logged in", () => {
//     it("fields are not pre-populating from user profile", async () => {
//       getWrapper().renderWithRelay({
//         Me: () => mockEmptyMe,
//         ConsignmentArtwork: () => mockArtwork,
//       })

//       expect(getInput("name")).not.toHaveValue()
//       expect(getInput("email")).not.toHaveValue()
//       expect(getInput("phone")).not.toHaveValue()
//     })

//     it("submiting a valid form", async () => {
//       getWrapper().renderWithRelay({
//         Me: () => mockMe,
//         ConsignmentArtwork: () => mockArtwork,
//       })

//       simulateTyping("name", "Banksy")
//       simulateTyping("email", "banksy@test.test")
//       simulateTyping("phone", "333")

//       fireEvent.click(getSubmitButton())

//       await waitFor(() => {
//         expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
//           action: "artwork_submit",
//         })
//         expect(mockCreateOrUpdateConsignArtwork).toHaveBeenCalled()
//         expect(mockCreateOrUpdateConsignArtwork.mock.calls[0][1]).toEqual({
//           externalId: mockArtwork.externalId,
//           userName: "Banksy",
//           userEmail: "banksy@test.test",
//           userPhone: "+1 415-555-0132",
//           state: "SUBMITTED",
//           sessionID: "SessionID",
//         })
//         expect(mockRouterReplace).toHaveBeenCalledWith("/sell")
//         expect(mockRouterPush).toHaveBeenCalledWith(
//           `/sell/artwork/${mockArtwork.externalId}/thank-you`
//         )
//       })
//     })
//   })

//   describe("If logged in", () => {
//     it("fields are pre-populating from user profile", async () => {
//       getWrapper().renderWithRelay({
//         Me: () => mockMe,
//         ConsignmentArtwork: () => mockArtwork,
//       })

//       expect(getInput("name")).toHaveValue(mockMe.name)
//       expect(getInput("email")).toHaveValue(mockMe.email)
//       expect(getInput("phone")).toHaveValue(mockMe.phoneNumber.national)
//     })

//     it("submiting a valid form", async () => {
//       getWrapper().renderWithRelay({
//         Me: () => mockMe,
//         ConsignmentArtwork: () => mockArtwork,
//       })

//       fireEvent.click(getSubmitButton())

//       await waitFor(() => {
//         expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
//           action: "artwork_submit",
//         })
//         expect(mockCreateOrUpdateConsignArtwork).toHaveBeenCalled()
//         expect(mockCreateOrUpdateConsignArtwork.mock.calls[0][1]).toEqual({
//           externalId: mockArtwork.externalId,
//           userName: "Serge",
//           userEmail: "serge@test.test",
//           userPhone: "+1 415-555-0132",
//           state: "SUBMITTED",
//           sessionID: "SessionID",
//         })
//         expect(mockRouterReplace).toHaveBeenCalledWith("/sell")
//         expect(mockRouterPush).toHaveBeenCalledWith(
//           `/sell/artwork/${mockArtwork.externalId}/thank-you`
//         )
//       })
//     })
//   })

//   it("values are trimmed before any actions", async () => {
//     getWrapper().renderWithRelay({
//       Me: () => mockEmptyMe,
//       ConsignmentArtwork: () => mockArtwork,
//     })

//     simulateTyping("name", " Banksy  ")
//     simulateTyping("email", "  banksy@test.test  ")
//     simulateTyping("phone", "  +1 415-555-0132  ")

//     await waitFor(() => {
//       expect(getSubmitButton()).toBeEnabled()
//     })

//     fireEvent.click(getSubmitButton())

//     await waitFor(() => {
//       expect(mockCreateOrUpdateConsignArtwork).toHaveBeenCalled()
//       expect(mockCreateOrUpdateConsignArtwork.mock.calls[0][1]).toEqual({
//         externalId: mockArtwork.externalId,
//         userName: "Banksy",
//         userEmail: "banksy@test.test",
//         userPhone: "+1 415-555-0132",
//         state: "SUBMITTED",
//         sessionID: "SessionID",
//       })
//     })
//   })

//   it("tracks consignment submitted event with user email when logged in", async () => {
//     getWrapper().renderWithRelay({
//       Me: () => mockMe,
//       ConsignmentArtwork: () => mockArtwork,
//     })

//     fireEvent.click(getSubmitButton())

//     await waitFor(() => {
//       expect(mockTrackEvent).toHaveBeenCalled()
//       expect(mockTrackEvent).toHaveBeenCalledWith({
//         action: ActionType.consignmentSubmitted,
//         artwork_id: mockArtwork.externalId,
//         user_id: "123",
//         user_email: "serge@test.test",
//       })
//     })
//   })

//   it("tracks consignment submitted event with artwork email when not logged in", async () => {
//     getWrapper().renderWithRelay({
//       Me: () => mockEmptyMe,
//       ConsignmentArtwork: () => mockArtwork,
//     })

//     simulateTyping("name", "Banksy")

//     simulateTyping("email", "banksy@test.test")

//     simulateTyping("phone", "(415) 555-0132")

//     await waitFor(() => {
//       expect(getSubmitButton()).toBeEnabled()
//     })

//     fireEvent.click(getSubmitButton())

//     await waitFor(() => {
//       expect(mockTrackEvent).toHaveBeenCalled()
//       expect(mockTrackEvent).toHaveBeenCalledWith({
//         action: ActionType.consignmentSubmitted,
//         artwork_id: mockArtwork.externalId,
//         user_id: null,
//         user_email: "banksy@test.test",
//       })
//     })
//   })
// })
