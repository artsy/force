import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import buildTemplateComponent from 'desktop/components/react/utils/build_template_component'
import { first } from 'underscore'

export default function Footer (props) {
  const { articles, auction, footerItems } = props
  const footerItem = first(footerItems)
  const showArticles = Boolean(articles.length)
  const showFooterItems = footerItem && !auction.isAuctionPromo()
  const b = block('auction-footer')

  return (
    <footer
      className={b('')
        .mix('auction-page-section')
        .mix(articles.length ? 'has-articles' : 'has-no-articles')}
    >
      { showArticles &&
        <div className={b('auction-articles')}>
          { articles.models.map((article, key) => {
            const ArticleFigure = buildTemplateComponent('desktop/components/article_figure/template.jade', { locals: { article } })

            return (
              <div key={key}>
                <ArticleFigure />
              </div>
            )
          })}
        </div>
      }

      { showFooterItems &&
        <div className={b('auction-app-promo-wrapper')}>
          <a className={b('auction-app-promo')}>
            <div className={b('auction-app-promo-image')}>
              <img
                src={footerItem.src}
                alt={footerItem.alt}
              />
            </div>
            <div className={b('auction-app-promo-metadata')}>
              <div className={b('auction-app-promo-title')}>
                {footerItem.title}
              </div>
              <div className={b('auction-app-promo-subtitle')}>
                {footerItem.subtitle}
              </div>
            </div>
          </a>
        </div> }
    </footer>
  )
}

Footer.propTypes = {
  articles: PropTypes.object,
  auction: PropTypes.object,
  footerItems: PropTypes.array
}

Footer.defaultProps = {
  articles: {},
  footerItems: []
}
