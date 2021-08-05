import React from "react"
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
  name: "Artsy",
  path: "",
}

export const computeListItems = (items, appUrl = APP_URL) => {
  const allItems = [rootItem, ...items]
  const listItems = allItems.map(({ name, path }, index) => ({
    "@type": "ListItem",
    item: { "@id": `${appUrl}${path}`, name },
    position: index + 1,
  }))

  return listItems
}

export const BreadCrumbList: React.FC<BreadCrumbListProps> = props => {
  const listItems = computeListItems(props.items)

  return (
    <Meta
      tag="script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: listItems,
        }),
      }}
    />
  )
}
