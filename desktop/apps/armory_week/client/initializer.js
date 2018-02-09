import React from 'react'
import ReactDOM from 'react-dom'
import { Cta } from 'desktop/apps/armory_week/components/Cta'

export const init = () => {
  const bootstrapData = window.__BOOTSTRAP__
  const { ctaTitle, ctaImageUrl, overlayModalTitle, overlayModalImageUrl } = bootstrapData.bannerPopUp

  ReactDOM.hydrate(
    <Cta {...{ ctaTitle, ctaImageUrl, overlayModalTitle, overlayModalImageUrl }} />,
    document.getElementById('react-root-for-cta')
  )
}
