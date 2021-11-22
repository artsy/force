import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ContactInformationFragmentContainer } from "../ContactInformation"
import { ContactInformationForm } from "../Components/ContactInformationForm"
import { flushPromiseQueue } from "v2/DevTools"
import { SystemContextProvider } from "v2/System"
import { ReactWrapper } from "enzyme"
import { createConsignSubmission } from "../../Utils/createConsignSubmission"
import { useErrorModal } from "../../Utils/useErrorModal"

jest.unmock("react-relay")

const previousStepsData = {
  artworkDetailsForm: {
    artistId: "artistId",
    artistName: "Banksy",
    year: "2021",
    title: "Some title",
    medium: "PAINTING",
    rarity: "limited edition",
    editionNumber: "1",
    editionSize: "2",
    height: "3",
    width: "4",
    depth: "5",
    units: "cm",
  },
  uploadPhotosForm: {
    photos: [
      {
        id: "id",
        name: "foo.png",
        size: 111084,
        s3Key: "Sr63tiKsuvMKfCWViJPWHw/foo.png",
        removed: false,
      },
    ],
  },
}
const contactInformationForm = {
  name: "Andy",
  email: "andy@test.test",
  phone: "111",
}
const mockMe = {
  name: "Serge",
  email: "serge@test.test",
  phone: "222",
  id: "userId",
}
const mockRouterPush = jest.fn()

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: { push: mockRouterPush },
    match: { params: { id: "1" } },
  })),
}))

const mockOpenErrorModal = jest.fn()
jest.mock("../../Utils/useErrorModal", () => ({
  useErrorModal: jest.fn(),
}))

jest.mock("../../Utils/createConsignSubmission", () => ({
  ...jest.requireActual("../../Utils/createConsignSubmission"),
  createConsignSubmission: jest.fn(),
}))

jest.mock("sharify", () => ({ data: { SESSION_ID: "SessionID" } }))


jest.mock("../../Utils/createConsignSubmission", () => ({
  ...jest.requireActual("../../Utils/createConsignSubmission"),
  createConsignSubmission: jest.fn(),
}))

const mockCreateConsignSubmission = createConsignSubmission as jest.Mock

