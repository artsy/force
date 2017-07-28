import components from '@artsy/reaction-force/dist/components/publishing/index'
import * as React from 'react'
import Sections from 'desktop/apps/article2/components/article/Sections'
import Sidebar from 'desktop/apps/article2/components/article/Sidebar'
import FeatureLayout from 'desktop/apps/article2/components/article/FeatureLayout'
import StandardLayout from 'desktop/apps/article2/components/article/StandardLayout'
import PropTypes from 'prop-types'

const { Header } = components

Article.propTypes = {
  article: PropTypes.object.isRequired
}

export default function Article (props) {
  const { article } = props
  if (article.layout === 'feature') {
    return (
      <div>
        <Header article={this.props.article} />
        <FeatureLayout>
          <Sections article={article} />
        </FeatureLayout>
      </div>
    )
  } else {
    return (
      <StandardLayout>
        <Sections article={article} />
        <Sidebar article={article} />
      </StandardLayout>
    )
  }
}
