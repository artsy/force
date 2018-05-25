import { mountClient } from 'desktop/lib/isomorphic-relay/mountClient'
import { routes } from './routes'

mountClient(routes)

if (module.hot) {
  module.hot.accept()
}
