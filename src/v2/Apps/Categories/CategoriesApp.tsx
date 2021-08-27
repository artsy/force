import React from "react"
import { MetaTags } from "v2/Components/MetaTags"
import { CategoriesIntro } from "./Components/CategoriesIntro"

export const CategoriesApp: React.FC = () => {
  return (
    <>
      <MetaTags pathname="categories" />
      <CategoriesIntro />
    </>
  )
}
