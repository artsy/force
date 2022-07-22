import { States } from "storybook-states"
import { EntityHeaderPlaceholder } from "./EntityHeaderPlaceholder"

export default {
  title: "Components/EntityHeader",
}

export const _EntityHeaderPlaceholder = () => {
  return (
    <States states={[{}]}>
      <EntityHeaderPlaceholder />
    </States>
  )
}

_EntityHeaderPlaceholder.story = {
  name: "EntityHeaderPlaceholder",
}
