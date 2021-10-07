import PropTypes from "prop-types"
import React from "react"
import block from "bem-cn-lite"
import renderTemplate from "../../utils/renderTemplate"
import { connect } from "react-redux"
import { first } from "underscore"

function Footer(props) {
  const { articles, footerItem, showArticles, showFooterItems, sd } = props

  const b = block("auction-Footer")

  if (!showArticles) {
    return null
  }

  return (
    <footer
      className={b
        .builder()({ without: false })
        .mix("auction-page-section")
        .mix(articles.length ? "has-articles" : "has-no-articles")()}
    >
      {showArticles && (
        <div className={b("auction-articles")}>
          {articles.models.map((article, key) => {
            let articleFigureHTML

            // Serverside
            if (typeof window === "undefined") {
              const path = require("path")

              articleFigureHTML = renderTemplate(
                path.resolve(
                  __dirname,
                  "../../../../components/article_figure/template.jade"
                ),
                { locals: { article, sd } }
              )

              // Client
            } else {
              articleFigureHTML = require("../../../../components/article_figure/template.jade")(
                { article, ...sd }
              )
            }

            return (
              <div
                key={key}
                dangerouslySetInnerHTML={{ __html: articleFigureHTML }}
              />
            )
          })}
        </div>
      )}
    </footer>
  )
}

Footer.propTypes = {
  articles: PropTypes.object,
  showArticles: PropTypes.bool,
  sd: PropTypes.object.isRequired,
}

Footer.defaultProps = {
  articles: {},
  footerItems: [],
}

const mapStateToProps = state => {
  const { auction, articles, sd } = state.app
  const showArticles = Boolean(articles.length)

  return {
    articles,
    showArticles,
    sd,
  }
}

export default connect(mapStateToProps)(Footer)

// Helpers

export const test = { Footer }