let sessionStore = {
  "submission-1": JSON.stringify({
    ...previousStepsData,
  }),
}
Object.defineProperty(window, "sessionStorage", {
  value: {
    getItem: key => sessionStore[key] || null,
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
})

const getWrapperWithProps = (user?: User) =>
  setupTestWrapper({
    Component: (props: any) => {
      return (
        <SystemContextProvider user={user} isLoggedIn={!!user}>
          <ContactInformationFragmentContainer me={props.me} />
        </SystemContextProvider>
      )
    },
    query: graphql`
      query ContactInformationTestQuery {
        me {
          ...ContactInformation_me
        }
      }
    `,
  })

const simulateTyping = async (
  wrapper: ReactWrapper,
  field: string,
  text: string
) => {
  const input = wrapper.find(`input[name='${field}']`)
  input.simulate("change", { target: { name: field, value: text } })
  await flushPromiseQueue()
  wrapper.update()
}

describe("Contact Information step", () => {
  const mockUseErrorModal = useErrorModal as jest.Mock
  const saveButtonSelector = "button[data-test-id='save-button']"

  beforeEach(() => {
    mockUseErrorModal.mockImplementation(() => ({
      openErrorModal: mockOpenErrorModal,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Initial render", () => {
    it("renders correctly", async () => {
      const { getWrapper } = getWrapperWithProps(mockMe)
      const wrapper = getWrapper({ Me: () => mockMe })
      await flushPromiseQueue()
      wrapper.update()
      const text = wrapper.text()
      const artworkCurrentStep = wrapper
        .find("button")
        .filterWhere(n => n.prop("aria-selected") === true)
      artworkCurrentStep.forEach(n => {
        expect(n.text()).toContain("Contact")
      })
      expect(text).toContain("Let us know how to reach you")
      expect(text).toContain(
        "We'll only use these details to share updates on your submission."
      )
      expect(wrapper.find(ContactInformationForm).length).toBe(1)
      expect(wrapper.find("button[type='submit']").length).toBe(1)
      expect(wrapper.find("BackLink")).toHaveLength(1)
      expect(wrapper.find("BackLink").prop("to")).toEqual(
        "/consign/submission/1/upload-photos"
      )
    })
  })

  describe("Save and Continue button", () => {
    it("is disabled if at least one field is not valid", async () => {
      const { getWrapper } = getWrapperWithProps()
      const wrapper = getWrapper({
        Me: () => ({ name: null, email: null, phone: null }),
      })
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.find(saveButtonSelector).prop("disabled")).toBe(true)

      await simulateTyping(wrapper, "name", "Banksy")

      expect(wrapper.find(saveButtonSelector).prop("disabled")).toBe(true)

      await simulateTyping(wrapper, "email", "banksy@test.test")

      expect(wrapper.find(saveButtonSelector).prop("disabled")).toBe(true)

      await simulateTyping(wrapper, "phone", "333")

      expect(wrapper.find(saveButtonSelector).prop("disabled")).toBe(false)
    })

    it("is enabled if  all fields is valid", async () => {
      const { getWrapper } = getWrapperWithProps(mockMe)
      const wrapper = getWrapper({ Me: () => mockMe })
      await flushPromiseQueue()
      wrapper.update()
      const button = wrapper.find(saveButtonSelector)
      expect(button.prop("disabled")).toBe(false)
    })

    it("show error modal if consingment submission fails", async () => {
      mockCreateConsignSubmission.mockRejectedValueOnce("rejected")
      const { getWrapper } = getWrapperWithProps(mockMe)
      const wrapper = getWrapper({ Me: () => mockMe })

      wrapper.find("Form").simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(mockOpenErrorModal).toBeCalled()
    })
  })

  describe("If not logged in", () => {
    it("fields are not pre-populating from user profile", async () => {
      const { getWrapper } = getWrapperWithProps()
      const wrapper = getWrapper({
        Me: () => ({ name: null, email: null, phone: null }),
      })
      expect(wrapper.find("input[name='name']").prop("value")).toBe("")
      expect(wrapper.find("input[name='email']").prop("value")).toBe("")
      expect(wrapper.find("input[name='phone']").prop("value")).toBe("")
    })

    it("fields are pre-populating from session storage", async () => {
      sessionStore = {
        "submission-1": JSON.stringify({
          ...previousStepsData,
          contactInformationForm,
        }),
      }
      const { getWrapper } = getWrapperWithProps()
      const wrapper = getWrapper({
        Me: () => ({ name: null, email: null, phone: null }),
      })
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.find("input[name='name']").prop("value")).toBe("Andy")
      expect(wrapper.find("input[name='email']").prop("value")).toBe(
        "andy@test.test"
      )
      expect(wrapper.find("input[name='phone']").prop("value")).toBe("111")
    })

    it("submiting a valid form", async () => {
      const { getWrapper } = getWrapperWithProps()
      const wrapper = getWrapper()
      await flushPromiseQueue()
      wrapper.update()

      await simulateTyping(wrapper, "name", "Banksy")
      await simulateTyping(wrapper, "email", "banksy@test.test")
      await simulateTyping(wrapper, "phone", "333")

      wrapper.find("Form").simulate("submit")
      await flushPromiseQueue()
      wrapper.update()

      expect(sessionStorage.setItem).toHaveBeenCalled()
      expect(mockCreateConsignSubmission).toHaveBeenCalled()
      expect(mockCreateConsignSubmission.mock.calls[0][2]).toEqual(undefined)
      expect(mockCreateConsignSubmission.mock.calls[0][3]).toEqual("SessionID")
      expect(sessionStorage.removeItem).toHaveBeenCalled()
      expect(mockRouterPush).toHaveBeenCalledWith(
        "/consign/submission/1/thank-you"
      )
    })
  })

  describe("If logged in", () => {
    it("fields are pre-populating from user profile if session storage is clear", async () => {
      sessionStore = {
        "submission-1": JSON.stringify({ ...previousStepsData }),
      }
      const { getWrapper } = getWrapperWithProps(mockMe)
      const wrapper = getWrapper({ Me: () => mockMe })
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.find("input[name='name']").prop("value")).toBe(mockMe.name)
      expect(wrapper.find("input[name='email']").prop("value")).toBe(
        mockMe.email
      )
      expect(wrapper.find("input[name='phone']").prop("value")).toBe(
        mockMe.phone
      )
    })

    it("data from session storage overrides data from user profile", async () => {
      sessionStore = {
        "submission-1": JSON.stringify({
          ...previousStepsData,
          contactInformationForm,
        }),
      }
      const { getWrapper } = getWrapperWithProps(mockMe)
      const wrapper = getWrapper({ Me: () => mockMe })
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.find("input[name='name']").prop("value")).toBe("Andy")
      expect(wrapper.find("input[name='email']").prop("value")).toBe(
        "andy@test.test"
      )
      expect(wrapper.find("input[name='phone']").prop("value")).toBe("111")
    })

    it("submiting a valid form", async () => {
      const { getWrapper } = getWrapperWithProps(mockMe)
      const wrapper = getWrapper({ Me: () => mockMe })
      await flushPromiseQueue()
      wrapper.update()
      wrapper.find("Form").simulate("submit")
      await flushPromiseQueue()
      wrapper.update()

      expect(sessionStorage.setItem).toHaveBeenCalled()
      expect(mockCreateConsignSubmission).toHaveBeenCalled()
      expect(mockCreateConsignSubmission.mock.calls[0][2]).toEqual("userId")
      expect(mockCreateConsignSubmission.mock.calls[0][3]).toEqual(undefined)
      expect(sessionStorage.removeItem).toHaveBeenCalled()
      expect(mockRouterPush).toHaveBeenCalledWith(
        "/consign/submission/1/thank-you"
      )
    })
  })

  it("values are trimmed before any actions", async () => {
    const { getWrapper } = getWrapperWithProps(mockMe)
    const wrapper = getWrapper({ Me: () => mockMe })
    await flushPromiseQueue()
    wrapper.update()

    await simulateTyping(wrapper, "name", " Banksy  ")
    await simulateTyping(wrapper, "email", "  banksy@test.test  ")
    await simulateTyping(wrapper, "phone", "  333  ")

    wrapper.find("Form").simulate("submit")
    await flushPromiseQueue()
    wrapper.update()

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      "submission-1",
      JSON.stringify({
        ...previousStepsData,
        contactInformationForm: {
          name: "Banksy",
          email: "banksy@test.test",
          phone: "333",
        },
      })
    )

    expect(mockCreateConsignSubmission).toHaveBeenCalledTimes(1)
    expect(mockCreateConsignSubmission.mock.calls[0][1]).toEqual({
      ...previousStepsData,
      contactInformationForm: {
        name: "Banksy",
        email: "banksy@test.test",
        phone: "333",
      },
    })
  })
})
