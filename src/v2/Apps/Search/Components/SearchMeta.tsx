import React, { Component } from "react"
import { Link, Meta, Title } from "react-head"
import { data as sd } from "sharify"

interface Props {
  term: string
}

export class SearchMeta extends Component<Props> {
  render() {
    const { term } = this.props

    const title = `Search Results for '${term}' | Artsy`
    const href = `/search?term=${term}`
    return (
      <>
        <Title>{title}</Title>
        <Link rel="canonical" href={`${sd.APP_URL}${href}`} />
        <Meta property="og:title" content={title} />
        <Meta property="og:url" content={`${sd.APP_URL}${href}`} />
      </>
    )
  }
}
