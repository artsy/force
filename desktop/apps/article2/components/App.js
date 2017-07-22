import components from '@artsy/reaction-force/dist/components/publishing/index'
import PropTypes from 'prop-types'
import * as React from 'react'
import Sections from 'desktop/apps/article2/components/Sections'
import styled from 'styled-components'
import FeatureLayout from 'desktop/apps/article2/components/layouts/FeatureLayout'
import StandardLayout from 'desktop/apps/article2/components/layouts/StandardLayout'

const { Header } = components

const HeaderContainer = styled.div`
  margin: 20px;
`

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object
  }

  renderHeader (article) {
    return (
      <HeaderContainer>
        <Header article={article} />
      </HeaderContainer>
    )
  }

  renderLayout () {
    const article = this.props.article
    if (article.layout === 'feature') {
      return (
        <FeatureLayout>
          <Sections article={article} />
        </FeatureLayout>
      )
    } else {
      return (
        <StandardLayout>
          <Sections article={article} />
        </StandardLayout>
      )
    }
  }

  render () {
    return (
      <div>
        {/* {this.renderHeader()} */}
        {this.renderLayout()}
      </div>
    )
  }
}
