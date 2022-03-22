import { States } from "storybook-states"
import { PlaceholderEntityHeader } from "./PlaceholderEntityHeader"

export default {
  title: "Components/EntityHeader",
}

export const _PlaceholderEntityHeader = () => {
  return (
    <States states={[{}]}>
      <PlaceholderEntityHeader />
    </States>
  )
}

_PlaceholderEntityHeader.story = {
  name: "PlaceholderEntityHeader",
}
