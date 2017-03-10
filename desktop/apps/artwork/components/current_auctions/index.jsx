import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

export default function mount(data) {
  function CurrentAuctions ({ sales }) {
    const classes = classNames(
      'artwork-section',
      'current-auctions'
    )

    return (
      <section className={classes}>
        {sales.map((sale, index) => {
          const {
            cover_image: {
              cropped: {
                url
              }
            },
            href,
            name
          } = sale

          return (
            <div key={index}>
              <a href={href}>
                <img src={url} />
                {name}
              </a>
            </div>
          )
        })}
      </section>
    )
  }

  CurrentAuctions.propTypes = {
    sales: PropTypes.array.isRequired
  }

  if (data.sales.length) {
    ReactDOM.render(
      <CurrentAuctions sales={data.sales} />,
      document.getElementById('react-mount-current-auctions')
    )
  }
}
