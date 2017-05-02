import CheckboxInput from '../checkbox_input'
import PropTypes from 'prop-types'
import React from 'react'
import RadioInput from '../radio_input'
import SelectInput from '../select_input'
import TextInput from '../text_input'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { incrementStep } from '../../client/actions'

function DescribeWork ({ incrementStepAction }) {
  const b = block('consignments2-submission-describe-work')

  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput
            item={'title'}
            label={'Title'}
            instructions={'If the title is unknown, please enter your best guess.'}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <SelectInput item={'medium'} label={'Medium'} options={['painting', 'sculpture', 'print']} />
        </div>
        <div className={b('row-item')}>
          <TextInput item={'year'} label={'Year'} />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput item={'height'} label={'Height'} />
        </div>
        <div className={b('row-item')}>
          <TextInput item={'width'} label={'Width'} />
        </div>
        <div className={b('row-item')}>
          <TextInput item={'depth'} label={'Depth'} />
        </div>
        <div className={b('row-item')}>
          <SelectInput item={'units'} label={'Units'} options={['in', 'cm']} />
        </div>
      </div>
      <div className={b('row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <CheckboxInput
            item={'edition'}
            label={'This is an edition'}
          />
        </div>
      </div>
      <div className={b('small-row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <RadioInput
            item={'signed'}
            label={'Is this work signed?'}
            options={['yes', 'no']}
          />
        </div>
      </div>
      <div className={b('small-row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <RadioInput
            item={'authenticity'}
            label={'Does this work come with a certificate of authenticity?'}
            options={['yes', 'no']}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput
            item={'provenance'}
            label={'Provenance'}
            instructions={'Where did you acquire this work?'}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <TextInput
            item={'location'}
            instructions={'What city is the work located in?'}
          />
        </div>
      </div>
      <div
        className={b('next-button').mix('avant-garde-button-black')}
        onClick={incrementStepAction}
      >
        Next
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  incrementStepAction: incrementStep
}

export default connect(
  null,
  mapDispatchToProps
)(DescribeWork)

DescribeWork.propTypes = {
  incrementStepAction: PropTypes.func.isRequired
}
