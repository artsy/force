import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux'
import BasicCheckbox from '../basic_checkbox/index'
import { map, contains } from 'underscore'

export default function MediumFilter({ aggregatedMediums, filterParams, onClick }) {
  const mediumIds = filterParams.gene_ids
  const allMediums = { id: 'mediums-all', name: 'All' }
  const allMediumsSelected = mediumIds.length == 0
  return (
    <div className={'auction2-medium-checkboxes'}>
      <div className={'auction2-medium-checkboxes__title'}>Medium</div>
      <BasicCheckbox key={allMediums.id} item={allMediums} onClick={onClick} checked={allMediumsSelected} />
      {
        aggregatedMediums.map((agg) => {
          const mediumSelected = contains(mediumIds, agg.id)
          return <BasicCheckbox key={agg.id} item={agg} onClick={onClick} checked={mediumSelected} />
        })
      }
    </div>
  )
}
