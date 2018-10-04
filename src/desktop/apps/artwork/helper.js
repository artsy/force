import { identity, map, pickBy, trim } from "lodash"
import { toSentence } from "underscore.string"
const { APP_URL } = require("sharify").data

const AVAILABILITY = {
  "for sale": "https://schema.org/InStock",
  sold: "https://schema.org/OutOfStock",
}

export const compactObject = o => {
  return pickBy(o, identity)
}

const displayPrice = artwork => {
  const { is_price_hidden, is_price_range, price, sale_message } = artwork

  if (is_price_range && !is_price_hidden && price) {
    const minAndMaxPrice = price.split("-")
    return {
      minPrice: trim(minAndMaxPrice[0]).replace("$", ""),
      maxPrice: trim(minAndMaxPrice[1]),
    }
  } else {
    return {
      price: sale_message,
    }
  }
}

export const convertArtworkToJSONLD = artwork => {
  let jsonLD
  const imageUrl =
    artwork.images && artwork.images.length ? artwork.images[0].url : ""

  const artistsName =
    artwork.artists &&
    artwork.artists.length &&
    toSentence(map(artwork.artists, "name"))

  const partnerName = artwork.partner && artwork.partner.name

  const artworkMetaData = {
    name: artwork.title,
    image: imageUrl,
    description: artwork.meta.description,
    url: `${APP_URL}${artwork.href}`,
    depth: artwork.depth,
    width: artwork.width,
    height: artwork.height,
    brand: {
      "@type": "Person",
      name: artistsName,
    },
  }

  if (artwork.partner.type === "Institution") {
    jsonLD = compactObject({
      "@context": "http://schema.org",
      "@type": "CreativeWork",
      ...artworkMetaData,
    })
  } else {
    jsonLD = compactObject({
      "@context": "http://schema.org",
      "@type": "Product",
      ...artworkMetaData,
      category: artwork.category,
      productionDate: artwork.date,
      offers: compactObject({
        "@type": "Offer",
        ...displayPrice(artwork),
        priceCurrency: artwork.price_currency, // not available in mp
        availability: AVAILABILITY[artwork.availability],
        seller: {
          "@type": "ArtGallery",
          name: partnerName,
        },
      }),
    })
  }
  return jsonLD
}
