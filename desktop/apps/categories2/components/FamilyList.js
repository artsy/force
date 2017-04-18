import React from 'react'
import { scrollTo } from '../lib/helpers.js'

FamilyList.propTypes = {
  data: React.PropTypes.array
}

function FamilyList ({className, data}) {

  /**
    Smoothly scroll element to the given target (element.scrollTop)
    for the given duration
  */

  function scrollToFamily(e) {
    e.preventDefault();
    var hrefString = e.target.href;
    var scrollToElementId = hrefString.substring(hrefString.lastIndexOf('#')+1);
    var scrollToElement = document.getElementById(scrollToElementId);
    var bodyRect = document.body.getBoundingClientRect(),
        elemRect = scrollToElement.getBoundingClientRect(),
        offset   = elemRect.top - bodyRect.top;
    scrollTo(document.body, offset, 200);
  }

  return (
    <ul className={className}>
      {
          data.map((value) => {
            return (
              <li key={value.id}>
                <a href={`#${value.id}`} onClick={scrollToFamily}>{value.name}</a>
              </li>
            )
          })
        }
    </ul>
  )
}

export default FamilyList
