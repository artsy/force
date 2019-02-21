const helper = require("../helper")
const { data } = require("./fixtures/artwork.json")

describe("Artwork helpers", () => {
  it("#compactObject", () => {
    const artworkObj = {
      name: "Untitled",
      image: "images/pic.jpg",
      url: "",
      depth: undefined,
    }

    const actualObj = {
      name: "Untitled",
      image: "images/pic.jpg",
    }
    helper.compactObject(artworkObj).should.eql(actualObj)
  })

  it("generates jsonLD matching the Product schema for artwork from a gallery partner", () => {
    const jsonLD = {
      "@context": "http://schema.org",
      "@type": "Product",
      image: "/images/pic.jpg",
      description: "Some contemporary artwork!",
      url:
        "http://artsy.net/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
      brand: {
        "@type": "Person",
        name: "Professor Paint",
      },
      productionDate: "1999",
      offers: {
        "@type": "Offer",
        minPrice: "150",
        maxPrice: "1,250",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "ArtGallery",
          name: "Artstar",
        },
      },
    }

    helper.convertArtworkToJSONLD(data.artwork).should.eql(jsonLD)
  })

  it("generates jsonLD matching the Creative Work schema for artworks from an institution partner", () => {
    data.artwork.partner.type = "Institution"

    const jsonLD = {
      "@context": "http://schema.org",
      "@type": "CreativeWork",
      image: "/images/pic.jpg",
      description: "Some contemporary artwork!",
      url:
        "http://artsy.net/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
      brand: {
        "@type": "Person",
        name: "Professor Paint",
      },
    }

    helper.convertArtworkToJSONLD(data.artwork).should.eql(jsonLD)
  })

  it("safeguards against missing images", () => {
    const artwork = {
      id: "yee-wong-exploding-powder-movement-blue-and-pink",
      sale_message: "$150",
      price: "$150",
      price_currency: "USD",
      is_price_range: false,
      meta: {
        description: "Some contemporary artwork!",
      },
      availability: "for sale",
      date: "1999",
      href: "/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
      artists: [
        {
          id: "abcde",
          name: "Professor Paint",
          href: "internet.com",
        },
      ],
      partner: {
        id: "artstar",
        name: "Artstar",
        type: "Gallery",
        is_pre_qualify: false,
      },
    }

    const jsonLD = {
      "@context": "http://schema.org",
      "@type": "Product",
      description: "Some contemporary artwork!",
      url:
        "http://artsy.net/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
      brand: {
        "@type": "Person",
        name: "Professor Paint",
      },
      productionDate: "1999",
      offers: {
        "@type": "Offer",
        price: "$150",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "ArtGallery",
          name: "Artstar",
        },
      },
    }

    helper.convertArtworkToJSONLD(artwork).should.eql(jsonLD)
  })

  it("displays sale message when the price is not a range", () => {
    const artwork = {
      id: "yee-wong-exploding-powder-movement-blue-and-pink",
      sale_message: "Contact for price",
      price: "",
      price_currency: "USD",
      is_price_range: false,
      meta: {
        description: "Some contemporary artwork!",
      },
      availability: "for sale",
      date: "1999",
      href: "/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
      artists: [
        {
          id: "abcde",
          name: "Professor Paint",
          href: "internet.com",
        },
      ],
      partner: {
        id: "artstar",
        name: "Artstar",
        type: "Gallery",
        is_pre_qualify: false,
      },
    }

    const jsonLD = {
      "@context": "http://schema.org",
      "@type": "Product",
      description: "Some contemporary artwork!",
      url:
        "http://artsy.net/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
      brand: {
        "@type": "Person",
        name: "Professor Paint",
      },
      productionDate: "1999",
      offers: {
        "@type": "Offer",
        price: "Contact for price",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "ArtGallery",
          name: "Artstar",
        },
      },
    }

    helper.convertArtworkToJSONLD(artwork).should.eql(jsonLD)
  })
})
