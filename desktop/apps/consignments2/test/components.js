import * as actions from '../client/actions'
import ChooseArtist from '../components/choose_artist'
import CreateAccount from '../components/create_account'
import StepMarker from '../components/step_marker'
import SubmissionFlow from '../components/submission_flow'
import UploadPhoto from '../components/upload_photo'
import UploadedImage from '../components/uploaded_image'
import React from 'react'
import reducers from '../client/reducers'
import { responsiveWindowAction } from '../../../components/react/responsive_window'
import { createStore } from 'redux'
import { shallow } from 'enzyme'

describe('React components', () => {
  let initialStore

  beforeEach(() => {
    initialStore = createStore(reducers)
  })

  describe('StepMarker', () => {
    describe('non-logged-in user', () => {
      it('displays four steps', () => {
        const wrapper = shallow(
          <StepMarker store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-step-marker__dot').length.should.eql(4)
      })

      it('updates the color of step labels', () => {
        const wrapper = shallow(
          <StepMarker store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-step-marker__step_active').length.should.eql(1)
        const activeText = rendered.text()
        activeText.should.containEql('Create Account')
      })

      it('includes the shorter labels if in mobile mode', () => {
        initialStore.dispatch(responsiveWindowAction(600))
        const wrapper = shallow(
          <StepMarker store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-step-marker__step_active').length.should.eql(1)
        const activeText = rendered.text()
        activeText.should.eql('CreateVerifyDescribeUpload')
      })
    })
  })

  describe('CreateAccount', () => {
    beforeEach(() => {
      CreateAccount.__Rewire__('ForgotPassword', () => <div className='forgot-password' />)
      CreateAccount.__Rewire__('LogIn', () => <div className='log-in' />)
      CreateAccount.__Rewire__('SignUp', () => <div className='sign-up' />)
    })

    afterEach(() => {
      CreateAccount.__ResetDependency__('ForgotPassword')
      CreateAccount.__ResetDependency__('LogInCreateAccount')
      CreateAccount.__ResetDependency__('SignUp')
    })

    describe('log in', () => {
      it('the log in form', () => {
        const wrapper = shallow(
          <CreateAccount store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.log-in').length.should.eql(1)
        rendered.find('.forgot-password').length.should.eql(0)
        rendered.find('.sign-up').length.should.eql(0)
      })
    })

    describe('forgot password', () => {
      it('the forgot password form', () => {
        initialStore.dispatch(actions.updateAuthFormState('forgotPassword'))
        const wrapper = shallow(
          <CreateAccount store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.log-in').length.should.eql(0)
        rendered.find('.forgot-password').length.should.eql(1)
        rendered.find('.sign-up').length.should.eql(0)
      })
    })

    describe('sign up', () => {
      it('the forgot password form', () => {
        initialStore.dispatch(actions.updateAuthFormState('signUp'))
        const wrapper = shallow(
          <CreateAccount store={initialStore} />
        )
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
        src: 'blahblabhalh'
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-uploaded-image__progress-wrapper').length.should.eql(0)
    })

    it('correctly displays the processing state when the image is processing', () => {
      initialStore.dispatch(actions.updateSkipPhotoSubmission(true))
      initialStore.dispatch(actions.startProcessingImage('astronaut.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh'
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-uploaded-image__progress-wrapper').length.should.eql(1)
    })

    it('correctly displays the processing state when a different image is processing', () => {
      initialStore.dispatch(actions.updateSkipPhotoSubmission(true))
      initialStore.dispatch(actions.startProcessingImage('another-image.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh'
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-uploaded-image__progress-wrapper').length.should.eql(0)
    })

    it('correctly displays the error state when the image is errored', () => {
      initialStore.dispatch(actions.errorOnImage('astronaut.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh'
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-uploaded-image__progress-wrapper').length.should.eql(0)
      rendered.find('.consignments2-submission-uploaded-image__error').length.should.eql(1)
    })

    it('correctly displays the error state when the image is errored and processing', () => {
      initialStore.dispatch(actions.startProcessingImage('astronaut.jpg'))
      initialStore.dispatch(actions.errorOnImage('astronaut.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh'
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-uploaded-image__progress-wrapper').length.should.eql(0)
      rendered.find('.consignments2-submission-uploaded-image__error').length.should.eql(1)
    })

    it('correctly displays the error state when a different image is errored', () => {
      initialStore.dispatch(actions.errorOnImage('another-image.jpg'))
      const file = {
        fileName: 'astronaut.jpg',
        src: 'blahblabhalh'
      }
      const wrapper = shallow(
        <UploadedImage store={initialStore} file={file} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-uploaded-image__progress-wrapper').length.should.eql(0)
      rendered.find('.consignments2-submission-uploaded-image__error').length.should.eql(0)
    })
  })

  describe('UploadPhoto', () => {
    it('disables the submit button when there are no photos and the skip checkbox is not clicked', () => {
      const wrapper = shallow(
        <UploadPhoto store={initialStore} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-upload-photo__submit-button[disabled]').length.should.eql(1)
    })

    it('enables the button when the skip upload button is checked', () => {
      initialStore.dispatch(actions.updateSkipPhotoSubmission(true))
      const wrapper = shallow(
        <UploadPhoto store={initialStore} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-upload-photo__submit-button[disabled]').length.should.eql(0)
    })

    describe('with photos', () => {
      beforeEach(() => {
        UploadPhoto.__Rewire__('UploadedImage', () => <div className='uploaded-image' />)
      })

      afterEach(() => {
        UploadPhoto.__ResetDependency__('UploadedImage')
      })

      it('enables the button when there is an uploaded photo and there are no processing images', () => {
        initialStore.dispatch(actions.addImageToUploadedImages('astronaut.jpg', 'blahblabhalbhablah'))
        const wrapper = shallow(
          <UploadPhoto store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-submission-upload-photo__submit-button[disabled]').length.should.eql(0)
        rendered.find('.uploaded-image').length.should.eql(1)
      })

      it('disables the button when there is an uploaded photo and there are some processing images', () => {
        initialStore.dispatch(actions.addImageToUploadedImages('astronaut.jpg', 'blahblabhalbhablah'))
        initialStore.dispatch(actions.startProcessingImage('astronaut.jpg'))
        const wrapper = shallow(
          <UploadPhoto store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-submission-upload-photo__submit-button[disabled]').length.should.eql(1)
      })
    })
  })

  describe('ChooseArtist', () => {
    it('disables the button when there is no input', () => {
      const wrapper = shallow(
        <ChooseArtist store={initialStore} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-choose-artist__next-button[disabled]').length.should.eql(1)
    })

    it('enables the button when there is an input', () => {
      initialStore.dispatch(actions.updateArtistAutocompleteValue('andy'))
      const wrapper = shallow(
        <ChooseArtist store={initialStore} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-choose-artist__next-button[disabled]').length.should.eql(0)
    })

    it('shows and hides warning message', () => {
      initialStore.dispatch(actions.showNotConsigningMessage())
      const wrapper = shallow(
        <ChooseArtist store={initialStore} />
      )
      const rendered = wrapper.render()
      rendered.find('.consignments2-submission-choose-artist__not-consigning').length.should.eql(1)

      initialStore.dispatch(actions.hideNotConsigningMessage())
      const newWrapper = shallow(
        <ChooseArtist store={initialStore} />
      )
      const newRendered = newWrapper.render()
      newRendered.find('.consignments2-submission-choose-artist__not-consigning').length.should.eql(0)
    })
  })

  describe('SubmissionFlow', () => {
    beforeEach(() => {
      SubmissionFlow.__Rewire__('ChooseArtist', () => <div className='choose-artist' />)
      SubmissionFlow.__Rewire__('CreateAccount', () => <div className='create-account' />)
      SubmissionFlow.__Rewire__('DescribeWorkDesktop', () => <div className='describe-work-desktop' />)
      SubmissionFlow.__Rewire__('DescribeWorkMobile', () => <div className='describe-work-mobile' />)
      SubmissionFlow.__Rewire__('StepMarker', () => <div className='step-marker' />)
      SubmissionFlow.__Rewire__('UploadPhoto', () => <div className='upload-photos' />)
    })

    afterEach(() => {
      SubmissionFlow.__ResetDependency__('ChooseArtist')
      SubmissionFlow.__ResetDependency__('CreateAccount')
      SubmissionFlow.__ResetDependency__('DescribeWorkDesktop')
      SubmissionFlow.__ResetDependency__('DescribeWorkMobile')
      SubmissionFlow.__ResetDependency__('StepMarker')
      SubmissionFlow.__ResetDependency__('UploadPhoto')
    })

    describe('non-logged-in user, stepping through', () => {
      it('shows the create account step first', () => {
        const wrapper = shallow(
          <SubmissionFlow store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.create-account').length.should.eql(1)
      })
      it('shows the choose artist step second', () => {
        initialStore.dispatch(actions.incrementStep())
        const wrapper = shallow(
          <SubmissionFlow store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.choose-artist').length.should.eql(1)
      })

      it('shows the describe work step third', () => {
        initialStore.dispatch(actions.incrementStep())
        initialStore.dispatch(actions.incrementStep())
        const wrapper = shallow(
          <SubmissionFlow store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.describe-work-desktop').length.should.eql(1)
        rendered.find('.describe-work-mobile').length.should.eql(0)
      })

      it('shows the describe work mobile step if the screen is small', () => {
        initialStore.dispatch(actions.incrementStep())
        initialStore.dispatch(actions.incrementStep())
        initialStore.dispatch(responsiveWindowAction(620))
        const wrapper = shallow(
          <SubmissionFlow store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.describe-work-desktop').length.should.eql(0)
        rendered.find('.describe-work-mobile').length.should.eql(1)
      })

      it('shows the upload photo step last', () => {
        initialStore.dispatch(actions.incrementStep())
        initialStore.dispatch(actions.incrementStep())
        initialStore.dispatch(actions.incrementStep())
        const wrapper = shallow(
          <SubmissionFlow store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.upload-photos').length.should.eql(1)
      })
    })
  })
})
