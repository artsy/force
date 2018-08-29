import _ from 'underscore'
const { APP_URL } = require('sharify').data

export const compactObject = o => {
  const clone = _.clone(o)
  _.each(clone, (v, k) => {
    if (!v) {
      delete clone[k]
    }
  })
  return clone
}

export const convertArtworkToJSONLD = artwork => {
  let jsonLD
  const imageUrl =
    artwork.images && artwork.images.length ? artwork.images[0].url : ''

  const artworkMetaData = {
    name: artwork.title,
    image: imageUrl,
    description: artwork.meta.description,
    url: `${APP_URL}${artwork.href}`,
    depth: artwork.depth,
    width: artwork.width,
    height: artwork.height,
  }

  if (artwork.partner.type === 'Institution') {
    jsonLD = compactObject({
      '@context': 'http://schema.org',
      '@type': 'CreativeWork',
      ...artworkMetaData,
    })
  } else {
    jsonLD = compactObject({
      '@context': 'http://schema.org',
      '@type': 'Product',
      ...artworkMetaData,
      category: artwork.category,
      productionDate: artwork.date,
      offers: compactObject({
        '@type': 'Offer',
        price: artwork.price,
        priceCurrency: artwork.price_currency, // not available in mp
        availability: artwork.availability,
        seller: artwork.partner.name,
      }),
    })
  }
  return jsonLD
}
