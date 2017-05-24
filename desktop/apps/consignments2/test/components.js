import * as actions from '../client/actions'
import ChooseArtist from '../components/choose_artist'
import StepMarker from '../components/step_marker'
import SubmissionFlow from '../components/submission_flow'
import UploadPhoto from '../components/upload_photo'
import UploadedImage from '../components/uploaded_image'
import React from 'react'
import reducers from '../client/reducers'
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
      SubmissionFlow.__Rewire__('DescribeWork', () => <div className='describe-work' />)
      SubmissionFlow.__Rewire__('StepMarker', () => <div className='step-marker' />)
      SubmissionFlow.__Rewire__('UploadPhoto', () => <div className='upload-photos' />)
    })

    afterEach(() => {
      SubmissionFlow.__ResetDependency__('ChooseArtist')
      SubmissionFlow.__ResetDependency__('CreateAccount')
      SubmissionFlow.__ResetDependency__('DescribeWork')
      SubmissionFlow.__ResetDependency__('StepMarker')
      SubmissionFlow.__ResetDependency__('UploadPhoto')
    })

    describe('non-logged-in user, stepping through', () => {
      it('shows the create account step first', () => {
        const wrapper = shallow(
          <SubmissionFlow store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-submission__step-title').length.should.eql(1)
        const renderedText = rendered.text()
        renderedText.should.containEql('Create an Account')
        rendered.find('.create-account').length.should.eql(1)
      })
      it('shows the choose artist step second', () => {
        initialStore.dispatch(actions.incrementStep())
        const wrapper = shallow(
          <SubmissionFlow store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-submission__step-title').length.should.eql(1)
        const renderedText = rendered.text()
        renderedText.should.containEql('Enter the name of the artist/designer who created the work')
        rendered.find('.choose-artist').length.should.eql(1)
      })

      it('shows the describe work step third', () => {
        initialStore.dispatch(actions.incrementStep())
        initialStore.dispatch(actions.incrementStep())
        const wrapper = shallow(
          <SubmissionFlow store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-submission__step-title').length.should.eql(1)
        const renderedText = rendered.text()
        renderedText.should.containEql('Enter details about the work')
        rendered.find('.describe-work').length.should.eql(1)
      })

      it('shows the upload photo step last', () => {
        initialStore.dispatch(actions.incrementStep())
        initialStore.dispatch(actions.incrementStep())
        initialStore.dispatch(actions.incrementStep())
        const wrapper = shallow(
          <SubmissionFlow store={initialStore} />
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-submission__step-title').length.should.eql(1)
        const renderedText = rendered.text()
        renderedText.should.containEql('Upload photos')
        rendered.find('.upload-photos').length.should.eql(1)
      })
    })
  })
})
