import ReactDOM from "react-dom"
import { App } from "desktop/apps/editorial_features/components/gucci/components/App"
import { data as sd } from "sharify"

export default () => {
  ReactDOM.render(
    <App
      activeSection={sd.VIDEO_INDEX}
      curation={sd.CURATION}
      isMobile={sd.IS_MOBILE}
    />,
    document.getElementById("react-root")
  )
}
