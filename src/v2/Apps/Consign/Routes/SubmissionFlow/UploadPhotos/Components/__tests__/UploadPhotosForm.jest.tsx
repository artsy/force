import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { UploadPhotosForm } from "../UploadPhotosForm"
import { UploadPhotos } from "../../UploadPhotos"
import { ErrorModalProps } from "v2/Components/Modal/ErrorModal"
import { flushPromiseQueue } from "v2/DevTools"
import { SystemContextProvider } from "v2/System"

jest.unmock("react-relay")

const mockRouterPush = jest.fn()
jest.mock("v2/System/Router/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return {
        router: { push: mockRouterPush },
        match: {
          params: {
            id: "1",
          },
        },
      }
    }),
  }
})

let sessionStore = {
  "submission-1": JSON.stringify({
    artworkDetailsForm: {
      artistId: "artistId",
    },
  }),
}
Object.defineProperty(window, "sessionStorage", {
  value: {
    getItem(key) {
      return sessionStore[key] || null
    },
    setItem: jest.fn(),
  },
})

jest.mock("../../../Utils/fileUtils", () => ({
  ...jest.requireActual("../../../Utils/fileUtils"),
  uploadPhoto: jest
    .fn()
    .mockImplementation(async (relayEnvironment, photo, updateProgress) => {
      return await new Promise((resolve, reject) => {
        reject("rejected")
      })
    }),
}))

const { getWrapper } = setupTestWrapper({
  Component: () => {
    return (
      <SystemContextProvider>
        <UploadPhotos />
      </SystemContextProvider>
    )
  },
  query: graphql`
    query UploadPhotosQuery {
      submission(id: "") {
        id
      }
    }
  `,
})

describe("upload photos form component", () => {
  beforeEach(() => {
    sessionStore = {
      "submission-1": JSON.stringify({
        artworkDetailsForm: {
          artistId: "artistId",
        },
      }),
    }
    //@ts-ignore
    jest.spyOn(global, "FileReader").mockImplementation(function () {
      this.readAsDataURL = jest.fn()
    })
  })

  it("shows an error modal when uploading a photo fails", async () => {
    const wrapper = getWrapper()

    const dropzoneInput = wrapper
      .find(UploadPhotosForm)
      .find("[data-test-id='image-dropzone']")
      .find("input")

    dropzoneInput.simulate("change", {
      target: {
        files: [
          {
            name: "foo.png",
            path: "foo.png",
            type: "image/png",
            size: 20000,
          },
        ],
      },
    })

    await flushPromiseQueue()
    wrapper.update()

    const errorModal = wrapper.find("ErrorModal")
    const { show } = errorModal.props() as ErrorModalProps
    expect(show).toBe(true)
  })
})
