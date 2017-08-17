import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  image: PropTypes.object
}

const FeaturedGene = ({ title, href, image: { url: imageSrc } }) => {
  return (
    <div>
      <a href={href}>
        {title}
      </a>
      <img src={imageSrc} />
    </div>
  )
}

FeaturedGene.propTypes = propTypes

export default FeaturedGene
