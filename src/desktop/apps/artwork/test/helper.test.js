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
      url: "undefined/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
      productionDate: "1999",
      offers: {
        "@type": "Offer",
        price: "$150",
        availability: "for sale",
        seller: "Artstar",
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
      url: "undefined/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
    }

    helper.convertArtworkToJSONLD(data.artwork).should.eql(jsonLD)
  })

  it("safeguards against missing images", () => {
    const artwork = {
      id: "yee-wong-exploding-powder-movement-blue-and-pink",
      sale_message: "$150 - 1,250",
      price: "$150",
      meta: { description: "Some contemporary artwork!" },
      availability: "for sale",
      date: "1999",
      href: "/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
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
      url: "undefined/artwork/yee-wong-exploding-powder-movement-blue-and-pink",
      productionDate: "1999",
      offers: {
        "@type": "Offer",
        price: "$150",
        availability: "for sale",
        seller: "Artstar",
      },
    }

    helper.convertArtworkToJSONLD(artwork).should.eql(jsonLD)
  })
})
