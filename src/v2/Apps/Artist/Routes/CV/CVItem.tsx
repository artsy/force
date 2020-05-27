import { Col, Row } from "@artsy/palette"
import { CVItem_artist } from "v2/__generated__/CVItem_artist.graphql"
import { groupBy } from "lodash"
import React, { Component } from "react"
import styled from "styled-components"
import { Responsive } from "v2/Utils/Responsive"

import {
  Box,
  Button,
  Flex,
  Sans,
  Separator,
  Serif,
  Spacer,
  space,
} from "@artsy/palette"

import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { ShowEntry } from "./ShowEntry"

export const PAGE_SIZE = 10

const ShowMoreButton = props => (
  <Button variant="secondaryOutline" size="medium" {...props}>
    Show more
  </Button>
)

export interface CVItemProps {
  relay: RelayPaginationProp
  artist: CVItem_artist
  category: string
}

interface CVItemState {
  isLoading: boolean
}

export class CVItem extends Component<CVItemProps, CVItemState> {
  state = {
    isLoading: false,
  }

  loadMore() {
    const hasMore = this.props.artist.showsConnection.pageInfo.hasNextPage

    if (hasMore) {
      this.setState({
        isLoading: true,
      })

      this.props.relay.loadMore(PAGE_SIZE, error => {
        if (error) {
          console.error(error)
        }

        this.setState({
          isLoading: false,
        })
      })
    }
  }

  get hasMore() {
    const hasMore = this.props.artist.showsConnection.pageInfo.hasNextPage
    return hasMore
  }

  renderEntries = (entries, size = undefined) =>
    entries.map(({ node }, key) => (
      <ShowEntry node={node} key={key} size={size} />
    ))

  render() {
    if (
      !this.props.artist.showsConnection ||
      !this.props.artist.showsConnection.edges.length
    ) {
      return null
    }

    const groupedByYear = groupBy(
      this.props.artist.showsConnection.edges,
      ({ node: show }) => {
        return show.start_at
      }
    )

    return (
      <Responsive>
        {({ xs, sm, md }) => {
          // Element spacing - correction for lineheight
          const sectionSpace = space(4) - 4

          return (
            <CVItems className="cvItems">
              {(xs || sm || md) && (
                <Row>
                  <Col>
                    <Category size={xs ? "2" : "3"} weight="medium">
                      {this.props.category}
                    </Category>
                    <Spacer mb={xs ? 0.5 : 1} />
                  </Col>
                </Row>
              )}
              {Object.keys(groupedByYear)
                .sort()
                .reverse()
                .map((year, index) => {
                  const isFirst = index === 0
                  const yearGroup = groupedByYear[year]
                  return xs ? (
                    <Flex key={index}>
                      <Year size="2" mr={1}>
                        {year}
                      </Year>
                      <Box>{this.renderEntries(yearGroup, "2")}</Box>
                    </Flex>
                  ) : (
                    <Row key={index}>
                      {!sm && !md && (
                        <Col xl={2} lg={2}>
                          {isFirst && (
                            <Category size="3" weight="medium">
                              {this.props.category}
                            </Category>
                          )}
                        </Col>
                      )}
                      <Col lg={1} md={2} sm={2}>
                        <Year mr={2} size="3">
                          {year}
                        </Year>
                      </Col>
                      <Col md={8} lg={9} xl={9} sm={10}>
                        {this.renderEntries(yearGroup)}
                      </Col>
                    </Row>
                  )
                })}

              {this.hasMore && (
                <Row>
                  <Col xs={0} sm={0} md={0} lg={2} xl={2} />
                  <Col lgOffset={2} xlOffset={2} lg={10} xl={10}>
                    <ShowMoreButton
                      onClick={() => this.loadMore()}
                      loading={this.state.isLoading ? true : false}
                      width={xs ? "100%" : ""}
                      mt={xs ? 1 : 2}
                    />

                    {xs && <Spacer mb={1} />}
                  </Col>
                </Row>
              )}

              <div className="cvSeparator">
                {xs ? <Spacer mt={1} /> : <Separator my={sectionSpace} />}
              </div>
            </CVItems>
          )
        }}
      </Responsive>
    )
  }
}

export const CVPaginationContainer = createPaginationContainer(
  CVItem,
  {
    artist: graphql`
      fragment CVItem_artist on Artist
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          sort: { type: "ShowSorts", defaultValue: START_AT_DESC }
          atAFair: { type: "Boolean", defaultValue: false }
          soloShow: { type: "Boolean", defaultValue: false }
          isReference: { type: "Boolean", defaultValue: true }
          visibleToPublic: { type: "Boolean", defaultValue: false }
        ) {
        slug
        showsConnection(
          first: $count
          after: $cursor
          sort: $sort
          atAFair: $atAFair
          soloShow: $soloShow
          isReference: $isReference
          visibleToPublic: $visibleToPublic
        ) @connection(key: "Artist_showsConnection") {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              partner {
                ... on ExternalPartner {
                  name
                }
                ... on Partner {
                  name
                  href
                }
              }
              name
              start_at: startAt(format: "YYYY")
              city
              href
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.artist.showsConnection
    },
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, count: totalCount }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
        artistID: props.artist.slug,
      }
    },
    query: graphql`
      query CVItemQuery(
        $count: Int
        $cursor: String
        $artistID: String!
        $sort: ShowSorts
        $atAFair: Boolean
        $soloShow: Boolean
        $isReference: Boolean
        $visibleToPublic: Boolean
      ) {
        artist(id: $artistID) {
          ...CVItem_artist
            @arguments(
              sort: $sort
              count: $count
              cursor: $cursor
              atAFair: $atAFair
              soloShow: $soloShow
              isReference: $isReference
              visibleToPublic: $visibleToPublic
            )
        }
      }
    `,
  }
)

const CVItems = styled(Box)``
const Year = Serif
const Category = Sans

Year.displayName = "Year"
Category.displayName = "Category"
