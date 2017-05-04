import CheckboxInput from '../checkbox_input'
import PropTypes from 'prop-types'
import React from 'react'
import RadioInput from '../radio_input'
import SelectInput from '../select_input'
import TextInput from '../text_input'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { incrementStep } from '../../client/actions'

function DescribeWork (props) {
  const {
    authenticity_certificate,
    depth,
    dimensions_metric,
    edition,
    height,
    incrementStepAction,
    location,
    medium,
    nextDisabled,
    provenance,
    signature,
    title,
    width,
    year
  } = props

  const b = block('consignments2-submission-describe-work')

  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput
            item={'title'}
            instructions={'If the title is unknown, please enter your best guess.'}
            label={'Title'}
            value={title}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <SelectInput
            item={'medium'}
            label={'Medium'}
            options={['painting', 'sculpture', 'print']}
            value={medium}
          />
        </div>
        <div className={b('row-item')}>
          <TextInput item={'year'} label={'Year'} value={year} />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput item={'height'} label={'Height'} value={height} />
        </div>
        <div className={b('row-item')}>
          <TextInput item={'width'} label={'Width'} value={width} />
        </div>
        <div className={b('row-item')}>
          <TextInput item={'depth'} label={'Depth'} value={depth} />
        </div>
        <div className={b('row-item')}>
          <SelectInput
            item={'dimension_metric'}
            label={'Units'}
            options={['in', 'cm']}
            value={dimensions_metric}
          />
        </div>
      </div>
      <div className={b('row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <CheckboxInput
            item={'edition'}
            label={'This is an edition'}
            value={edition}
          />
        </div>
      </div>
      <div className={b('small-row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <RadioInput
            item={'signature'}
            label={'Is this work signed?'}
            options={['yes', 'no']}
            value={signature}
          />
        </div>
      </div>
      <div className={b('small-row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <RadioInput
            item={'authenticity_certificate'}
            label={'Does this work come with a certificate of authenticity?'}
            options={['yes', 'no']}
            value={authenticity_certificate}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput
            item={'provenance'}
            label={'Provenance'}
            instructions={'Where did you acquire this work?'}
            value={provenance}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput
            item={'location'}
            instructions={'What city is the work located in?'}
            value={location}
          />
        </div>
      </div>
      <div
        className={b('next-button').mix('avant-garde-button-black')}
        disabled={nextDisabled}
        onClick={incrementStepAction}
      >
        Next
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    submissionFlow: {
      currentStep,
      inputs,
      steps
    }
  } = state

  const { nextDisabled } = steps[currentStep]
  const {
    authenticity_certificate,
    depth,
    dimensions_metric,
    edition,
    height,
    location,
    medium,
    provenance,
    signature,
    title,
    width,
    year
  } = inputs

  return {
    authenticity_certificate,
    depth,
    dimensions_metric,
    edition,
    height,
    location,
    medium,
    nextDisabled,
    provenance,
    signature,
    title,
    width,
    year
  }
}

const mapDispatchToProps = {
  incrementStepAction: incrementStep
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DescribeWork)

DescribeWork.propTypes = {
  authenticity_certificate: PropTypes.bool.isRequired,
  depth: PropTypes.number,
  dimensions_metric: PropTypes.string,
  edition: PropTypes.bool.isRequired,
  height: PropTypes.number,
  incrementStepAction: PropTypes.func.isRequired,
  location: PropTypes.string,
  medium: PropTypes.string,
  nextDisabled: PropTypes.bool.isRequired,
  provenance: PropTypes.string,
  signature: PropTypes.bool.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  year: PropTypes.string
}
