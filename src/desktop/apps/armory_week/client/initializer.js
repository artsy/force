import React from 'react'
import ReactDOM from 'react-dom'
import { BannerPopUp } from 'desktop/apps/armory_week/components/BannerPopUp'

export const init = () => {
  const bootstrapData = window.__BOOTSTRAP__
  const {
    ctaTitle,
    ctaImageUrl,
    overlayModalTitle,
    overlayModalImageUrl,
  } = bootstrapData.bannerPopUp

  ReactDOM.render(
    <BannerPopUp
      {...{ ctaTitle, ctaImageUrl, overlayModalTitle, overlayModalImageUrl }}
    />,
    document.getElementById('react-root-for-cta')
  )
}
