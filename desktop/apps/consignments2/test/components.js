import * as actions from '../client/actions'
import StepMarker from '../components/step_marker'
import SubmissionFlow from '../components/submission_flow'
import React from 'react'
import reducers from '../client/reducers'
import { Provider } from 'react-redux'
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
          <Provider><StepMarker store={initialStore} /></Provider>
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-step-marker__dot').length.should.eql(4)
      })

      it('updates the color of step labels', () => {
        const wrapper = shallow(
          <Provider><StepMarker store={initialStore} /></Provider>
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-step-marker__step.active').length.should.eql(1)
        const activeText = rendered.text()
        activeText.should.containEql('Create Account')
      })
    })
  })

  describe('SubmissionFlow', () => {
    let steps
    let seededStore

    beforeEach(() => {
      SubmissionFlow.__Rewire__('StepMarker', () => <div className='step-marker' />)
      steps = [
        {
          component: () => <div className='create-account' />,
          label: 'Create Account',
          title: 'Create an Account'
        },
        {
          component: () => <div className='choose-artist' />,
          label: 'Verify Artist/Designer',
          title: 'Enter the name of the artist/designer who created the work'
        },
        {
          component: () => <div className='describe-work' />,
          label: 'Describe the Work',
          title: 'Enter details about the work'
        },
        {
          component: () => <div className='upload-photos' />,
          label: 'Upload Photo',
          title: 'Upload photos'
        }
      ]
      seededStore = createStore(reducers, { submissionFlow: { steps, currentStep: 0 } })
    })

    afterEach(() => {
      SubmissionFlow.__ResetDependency__('StepMarker')
    })

    describe('non-logged-in user', () => {
      it('shows the create account step first', () => {
        const wrapper = shallow(
          <Provider><SubmissionFlow store={seededStore} steps={steps} /></Provider>
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-submission__step-title').length.should.eql(1)
        const renderedText = rendered.text()
        renderedText.should.containEql('Create an Account')
        rendered.find('.create-account').length.should.eql(1)
      })
      it('shows the choose artist step second', () => {
        seededStore.dispatch(actions.incrementStep())
        const wrapper = shallow(
          <Provider><SubmissionFlow store={seededStore} /></Provider>
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-submission__step-title').length.should.eql(1)
        const renderedText = rendered.text()
        renderedText.should.containEql('Enter the name of the artist/designer who created the work')
        rendered.find('.choose-artist').length.should.eql(1)
      })

      it('shows the describe work step third', () => {
        seededStore.dispatch(actions.incrementStep())
        seededStore.dispatch(actions.incrementStep())
        const wrapper = shallow(
          <Provider><SubmissionFlow store={seededStore} /></Provider>
        )
        const rendered = wrapper.render()
        rendered.find('.consignments2-submission__step-title').length.should.eql(1)
        const renderedText = rendered.text()
        renderedText.should.containEql('Enter details about the work')
        rendered.find('.describe-work').length.should.eql(1)
      })

      it('shows the upload photo step last', () => {
        seededStore.dispatch(actions.incrementStep())
        seededStore.dispatch(actions.incrementStep())
        seededStore.dispatch(actions.incrementStep())
        const wrapper = shallow(
          <Provider><SubmissionFlow store={seededStore} /></Provider>
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
