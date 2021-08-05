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

const rootItem = {
  path: "",
  name: "Artsy",
}

export const computeListItems = (appUrl = APP_URL) => {
  const items = [rootItem]
  const listItems = items.map(({ name, path }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@id": `${appUrl}${path}`,
      name,
    },
  }))

  return listItems
}

export class BreadCrumbList extends Component<BreadCrumbListProps> {
  render() {
    const listItems = computeListItems()

    return (
      <Meta
        tag="script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              ...listItems,
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
