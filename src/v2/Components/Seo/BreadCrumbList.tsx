import React, { Component } from "react"
import { Meta } from "react-head"
import { data as sd } from "sharify"

const { APP_URL } = sd

interface Item {
  path: string
  name: string
}

interface BreadCrumbListProps {
  items: Item[]
}

export class BreadCrumbList extends Component<BreadCrumbListProps> {
  render() {
    return (
      <Meta
        tag="script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": APP_URL,
                  name: "Artsy",
                },
              },
              ...this.props.items.map(({ path, name }, index) => ({
                "@type": "ListItem",
                position: index + 2, // adding 2 because `position` starts with 1 and there's a top-level item.
                item: {
                  "@id": `${APP_URL}${path}`,
                  name,
                },
              })),
            ],
          }),
        }}
      />
    )
  }
}
