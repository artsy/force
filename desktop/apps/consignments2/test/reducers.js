import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { renderToString } from 'react-dom/server'
import reducers from '../client/reducers'
import * as actions from '../client/actions'
import { __RewireAPI__ as ActionsRewireApi } from '../client/actions'
import sinon from 'sinon'

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
    })
  })
})
