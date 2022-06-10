import Artwork from "./Artwork"
import ArtworkGrid from "./ArtworkGrid/ArtworkGrid"
import Buttons from "./Buttons"
import Checkbox from "./Checkbox"
import Modal from "./Modal/Modal"
import Text from "./Text"

export interface InitOptions {
  user: User
  component: any
  domID: string
  queryConfig: any
}

// TODO: Fix Force integration post Relay Modern migration
export function init(options: InitOptions) {
  // Relay.injectNetworkLayer(artsyNetworkLayer(options.user))
  // const rootRoute = (
  //   <Artsy.SystemContextProvider user={options.user}>
  //     <Relay.RootContainer Component={options.component} route={options.queryConfig} />
  //   </Artsy.SystemContextProvider>
  // )
  // ReactDOM.render(rootRoute, document.getElementById(options.domID))
}

export default {
  Artwork,
  Buttons,
  Modal,
  ArtworkGrid,
  Checkbox,
  Text,
}
