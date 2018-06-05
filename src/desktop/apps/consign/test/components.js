import * as actions from '../client/actions'
import ChooseArtist from '../components/choose_artist'
import UploadedImage from '../components/uploaded_image'
import React from 'react'
import reducers from '../client/reducers'
import { responsiveWindowAction } from '../../../components/react/responsive_window'
import { createStore } from 'redux'
import { shallow } from 'enzyme'

const createAccountRewire = require('rewire')('../components/create_account')
const { default: CreateAccount } = createAccountRewire
const stepMarkerRewire = require('rewire')('../components/step_marker')
const { default: StepMarker } = stepMarkerRewire
const submissionFlowRewire = require('rewire')('../components/submission_flow')
const { default: SubmissionFlow } = submissionFlowRewire
const uploadPhotoRewire = require('rewire')('../components/upload_photo')
const { default: UploadPhoto } = uploadPhotoRewire

describe('React components', () => {
  let initialStore

  beforeEach(() => {
    initialStore = createStore(reducers)
  })

  describe('StepMarker', () => {
    describe('non-logged-in user', () => {
      it('displays four steps', () => {
        initialStore.dispatch(actions.updateStepsWithoutUser())
        const wrapper = shallow(<StepMarker store={initialStore} />)
        const rendered = wrapper.render()
        rendered.find('.consignments-step-marker__step').length.should.eql(4)
      })

      it('updates the color of step labels', () => {
        initialStore.dispatch(actions.updateStepsWithoutUser())
        const wrapper = shallow(<StepMarker store={initialStore} />)
        const rendered = wrapper.render()
        rendered
          .find('.consignments-step-marker__step_active')
          .length.should.eql(1)
        const activeText = rendered.text()
        activeText.should.containEql('Create Account')
      })

      it('includes the shorter labels if in mobile mode', () => {
        initialStore.dispatch(responsiveWindowAction(600))
        initialStore.dispatch(actions.updateStepsWithoutUser())
        const wrapper = shallow(<StepMarker store={initialStore} />)
        const rendered = wrapper.render()
        rendered
          .find('.consignments-step-marker__step_active')
          .length.should.eql(1)
        const activeText = rendered.text()
        activeText.should.eql('CreateConfirmDescribeUpload')
      })
    })

    describe('logged-in user', () => {
      it('displays thruee steps', () => {
        initialStore.dispatch(actions.updateStepsWithUser())
        const wrapper = shallow(<StepMarker store={initialStore} />)
        const rendered = wrapper.render()
        rendered.find('.consignments-step-marker__step').length.should.eql(3)
      })

      it('updates the color of step labels', () => {
        initialStore.dispatch(actions.updateStepsWithUser())
        const wrapper = shallow(<StepMarker store={initialStore} />)
        const rendered = wrapper.render()
        rendered
          .find('.consignments-step-marker__step_active')
          .length.should.eql(1)
        const activeText = rendered.text()
        activeText.should.containEql('Confirm Artist/Designer')
      })

      it('includes the shorter labels if in mobile mode', () => {
        initialStore.dispatch(responsiveWindowAction(600))
        initialStore.dispatch(actions.updateStepsWithUser())
        const wrapper = shallow(<StepMarker store={initialStore} />)
        const rendered = wrapper.render()
        rendered
          .find('.consignments-step-marker__step_active')
          .length.should.eql(1)
        const activeText = rendered.text()
        activeText.should.eql('ConfirmDescribeUpload')
      })
    })
  })

  describe('CreateAccount', () => {
    let rewires = []

    beforeEach(() => {
      rewires.push(
        createAccountRewire.__set__('ForgotPassword', () => (
          <div className="forgot-password" />
        )),
        createAccountRewire.__set__('LogIn', () => <div className="log-in" />),
        createAccountRewire.__set__('SignUp', () => <div className="sign-up" />)
      )
    })

    afterEach(() => {
      rewires.forEach(reset => reset())
    })

    describe('log in', () => {
      it('the log in form', () => {
        const wrapper = shallow(<CreateAccount store={initialStore} />)
        const rendered = wrapper.render()
        rendered.find('.log-in').length.should.eql(0)
        rendered.find('.forgot-password').length.should.eql(0)
        rendered.find('.sign-up').length.should.eql(1)
      })
    })

    describe('forgot password', () => {
      it('the forgot password form', () => {
        initialStore.dispatch(actions.updateAuthFormState('forgotPassword'))
        const wrapper = shallow(<CreateAccount store={initialStore} />)
        const rendered = wrapper.render()
        rendered.find('.log-in').length.should.eql(0)
        rendered.find('.forgot-password').length.should.eql(1)
        rendered.find('.sign-up').length.should.eql(0)
      })
    })

    describe('sign up', () => {
      it('the signup form', () => {
        initialStore.dispatch(actions.updateAuthFormState('signUp'))
        const wrapper = shallow(<CreateAccount store={initialStore} />)
        const rendered = wrapper.render()
        rendered.find('.log-in').length.should.eql(0)
        rendered.find('.forgot-password').length.should.eql(0)
        rendered.find('.sign-up').length.should.eql(1)
      })
    })
  })

  describe('UploadedImage', () => {
    it('correctly displays the processing state when there are no processing images', () => {
      initialStore.dispatch(actions.updateSkipPhotoSubmission(true))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh',
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-uploaded-image__progress-wrapper')
        .length.should.eql(0)
    })

    it('correctly displays the processing state when the image is processing', () => {
      initialStore.dispatch(actions.updateSkipPhotoSubmission(true))
      initialStore.dispatch(actions.startProcessingImage('astronaut.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh',
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-uploaded-image__progress-wrapper')
        .length.should.eql(1)
    })

    it('correctly displays the processing state when a different image is processing', () => {
      initialStore.dispatch(actions.updateSkipPhotoSubmission(true))
      initialStore.dispatch(actions.startProcessingImage('another-image.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh',
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-uploaded-image__progress-wrapper')
        .length.should.eql(0)
    })

    it('correctly displays the error state when the image is errored', () => {
      initialStore.dispatch(actions.errorOnImage('astronaut.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh',
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-uploaded-image__progress-wrapper')
        .length.should.eql(0)
      rendered
        .find('.consignments-submission-uploaded-image__error')
        .length.should.eql(1)
    })

    it('correctly displays the error state when the image is errored and processing', () => {
      initialStore.dispatch(actions.startProcessingImage('astronaut.jpg'))
      initialStore.dispatch(actions.errorOnImage('astronaut.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh',
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-uploaded-image__progress-wrapper')
        .length.should.eql(0)
      rendered
        .find('.consignments-submission-uploaded-image__error')
        .length.should.eql(1)
    })

    it('correctly displays the error state when a different image is errored', () => {
      initialStore.dispatch(actions.errorOnImage('another-image.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh',
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-uploaded-image__progress-wrapper')
        .length.should.eql(0)
      rendered
        .find('.consignments-submission-uploaded-image__error')
        .length.should.eql(0)
    })
  })

  describe('UploadPhoto', () => {
    it('disables the submit button when there are no photos and the skip checkbox is not clicked', () => {
      const wrapper = shallow(<UploadPhoto store={initialStore} />)
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-upload-photo__submit-button[disabled]')
        .length.should.eql(1)
    })

    it('enables the button when the skip upload button is checked', () => {
      initialStore.dispatch(actions.updateSkipPhotoSubmission(true))
      const wrapper = shallow(<UploadPhoto store={initialStore} />)
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-upload-photo__submit-button[disabled]')
        .length.should.eql(0)
    })

    describe('with photos', () => {
      let resetRewire

      beforeEach(() => {
        resetRewire = uploadPhotoRewire.__set__('UploadedImage', () => (
          <div className="uploaded-image" />
        ))
      })

      afterEach(() => {
        resetRewire()
      })

      it('enables the button when there is an uploaded photo and there are no processing images', () => {
        initialStore.dispatch(
          actions.addImageToUploadedImages(
            'astronaut.jpg',
            'blahblabhalbhablah'
          )
        )
        const wrapper = shallow(<UploadPhoto store={initialStore} />)
        const rendered = wrapper.render()
        rendered
          .find(
            '.consignments-submission-upload-photo__submit-button[disabled]'
          )
          .length.should.eql(0)
        rendered.find('.uploaded-image').length.should.eql(1)
      })

      it('disables the button when there is an uploaded photo and there are some processing images', () => {
        initialStore.dispatch(
          actions.addImageToUploadedImages(
            'astronaut.jpg',
            'blahblabhalbhablah'
          )
        )
        initialStore.dispatch(actions.startProcessingImage('astronaut.jpg'))
        const wrapper = shallow(<UploadPhoto store={initialStore} />)
        const rendered = wrapper.render()
        rendered
          .find(
            '.consignments-submission-upload-photo__submit-button[disabled]'
          )
          .length.should.eql(1)
      })
    })
  })

  describe('ChooseArtist', () => {
    it('disables the button when there is no input', () => {
      const wrapper = shallow(<ChooseArtist store={initialStore} />)
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-choose-artist__next-button[disabled]')
        .length.should.eql(1)
    })

    it('enables the button when there is an input', () => {
      initialStore.dispatch(actions.updateArtistAutocompleteValue('andy'))
      const wrapper = shallow(<ChooseArtist store={initialStore} />)
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-choose-artist__next-button[disabled]')
        .length.should.eql(0)
    })

    it('shows and hides warning message', () => {
      initialStore.dispatch(actions.showNotConsigningMessage())
      const wrapper = shallow(<ChooseArtist store={initialStore} />)
      const rendered = wrapper.render()
      rendered
        .find('.consignments-submission-choose-artist__not-consigning')
        .length.should.eql(1)

      initialStore.dispatch(actions.hideNotConsigningMessage())
      const newWrapper = shallow(<ChooseArtist store={initialStore} />)
      const newRendered = newWrapper.render()
      newRendered
        .find('.consignments-submission-choose-artist__not-consigning')
        .length.should.eql(0)
    })
  })

  describe('SubmissionFlow', () => {
    let rewires = []

    beforeEach(() => {
      const componentMap = {
        chooseArtist: {
          component: () => <div className="choose-artist" />,
        },
        createAccount: {
          component: () => <div className="create-account" />,
        },
        describeWork: {
          component: () => <div className="describe-work-container" />,
        },
        uploadPhotos: {
          component: () => <div className="upload-photos" />,
        },
      }

      rewires.push(
        submissionFlowRewire.__set__('stepsConfig', componentMap),
        submissionFlowRewire.__set__('StepMarker', () => (
          <div className="step-marker" />
        ))
      )
    })

    afterEach(() => {
      rewires.forEach(reset => reset())
    })

    describe('non-logged-in user, stepping through', () => {
      it('shows the create account step first', () => {
        const wrapper = shallow(<SubmissionFlow store={initialStore} />)
        const rendered = wrapper.render()
        rendered.find('.create-account').length.should.eql(1)
      })
      it('shows the choose artist step', () => {
        initialStore.dispatch(actions.updateCurrentStep('chooseArtist'))
        const wrapper = shallow(<SubmissionFlow store={initialStore} />)
        const rendered = wrapper.render()
        rendered.find('.choose-artist').length.should.eql(1)
      })

      it('shows the describe work step third', () => {
        initialStore.dispatch(actions.updateCurrentStep('describeWork'))
        const wrapper = shallow(<SubmissionFlow store={initialStore} />)
        const rendered = wrapper.render()
        rendered.find('.describe-work-container').length.should.eql(1)
      })

      it('shows the upload photo step last', () => {
        initialStore.dispatch(actions.updateCurrentStep('uploadPhotos'))
        const wrapper = shallow(<SubmissionFlow store={initialStore} />)
        const rendered = wrapper.render()
        rendered.find('.upload-photos').length.should.eql(1)
      })
    })
  })
})
