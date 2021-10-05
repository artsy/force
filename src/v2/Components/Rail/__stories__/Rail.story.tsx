import React from "react"
import { Rail } from "../Rail"

export default {
  title: "Components/Rail",
}

export const DefaultRail = () => {
  return (
    <Rail
      title="Default Rail"
      viewAllLabel="View All"
      viewAllHref="/artists"
      viewAllOnClick={event => {
        event.preventDefault()
        alert("clicking view all link")
      }}
      getItems={() => {
        return ["hi", "how", "are", "you"].map(item => <div>{item}</div>)
      }}
    />
  )
}
