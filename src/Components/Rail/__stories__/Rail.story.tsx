import { Rail } from "../Rail"

export default {
  title: "Components/Rail",
}

export const DefaultRail = () => {
  return (
    <Rail
      title="Default Rail"
      subTitle="Default Subtitle"
      showProgress={true}
      viewAllLabel="View All"
      viewAllHref="/artists"
      viewAllOnClick={event => {
        event.preventDefault()
        alert("clicking view all link")
      }}
      getItems={() => {
        return ["hi", "how", "are", "you"].map((item, key) => (
          <div key={key}>{item}</div>
        ))
      }}
    />
  )
}

export const LoadingRail = () => {
  return (
    <Rail
      isLoading
      title="Default Rail"
      subTitle="Default Subtitle"
      viewAllLabel="View All"
      viewAllHref="/artists"
      viewAllOnClick={event => {
        event.preventDefault()
        alert("clicking view all link")
      }}
      getItems={() => {
        return ["hi", "how", "are", "you"].map((item, index) => (
          <div key={index}>{item}</div>
        ))
      }}
    />
  )
}
