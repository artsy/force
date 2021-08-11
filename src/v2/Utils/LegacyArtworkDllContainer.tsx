import { data as sd } from "sharify"
import React from "react"

export class LegacyArtworkDllContainer extends React.Component {
  componentDidMount() {
    this.addLegacyAssets()
    this.addLegacyStyles()
  }

  addLegacyAssets() {
    if (!document.getElementById("legacy-assets-dll")) {
      import(
        /* webpackChunkName: 'legacy-assets-dll' */ "./legacyAssetDll"
      ).then(({ legacyAssetDll }) => {
        legacyAssetDll()
      })
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div id='legacy-assets-dll' />`
      )
    }
  }

  addLegacyStyles() {
    if (!document.getElementById("legacyArtworkPageStyles")) {
      document.head.insertAdjacentHTML(
        "beforeend",
        `<link id='legacyArtworkPageStyles' rel="stylesheet" href="${sd.LEGACY_MAIN_CSS}" />`
      )
    }
  }

  render() {
    return null
  }
}
