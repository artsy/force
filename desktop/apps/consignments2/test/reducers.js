import reducers from '../client/reducers'
import * as actions from '../client/actions'

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

      describe('#updateInputs', () => {
        it('merges the initial input data with user-inputted data', () => {
          initialResponse.submissionFlow.inputs.authenticity_certificate.should.eql('yes')
          initialResponse.submissionFlow.inputs.medium.should.eql('painting')
          initialResponse.submissionFlow.inputs.signature.should.eql('yes')
          initialResponse.submissionFlow.inputs.title.should.eql('')
          const newInputs = {
            authenticity_certificate: 'no',
            title: 'My Artwork!',
            medium: 'sculpture'
          }
          const newInputsStep = reducers(initialResponse, actions.updateInputs(newInputs))
          newInputsStep.submissionFlow.inputs.authenticity_certificate.should.eql('no')
          newInputsStep.submissionFlow.inputs.medium.should.eql('sculpture')
          newInputsStep.submissionFlow.inputs.signature.should.eql('yes')
          newInputsStep.submissionFlow.inputs.title.should.eql('My Artwork!')
        })
      })
    })
  })
})
