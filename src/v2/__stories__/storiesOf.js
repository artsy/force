import React from "react"
import { storiesOf as _storiesOf } from "@storybook/react"
import { Boot } from "v2/Artsy/Router"
// import track from "react-tracking"
// import Events from "../Utils/Events"

const bootProps = {
  mediator: x => x,
}

export function storiesOf(desc, mod) {
  return _storiesOf(desc, mod).addDecorator(storyFn => {
    return <Boot {...bootProps}>{storyFn()}</Boot>
  })
}

// FIXME: breaks storybooks with mp v2, update to use artsy analytics
// Wrap publishing sub-component stories so tracking events log
// @track(
//   {},
//   {
//     dispatch: data => Events.postEvent(data),
//   }
// )
class PublishingBoot extends React.Component {
  render() {
    return this.props.children
  }
}

export function storiesOfPublishing(desc, mod) {
  return _storiesOf(desc, mod).addDecorator(storyFn => {
    return <PublishingBoot>{storyFn()}</PublishingBoot>
  })
}
