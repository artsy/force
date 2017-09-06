import PropTypes from 'prop-types'
import * as React from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import styled from 'styled-components'
import StandardArticle from './StandardArticle'
const { Article } = components

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    relatedArticles: PropTypes.array
  }

  render () {
    if (this.props.article.layout === 'standard') {
      return <StandardArticle article={this.props.article} relatedArticles={this.props.relatedArticles} />
    } else {
      return (
        <AppContainer id='article-root'>
          <Article article={this.props.article} />
        </AppContainer>
      )
    }
  }
}

const AppContainer = styled.div`
  margin-top: 100px;
`
