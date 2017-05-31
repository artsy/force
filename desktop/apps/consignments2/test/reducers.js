import benv from 'benv'
import configureMockStore from 'redux-mock-store'
import reducers from '../client/reducers'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import * as actions from '../client/actions'
import { __RewireAPI__ as ActionsRewireApi } from '../client/actions'

describe('Reducers', () => {
  describe('auctions', () => {
    it('returns the initial state', () => {
      const { submissionFlow } = reducers(undefined, {})
      submissionFlow.currentStep.should.eql(0)
    })

    describe('with initial state', () => {
      let initialResponse

      beforeEach(() => {
        initialResponse = reducers(undefined, {})
      })

      describe('#updateSubmission', () => {
        it('updates the current submission with json data', () => {
          const submission = {
            id: 'submission-1',
            image_url: 'http://test-image.png'
          }
          const updatedSubmission = reducers(initialResponse, actions.updateSubmission(submission))
          updatedSubmission.submissionFlow.submission.should.eql(submission)
        })
      })

      describe('#fetchArtistSuggestions', () => {
        let store

        beforeEach(() => {
          const middlewares = [ thunk ]
          const mockStore = configureMockStore(middlewares)

          store = mockStore({ submissionFlow: { user: { accessToken: 'foo' } } })
          const request = sinon.stub()
          request.get = sinon.stub().returns(request)
          request.query = sinon.stub().returns(request)
          request.set = sinon.stub().returns({
            body: [
              { name: 'andy-warhol' },
              { name: 'kara-walker' }
            ]
          })

          ActionsRewireApi.__Rewire__('request', request)
          ActionsRewireApi.__Rewire__('sd', { CURRENT_USER: { accessToken: 'foo' } })
        })

        it('calls the correct actions', () => {
          const expectedActions = [
            {
              type: 'UPDATE_ARTIST_SUGGESTIONS',
              payload: {
                suggestions: [
                  { name: 'andy-warhol' },
                  { name: 'kara-walker' }
                ]
              }
            },
            { type: 'HIDE_NOT_CONSIGNING_MESSAGE' }
          ]
          store.dispatch(actions.fetchArtistSuggestions()).then(() => {
            store.getActions().should.eql(expectedActions)
          })
        })
      })

      describe('#incrementStep', () => {
        it('updates the current step unless it is at the end', () => {
          initialResponse.submissionFlow.currentStep.should.eql(0)
          initialResponse.submissionFlow.steps.length.should.eql(4)
          const secondStep = reducers(initialResponse, actions.incrementStep())
          secondStep.submissionFlow.currentStep.should.eql(1)
          const thirdStep = reducers(secondStep, actions.incrementStep())
          thirdStep.submissionFlow.currentStep.should.eql(2)
          const fourthStep = reducers(thirdStep, actions.incrementStep())
          fourthStep.submissionFlow.currentStep.should.eql(3)
          const fifthStep = reducers(thirdStep, actions.incrementStep())
          fifthStep.submissionFlow.currentStep.should.eql(3)
        })
      })

      describe('#logIn', () => {
        let store
        let request

        beforeEach(() => {
          const middlewares = [ thunk ]
          const mockStore = configureMockStore(middlewares)
          const userResponse = {
            body: {
              user: {
                id: 'sarah'
              }
            }
          }

          store = mockStore(initialResponse)
          request = sinon.stub()
          request.post = sinon.stub().returns(request)
          request.set = sinon.stub().returns(request)
          request.send = sinon.stub().returns(userResponse)

          ActionsRewireApi.__Rewire__('request', request)
          ActionsRewireApi.__Rewire__('sd', { AP: { loginPagePath: 'https://artsy/login' }, CSRF_TOKEN: 'foo' })
        })

        afterEach(() => {
          ActionsRewireApi.__ResetDependency__('request')
          ActionsRewireApi.__ResetDependency__('sd')
        })

        it('calls the correct actions', () => {
          const expectedActions = [
            {
              type: 'UPDATE_USER',
              payload: { user: { id: 'sarah' } }
            },
            { type: 'INCREMENT_STEP' },
            { type: 'CLEAR_ERROR' }
          ]
          store.dispatch(actions.logIn({ email: 'sarah@sarah.com', password: '1234' })).then(() => {
            store.getActions().should.eql(expectedActions)
          })
        })
      })

      describe('#resetPassword', () => {
        let store
        let request

        beforeEach(() => {
          const middlewares = [ thunk ]
          const mockStore = configureMockStore(middlewares)

          store = mockStore(initialResponse)
          request = sinon.stub()
          request.post = sinon.stub().returns(request)
          request.set = sinon.stub().returns(request)
          request.send = sinon.stub().returns({ success: true })

          ActionsRewireApi.__Rewire__('request', request)
          ActionsRewireApi.__Rewire__('sd', { API_URL: 'api.artsy.net', ARTSY_XAPP_TOKEN: 'foo' })
        })

        afterEach(() => {
          ActionsRewireApi.__ResetDependency__('request')
          ActionsRewireApi.__ResetDependency__('sd')
        })

        it('calls the correct actions', () => {
          const expectedActions = [
            { type: 'CLEAR_ERROR' },
            { type: 'SHOW_RESET_PASSWORD_SUCCESS_MESSAGE' }
          ]
          store.dispatch(actions.resetPassword({ email: 'sarah@sarah.com' })).then(() => {
            store.getActions().should.eql(expectedActions)
          })
        })
      })

      describe('#signUp', () => {
        let store
        let request

        beforeEach(() => {
          const middlewares = [ thunk ]
          const mockStore = configureMockStore(middlewares)
          const userResponse = {
            body: {
              user: {
                id: 'sarah'
              }
            }
          }

          store = mockStore(initialResponse)
          request = sinon.stub()
          request.post = sinon.stub().returns(request)
          request.set = sinon.stub().returns(request)
          request.send = sinon.stub().returns(userResponse)

          ActionsRewireApi.__Rewire__('request', request)
          ActionsRewireApi.__Rewire__('sd', { AP: { loginPagePath: 'https://artsy/login' }, CSRF_TOKEN: 'foo' })
        })

        afterEach(() => {
          ActionsRewireApi.__ResetDependency__('request')
          ActionsRewireApi.__ResetDependency__('sd')
        })

        it('calls the correct actions', () => {
          const expectedActions = [
            {
              type: 'UPDATE_USER',
              payload: { user: { id: 'sarah' } }
            },
            { type: 'INCREMENT_STEP' },
            { type: 'CLEAR_ERROR' }
          ]
          store.dispatch(actions.signUp({ name: 'Sarah', email: 'sarah@sarah.com', password: '1234' })).then(() => {
            store.getActions().should.eql(expectedActions)
          })
        })
      })

      describe('#scrubLocation', () => {
        it('does nothing if the country field is already populated', () => {
          initialResponse.submissionFlow.inputs.location_city.should.eql('')
          initialResponse.submissionFlow.inputs.location_state.should.eql('')
          initialResponse.submissionFlow.inputs.location_country.should.eql('')
          const updatedState = reducers(initialResponse, actions.updateLocationInputValues('', '', 'USA'))
          updatedState.submissionFlow.inputs.location_city.should.eql('')
          updatedState.submissionFlow.inputs.location_state.should.eql('')
          updatedState.submissionFlow.inputs.location_country.should.eql('USA')
          const updatedAutocomplete = reducers(updatedState, actions.updateLocationAutocompleteValue('My City'))
          updatedAutocomplete.submissionFlow.locationAutocompleteValue.should.eql('My City')
          const scrubbedLocation = reducers(updatedAutocomplete, actions.scrubLocation())
          scrubbedLocation.submissionFlow.inputs.location_city.should.eql('')
          scrubbedLocation.submissionFlow.inputs.location_state.should.eql('')
          scrubbedLocation.submissionFlow.inputs.location_country.should.eql('USA')
        })

        it('does nothing if multiple fields are already populated', () => {
          initialResponse.submissionFlow.inputs.location_city.should.eql('')
          initialResponse.submissionFlow.inputs.location_state.should.eql('')
          initialResponse.submissionFlow.inputs.location_country.should.eql('')
          const updatedState = reducers(initialResponse, actions.updateLocationInputValues('', 'New York', 'USA'))
          updatedState.submissionFlow.inputs.location_city.should.eql('')
          updatedState.submissionFlow.inputs.location_state.should.eql('New York')
          updatedState.submissionFlow.inputs.location_country.should.eql('USA')
          const updatedAutocomplete = reducers(updatedState, actions.updateLocationAutocompleteValue('My City'))
          updatedAutocomplete.submissionFlow.locationAutocompleteValue.should.eql('My City')
          const scrubbedLocation = reducers(updatedAutocomplete, actions.scrubLocation())
          scrubbedLocation.submissionFlow.inputs.location_city.should.eql('')
          scrubbedLocation.submissionFlow.inputs.location_state.should.eql('New York')
          scrubbedLocation.submissionFlow.inputs.location_country.should.eql('USA')
        })

        it('updates the city field based on the autocomplete value', () => {
          initialResponse.submissionFlow.inputs.location_city.should.eql('')
          initialResponse.submissionFlow.inputs.location_state.should.eql('')
          initialResponse.submissionFlow.inputs.location_country.should.eql('')
          const updatedAutocomplete = reducers(initialResponse, actions.updateLocationAutocompleteValue('My City'))
          updatedAutocomplete.submissionFlow.locationAutocompleteValue.should.eql('My City')
          const getState = () => (updatedAutocomplete)
          const dispatch = sinon.spy()
          actions.scrubLocation()(dispatch, getState)
          dispatch.callCount.should.eql(1)
          dispatch.calledWithExactly({
            type: 'UPDATE_LOCATION_CITY_VALUE',
            payload: { city: 'My City' }
          }).should.be.ok()
        })
      })

      describe('#startProcessingImage', () => {
        it('adds a filename to an empty list, but does not add it twice', () => {
          initialResponse.submissionFlow.processingImages.should.eql([])
          const newProcessedImage = reducers(initialResponse, actions.startProcessingImage('astronaut.jpg'))
          newProcessedImage.submissionFlow.processingImages.should.eql(['astronaut.jpg'])
          const addedImageAgain = reducers(newProcessedImage, actions.startProcessingImage('astronaut.jpg'))
          addedImageAgain.submissionFlow.processingImages.should.eql(['astronaut.jpg'])
        })
      })

      describe('#stopProcessingImage', () => {
        it('removes a filename if it exists', () => {
          initialResponse.submissionFlow.processingImages.should.eql([])
          const stopProcessingImage = reducers(initialResponse, actions.stopProcessingImage('astronaut.jpg'))
          stopProcessingImage.submissionFlow.processingImages.should.eql([])
          const newProcessedImage = reducers(stopProcessingImage, actions.startProcessingImage('astronaut.jpg'))
          newProcessedImage.submissionFlow.processingImages.should.eql(['astronaut.jpg'])
          const stopNewImage = reducers(newProcessedImage, actions.stopProcessingImage('astronaut.jpg'))
          stopNewImage.submissionFlow.processingImages.should.eql([])
        })
      })

      describe('#updateInputs', () => {
        it('merges the initial input data with user-inputted data', () => {
          initialResponse.submissionFlow.inputs.authenticity_certificate.should.eql(true)
          initialResponse.submissionFlow.inputs.category.should.eql('Painting')
          initialResponse.submissionFlow.inputs.signature.should.eql(true)
          initialResponse.submissionFlow.inputs.title.should.eql('')
          const newInputs = {
            authenticity_certificate: 'no',
            title: 'My Artwork!',
            category: 'Sculpture'
          }
          const newInputsStep = reducers(initialResponse, actions.updateInputs(newInputs))
          newInputsStep.submissionFlow.inputs.authenticity_certificate.should.eql(false)
          newInputsStep.submissionFlow.inputs.category.should.eql('Sculpture')
          newInputsStep.submissionFlow.inputs.signature.should.eql(true)
          newInputsStep.submissionFlow.inputs.title.should.eql('My Artwork!')
        })
      })

      describe('#uploadImageToConvection', () => {
        let store
        let request

        beforeEach(() => {
          benv.setup(() => {
            sinon.stub(global, 'btoa')
          })
          const middlewares = [ thunk ]
          const mockStore = configureMockStore(middlewares)

          store = mockStore({
            submissionFlow: {
              user: { accessToken: 'foo' },
              submission: { id: 'sub1' }
            }
          })
          request = sinon.stub()
          request.post = sinon.stub().returns(request)
          request.set = sinon.stub().returns(request)
          request.send = sinon.stub().returns({ body: { token: 'i-have-access' } })

          global.window = { btoa: sinon.stub() }
          ActionsRewireApi.__Rewire__('request', request)
          ActionsRewireApi.__Rewire__('sd', { CURRENT_USER: { accessToken: 'foo' }, CONVECTION_APP_ID: 'myapp' })
        })

        afterEach(() => {
          benv.teardown()
          global.btoa.restore()
          ActionsRewireApi.__ResetDependency__('request')
          ActionsRewireApi.__ResetDependency__('sd')
        })

        it('stops processing the image if it succeeds', () => {
          const expectedActions = [
            {
              type: 'STOP_PROCESSING_IMAGE',
              payload: { fileName: 'astronaut.jpg' }
            }
          ]
          store.dispatch(actions.uploadImageToConvection('gemini-token', 'astronaut.jpg')).then(() => {
            store.getActions().should.eql(expectedActions)
          })
        })

        it('updates the error if it does not succeed', () => {
          request.send = sinon.stub().returns('TypeError')
          const expectedActions = [
            {
              type: 'UPDATE_ERROR',
              payload: { error: 'Unable to upload image.' }
            }
          ]
          const filePath = 'http://s3.com/abcdefg%2Fastronaut.jpg'
          store.dispatch(actions.uploadImageToConvection(filePath, 'astronaut.jpg')).then(() => {
            store.getActions().should.eql(expectedActions)
          })
        })
      })
    })
  })
})
