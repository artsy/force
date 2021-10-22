import { States } from "storybook-states"
import { FilterInput } from "./FilterInput"

export default {
  title: "Components/FilterInput",
}

export const Example = () => {
  return (
    <States>
      <FilterInput placeholder="Example" />
    </States>
  )
}
