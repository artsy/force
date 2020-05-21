import { TooltipsDataLoaderQueryResponse } from "v2/__generated__/TooltipsDataLoaderQuery.graphql"
import { TooltipsDataLoaderQuery } from "v2/__generated__/TooltipsDataLoaderQuery.graphql"
import * as Artsy from "v2/Artsy"
import { getArtsySlugsFromArticle } from "v2/Components/Publishing/Constants"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { keyBy } from "lodash"
import PropTypes from "prop-types"
import React, { Component } from "react"
// TODO: Using `SystemQueryRenderer` causes SSR to fail on article pages.
/* tslint:disable-next-line:no-query-renderer-import */
import { graphql, QueryRenderer } from "react-relay"
import { ArticleProps } from "../Article"

interface Props extends Artsy.SystemContextProps {
  article: ArticleData
  shouldFetchData?: boolean
  onOpenAuthModal?: ArticleProps["onOpenAuthModal"]
}

export class TooltipsDataLoader extends Component<Props> {
  static defaultProps = {
    shouldFetchData: true,
  }

  render() {
    const {
      article,
      children,
      user,
      relayEnvironment,
      shouldFetchData,
      onOpenAuthModal,
    } = this.props

    const { artists: artistSlugs, genes: geneSlugs } = getArtsySlugsFromArticle(
      article
    )
    if (!shouldFetchData) {
      return children
    }

    return (
      <QueryRenderer<TooltipsDataLoaderQuery>
        environment={relayEnvironment}
        query={graphql`
          query TooltipsDataLoaderQuery(
            $artistSlugs: [String!]
            $geneSlugs: [String!]
          ) {
            artists(slugs: $artistSlugs) {
              slug
              internalID
              ...ArtistToolTip_artist
              ...MarketDataSummary_artist
              ...FollowArtistButton_artist
            }
            genes(slugs: $geneSlugs) {
              slug
              internalID
              ...GeneToolTip_gene
              ...FollowGeneButton_gene
            }
          }
        `}
        variables={{
          artistSlugs,
          geneSlugs,
        }}
        render={readyState => {
          const data: TooltipsDataLoaderQueryResponse = {
            artists: [],
            genes: [],
          }
          Object.keys(readyState.props || {}).forEach(key => {
            const col = readyState.props[key]
            data[key] = keyBy(col, "slug")
          })
          return (
            <TooltipsContextProvider
              {...data}
              user={user}
              onOpenAuthModal={onOpenAuthModal}
            >
              {children}
            </TooltipsContextProvider>
          )
        }}
      />
    )
  }
}

class TooltipsContextProvider extends Component<any> {
  static childContextTypes = {
    activeToolTip: PropTypes.any,
    user: PropTypes.object,
    onOpenAuthModal: PropTypes.func,
    onTriggerToolTip: PropTypes.func,
    tooltipsData: PropTypes.object,
    waitForFade: PropTypes.string,
  }

  state = {
    activeToolTip: null,
    waitForFade: null,
  }

  onTriggerToolTip = activeToolTip => {
    if (activeToolTip !== this.state.activeToolTip) {
      if (activeToolTip === null) {
        setTimeout(() => {
          this.setState({ waitForFade: null })
        }, 250)
      }
      this.setState({ activeToolTip, waitForFade: this.state.activeToolTip })
    }
  }

  getChildContext() {
    const { artists, user, genes, onOpenAuthModal } = this.props
    const { activeToolTip, waitForFade } = this.state

    return {
      activeToolTip,
      user,
      onOpenAuthModal,
      onTriggerToolTip: this.onTriggerToolTip,
      tooltipsData: {
        artists,
        genes,
      },
      waitForFade,
    }
  }

  render() {
    return this.props.children
  }
}

export const TooltipsData = Artsy.withSystemContext(TooltipsDataLoader)
