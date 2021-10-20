import * as React from "react";
import { StructuredData } from "./StructuredData"
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

  const schemaData = {
    "@type": "BreadcrumbList",
    itemListElement: listItems,
  }

  return <StructuredData schemaData={schemaData} />
}
