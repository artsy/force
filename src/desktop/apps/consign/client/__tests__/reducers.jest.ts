import configureMockStore from "redux-mock-store"
import reducers from "desktop/apps/consign/client/reducers"
import thunk from "redux-thunk"
import sinon from "sinon"
import request from "superagent"

import * as actions from "desktop/apps/consign/client/actions"

jest.mock("qs", () => ({
  parse: () => ({
    contextPath: "foo",
    subject: "bar",
  }),
}))

jest.mock("superagent")
jest.mock("desktop/apps/consign/helpers", () => ({
  fetchToken: () => "fooToken",
}))

jest.mock("sharify", () => ({
  data: {
    CURRENT_USER: { accessToken: "foo" },
    CONVECTION_APP_ID: "myapp",
  },
}))

describe("Reducers", () => {
  describe("actions", () => {
    describe("setup", () => {
      it("returns the initial state", () => {
        const { submissionFlow } = reducers(undefined, {})
        submissionFlow.currentStep.should.eql("createAccount")
      })

      it("passes URL queryParams into state", () => {
        const initialState = reducers(undefined, {})
        expect(initialState.submissionFlow.contextPath).toEqual("foo")
        expect(initialState.submissionFlow.subject).toEqual("bar")
      })
    })

    describe("with initial state", () => {
      let initialResponse

      beforeEach(() => {
        initialResponse = reducers(undefined, {})
      })

      describe("#updateSubmission", () => {
        it("updates the current submission with json data", () => {
          const submission = {
            id: "submission-1",
            image_url: "http://test-image.png",
            authenticity_certificate: false,
            signature: false,
          }
          const updatedSubmission = reducers(
            initialResponse,
            actions.updateSubmission(submission)
          )
          updatedSubmission.submissionFlow.submission.should.eql(submission)
        })
      })

      describe("#updateUserPhone", () => {
        it("updates to the new phone number if no phone exists", () => {
          const withUser = reducers(
            initialResponse,
            actions.updateUser({ phone: "" })
          )
          const newPhone = "1234567"
          const updatedPhone = reducers(
            withUser,
            actions.updateUserPhone(newPhone)
          )
          updatedPhone.submissionFlow.user.phone.should.eql(newPhone)
        })

        it("updates to the new phone number if one already exists", () => {
          const withUser = reducers(
            initialResponse,
            actions.updateUser({ phone: "987654" })
          )
          const newPhone = "1234567"
          const updatedPhone = reducers(
            withUser,
            actions.updateUserPhone(newPhone)
          )
          updatedPhone.submissionFlow.user.phone.should.eql(newPhone)
        })
      })

      describe("#fetchArtistSuggestions", () => {
        let store

        beforeEach(() => {
          const middlewares = [thunk]
          const mockStore = configureMockStore(middlewares)

          store = mockStore({
            submissionFlow: { user: { accessToken: "foo" } },
          })

          request.get.mockImplementation(() => {
            return {
              query: () => {
                return {
                  set: () => {
                    return {
                      body: [{ name: "andy-warhol" }, { name: "kara-walker" }],
                    }
                  },
                }
              },
            }
          })
        })

        it("calls the correct actions", done => {
          const expectedActions = [
            {
              type: "UPDATE_ARTIST_SUGGESTIONS",
              payload: {
                suggestions: [{ name: "andy-warhol" }, { name: "kara-walker" }],
              },
            },
            { type: "HIDE_NOT_CONSIGNING_MESSAGE" },
          ]
          store
            .dispatch(actions.fetchArtistSuggestions())
            .then(() => {
              store.getActions().should.eql(expectedActions)
              done()
            })
            .catch(err => done(err))
        })
      })

      describe("#createSubmission", () => {
        let store

        beforeEach(() => {
          const middlewares = [thunk]
          const mockStore = configureMockStore(middlewares)

          store = mockStore({
            submissionFlow: {
              user: { accessToken: "foo", phone: "12345" },
              submission: {},
              inputs: { phone: "12345" },
            },
          })

          request.post.mockImplementation(() => {
            return {
              set: () => {
                return {
                  send: () => {
                    return {
                      body: { id: "sub1" },
                    }
                  },
                }
              },
            }
          })
        })

        it("sends the correct actions on success without updating phone", done => {
          const expectedActions = [
            {
              type: "SUBMISSION_CREATED",
              payload: { submissionId: "sub1" },
            },
            {
              type: "UPDATE_SUBMISSION",
              payload: { submission: { id: "sub1" } },
            },
            { type: "HIDE_LOADER" },
            {
              type: "@@router/CALL_HISTORY_METHOD",
              payload: {
                method: "push",
                args: ["/consign/submission/sub1/describe-your-work"],
              },
            },
            {
              type: "@@router/CALL_HISTORY_METHOD",
              payload: {
                method: "push",
                args: ["/consign/submission/sub1/upload-photos"],
              },
            },
          ]
          store
            .dispatch(actions.createSubmission())
            .then(() => {
              store.getActions().should.eql(expectedActions)
              done()
            })
            .catch(err => done(err))
        })

        it("sends the correct actions on success while also updating the phone", done => {
          store.dispatch(actions.updateUserPhone("6073490948"))
          const expectedActions = [
            {
              type: "UPDATE_USER_PHONE",
              payload: { phone: "6073490948" },
            },
            {
              type: "SUBMISSION_CREATED",
              payload: { submissionId: "sub1" },
            },
            {
              type: "UPDATE_SUBMISSION",
              payload: { submission: { id: "sub1" } },
            },
            { type: "HIDE_LOADER" },
            {
              type: "@@router/CALL_HISTORY_METHOD",
              payload: {
                method: "push",
                args: ["/consign/submission/sub1/describe-your-work"],
              },
            },
            {
              type: "@@router/CALL_HISTORY_METHOD",
              payload: {
                method: "push",
                args: ["/consign/submission/sub1/upload-photos"],
              },
            },
          ]
          store
            .dispatch(actions.createSubmission())
            .then(() => {
              store.getActions().should.eql(expectedActions)
              done()
            })
            .catch(err => done(err))
        })

        xit("sends the correct actions on error", done => {
          // FIXME: request mocking cannot catch errors
          const expectedActions = [
            {
              type: "HIDE_LOADER",
            },
            {
              type: "SUBMISSION_ERROR",
              payload: {
                errorType: "convection_create",
              },
            },
            {
              type: "UPDATE_ERROR",
              payload: {
                error: "Unable to submit at this time.",
              },
            },
          ]
          request.send = sinon.stub().returns("TypeError")
          store
            .dispatch(actions.createSubmission())
            .then(() => {
              store.getActions().should.eql(expectedActions)
              done()
            })
            .catch(err => done(err))
        })
      })

      describe("#scrubLocation", () => {
        it("does nothing if the country field is already populated", () => {
          initialResponse.submissionFlow.inputs.location_city.should.eql("")
          initialResponse.submissionFlow.inputs.location_state.should.eql("")
          initialResponse.submissionFlow.inputs.location_country.should.eql("")
          const updatedState = reducers(
            initialResponse,
            actions.updateLocationInputValues("", "", "USA")
          )
          updatedState.submissionFlow.inputs.location_city.should.eql("")
          updatedState.submissionFlow.inputs.location_state.should.eql("")
          updatedState.submissionFlow.inputs.location_country.should.eql("USA")
          const updatedAutocomplete = reducers(
            updatedState,
            actions.updateLocationAutocompleteValue("My City")
          )
          updatedAutocomplete.submissionFlow.locationAutocompleteValue.should.eql(
            "My City"
          )
          const scrubbedLocation = reducers(
            updatedAutocomplete,
            actions.scrubLocation()
          )
          scrubbedLocation.submissionFlow.inputs.location_city.should.eql("")
          scrubbedLocation.submissionFlow.inputs.location_state.should.eql("")
          scrubbedLocation.submissionFlow.inputs.location_country.should.eql(
            "USA"
          )
        })

        it("does nothing if multiple fields are already populated", () => {
          initialResponse.submissionFlow.inputs.location_city.should.eql("")
          initialResponse.submissionFlow.inputs.location_state.should.eql("")
          initialResponse.submissionFlow.inputs.location_country.should.eql("")
          const updatedState = reducers(
            initialResponse,
            actions.updateLocationInputValues("", "New York", "USA")
          )
          updatedState.submissionFlow.inputs.location_city.should.eql("")
          updatedState.submissionFlow.inputs.location_state.should.eql(
            "New York"
          )
          updatedState.submissionFlow.inputs.location_country.should.eql("USA")
          const updatedAutocomplete = reducers(
            updatedState,
            actions.updateLocationAutocompleteValue("My City")
          )
          updatedAutocomplete.submissionFlow.locationAutocompleteValue.should.eql(
            "My City"
          )
          const scrubbedLocation = reducers(
            updatedAutocomplete,
            actions.scrubLocation()
          )
          scrubbedLocation.submissionFlow.inputs.location_city.should.eql("")
          scrubbedLocation.submissionFlow.inputs.location_state.should.eql(
            "New York"
          )
          scrubbedLocation.submissionFlow.inputs.location_country.should.eql(
            "USA"
          )
        })

        it("updates the city field based on the autocomplete value", () => {
          initialResponse.submissionFlow.inputs.location_city.should.eql("")
          initialResponse.submissionFlow.inputs.location_state.should.eql("")
          initialResponse.submissionFlow.inputs.location_country.should.eql("")
          const updatedAutocomplete = reducers(
            initialResponse,
            actions.updateLocationAutocompleteValue("My City")
          )
          updatedAutocomplete.submissionFlow.locationAutocompleteValue.should.eql(
            "My City"
          )
          const getState = () => updatedAutocomplete
          const dispatch = sinon.spy()
          actions.scrubLocation()(dispatch, getState)
          dispatch.callCount.should.eql(1)
          dispatch
            .calledWithExactly({
              type: "UPDATE_LOCATION_CITY_VALUE",
              payload: { city: "My City" },
            })
            .should.be.ok()
        })
      })

      describe("#removeImage", () => {
        it("removes the image from all of the arrays", () => {
          const middlewares = [thunk]
          const mockStore = configureMockStore(middlewares)
          const store = mockStore({
            submissionFlow: {
              erroredImages: ["astronaut.jpg"],
              uploadedImages: [
                { fileName: "astronaut.jpg", src: "bloop", processing: true },
              ],
              processingImages: ["astronaut.jpg"],
            },
          })

          const expectedActions = [
            {
              type: "REMOVE_ERRORED_IMAGE",
              payload: { fileName: "astronaut.jpg" },
            },
            {
              type: "STOP_PROCESSING_IMAGE",
              payload: { fileName: "astronaut.jpg" },
            },
            {
              type: "REMOVE_UPLOADED_IMAGE",
              payload: { fileName: "astronaut.jpg" },
            },
          ]
          store.dispatch(actions.removeImage("astronaut.jpg"))
          store.getActions().should.eql(expectedActions)
        })
      })

      describe("#errorOnImage", () => {
        it("adds a filename to an empty list, but does not add it twice", () => {
          initialResponse.submissionFlow.erroredImages.should.eql([])
          const newErroredImage = reducers(
            initialResponse,
            actions.errorOnImage("astronaut.jpg")
          )
          newErroredImage.submissionFlow.erroredImages.should.eql([
            "astronaut.jpg",
          ])
          const addedImageAgain = reducers(
            newErroredImage,
            actions.errorOnImage("astronaut.jpg")
          )
          addedImageAgain.submissionFlow.erroredImages.should.eql([
            "astronaut.jpg",
          ])
        })
      })

      describe("#removeErroredImage", () => {
        it("removes a filename if it exists", () => {
          initialResponse.submissionFlow.erroredImages.should.eql([])
          const stopErroringImage = reducers(
            initialResponse,
            actions.removeErroredImage("astronaut.jpg")
          )
          stopErroringImage.submissionFlow.erroredImages.should.eql([])
          const newErroredImage = reducers(
            stopErroringImage,
            actions.errorOnImage("astronaut.jpg")
          )
          newErroredImage.submissionFlow.erroredImages.should.eql([
            "astronaut.jpg",
          ])
          const stopNewImage = reducers(
            newErroredImage,
            actions.removeErroredImage("astronaut.jpg")
          )
          stopNewImage.submissionFlow.erroredImages.should.eql([])
        })
      })

      describe("#addImageToUploadedImages", () => {
        it("adds a filename to the hash", () => {
          initialResponse.submissionFlow.uploadedImages.should.eql([])
          const newUploadedImage = reducers(
            initialResponse,
            actions.addImageToUploadedImages("astronaut.jpg", "bloop")
          )
          newUploadedImage.submissionFlow.uploadedImages.should.eql([
            { fileName: "astronaut.jpg", src: "bloop", processing: true },
          ])
        })
      })

      describe("#removeUploadedImage", () => {
        it("removes a filename if it exists", () => {
          initialResponse.submissionFlow.uploadedImages.should.eql([])
          const stopUploadingImage = reducers(
            initialResponse,
            actions.removeUploadedImage("astronaut.jpg")
          )
          stopUploadingImage.submissionFlow.uploadedImages.should.eql([])
          const newUploadedImage = reducers(
            initialResponse,
            actions.addImageToUploadedImages("astronaut.jpg", "blahblah")
          )
          newUploadedImage.submissionFlow.uploadedImages.should.eql([
            { fileName: "astronaut.jpg", src: "blahblah", processing: true },
          ])
          const stopNewImage = reducers(
            newUploadedImage,
            actions.removeUploadedImage("astronaut.jpg")
          )
          stopNewImage.submissionFlow.uploadedImages.should.eql([])
        })
      })

      describe("#startProcessingImage", () => {
        it("adds a filename to an empty list, but does not add it twice", () => {
          initialResponse.submissionFlow.processingImages.should.eql([])
          const newProcessedImage = reducers(
            initialResponse,
            actions.startProcessingImage("astronaut.jpg")
          )
          newProcessedImage.submissionFlow.processingImages.should.eql([
            "astronaut.jpg",
          ])
          const addedImageAgain = reducers(
            newProcessedImage,
            actions.startProcessingImage("astronaut.jpg")
          )
          addedImageAgain.submissionFlow.processingImages.should.eql([
            "astronaut.jpg",
          ])
        })
      })

      describe("#stopProcessingImage", () => {
        it("removes a filename if it exists", () => {
          initialResponse.submissionFlow.processingImages.should.eql([])
          const stopProcessingImage = reducers(
            initialResponse,
            actions.stopProcessingImage("astronaut.jpg")
          )
          stopProcessingImage.submissionFlow.processingImages.should.eql([])
          const newProcessedImage = reducers(
            stopProcessingImage,
            actions.startProcessingImage("astronaut.jpg")
          )
          newProcessedImage.submissionFlow.processingImages.should.eql([
            "astronaut.jpg",
          ])
          const stopNewImage = reducers(
            newProcessedImage,
            actions.stopProcessingImage("astronaut.jpg")
          )
          stopNewImage.submissionFlow.processingImages.should.eql([])
        })
      })

      describe("#updateInputs", () => {
        it("merges the initial input data with user-inputted data", () => {
          initialResponse.submissionFlow.inputs.authenticity_certificate.should.eql(
            false
          )
          initialResponse.submissionFlow.inputs.category.should.eql("Painting")
          initialResponse.submissionFlow.inputs.signature.should.eql(false)
          initialResponse.submissionFlow.inputs.title.should.eql("")
          const newInputs = {
            authenticity_certificate: true,
            title: "My Artwork!",
            category: "Sculpture",
          }
          const newInputsStep = reducers(
            initialResponse,
            actions.updateInputs(newInputs)
          )
          newInputsStep.submissionFlow.inputs.authenticity_certificate.should.eql(
            true
          )
          newInputsStep.submissionFlow.inputs.category.should.eql("Sculpture")
          newInputsStep.submissionFlow.inputs.signature.should.eql(false)
          newInputsStep.submissionFlow.inputs.title.should.eql("My Artwork!")
        })

        it("ignores edition number and size if the checkbox is not checked", () => {
          initialResponse.submissionFlow.inputs.edition.should.eql(false)
          initialResponse.submissionFlow.inputs.edition_number.should.eql("")
          initialResponse.submissionFlow.inputs.edition_size.should.eql(0)
          const newInputs = {
            edition: false,
            edition_number: "12a",
            edition_size: 120,
          }
          const newInputsStep = reducers(
            initialResponse,
            actions.updateInputs(newInputs)
          )
          newInputsStep.submissionFlow.inputs.edition.should.eql(false)
          newInputsStep.submissionFlow.inputs.edition_number.should.eql("")
          newInputsStep.submissionFlow.inputs.edition_size.should.eql(0)
        })

        it("keeps edition number and size if the checkbox is checked", () => {
          initialResponse.submissionFlow.inputs.edition.should.eql(false)
          initialResponse.submissionFlow.inputs.edition_number.should.eql("")
          initialResponse.submissionFlow.inputs.edition_size.should.eql(0)
          const newInputs = {
            edition: true,
            edition_number: "12a",
            edition_size: 120,
          }
          const newInputsStep = reducers(
            initialResponse,
            actions.updateInputs(newInputs)
          )
          newInputsStep.submissionFlow.inputs.edition.should.eql(true)
          newInputsStep.submissionFlow.inputs.edition_number.should.eql("12a")
          newInputsStep.submissionFlow.inputs.edition_size.should.eql(120)
        })
      })

      describe("#handleImageUpload", () => {
        let store

        beforeEach(() => {
          const middlewares = [thunk]
          const mockStore = configureMockStore(middlewares)

          store = mockStore(initialResponse)
        })

        it("errors if the image is not the right type", done => {
          const expectedActions = [
            {
              type: "ADD_IMAGE_TO_UPLOADED_IMAGES",
              payload: { fileName: "hello.pdf", src: undefined },
            },
            {
              type: "ERROR_ON_IMAGE",
              payload: { fileName: "hello.pdf" },
            },
          ]
          store
            .dispatch(
              actions.handleImageUpload({ type: "pdf", name: "hello.pdf" })
            )
            .then(() => {
              store.getActions().should.eql(expectedActions)
              done()
            })
            .catch(err => done(err))
        })
      })

      describe("#uploadImageToConvection", () => {
        let store

        beforeEach(() => {
          const middlewares = [thunk]
          const mockStore = configureMockStore(middlewares)

          store = mockStore({
            submissionFlow: {
              user: { accessToken: "foo" },
              submission: { id: "sub1" },
            },
          })

          request.post.mockImplementation(() => {
            return {
              set: () => {
                return {
                  send: () => {
                    return {
                      body: { token: "i-have-access" },
                    }
                  },
                }
              },
            }
          })
        })

        it("stops processing the image if it succeeds", done => {
          const expectedActions = [
            {
              type: "STOP_PROCESSING_IMAGE",
              payload: { fileName: "astronaut.jpg" },
            },
            { type: "ADD_ASSET_ID", payload: { assetId: undefined } },
          ]
          store
            .dispatch(
              actions.uploadImageToConvection("gemini-token", "astronaut.jpg")
            )
            .then(() => {
              store.getActions().should.eql(expectedActions)
              done()
            })
            .catch(err => done(err))
        })

        xit("updates the error if it does not succeed", done => {
          // FIXME: request mocking cannot catch errors
          request.post = sinon.stub().returns("TypeError")
          const expectedActions = [
            {
              type: "ERROR_ON_IMAGE",
              payload: { fileName: "astronaut.jpg" },
            },
          ]
          const filePath = "http://s3.com/abcdefg%2Fastronaut.jpg"
          store
            .dispatch(
              actions.uploadImageToConvection(filePath, "astronaut.jpg")
            )
            .then(() => {
              store.getActions().should.eql(expectedActions)
              done()
            })
            .catch(err => done(err))
        })
      })
    })
  })
})
