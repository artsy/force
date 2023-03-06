import React from "react"
import { GridColumns } from "@artsy/palette"
import { ArtworkItem } from "./ArtworkItem"

export const TEMP_ARTWORKS = [
  {
    internalID: "5bd0db6e8477262b48aeab8b",
    title: "Yacht Life",
    artist: {
      name: "Nelson De La Nuez",
    },
    partner: {
      name: "Artspace Warehouse",
    },
    price: "$8,000",
  },
  {
    internalID: "5cf0b597e004320012274c0c",
    title: "From Paris with Love",
    artist: {
      name: "Nelson De La Nuez",
    },
    partner: {
      name: "A.Style",
    },
    price: "$7,000",
  },
  {
    internalID: "63f3becfe3a2c9000c6075bb",
    title: "Meital, Ziv, Mika & Shimshon",
    artist: {
      name: "Navot Miller",
    },
    partner: {
      name: "Yossi Milo Gallery",
    },
    price: "$14,000",
  },
  {
    internalID: "5bc4e65420f56355c6db9862",
    title: "espacio derrotado",
    artist: {
      name: "Alexandre Arrechea",
    },
    partner: {
      name: "Reis Studios",
    },
    price: "$12,000",
  },
  {
    internalID: "63dadb5cf70841000b7af667",
    title: "Pears, Clinton, Connecticut",
    artist: {
      name: "Rodney Smith",
    },
    partner: {
      name: "Robert Klein Gallery",
    },
    price: "$20,000 - 50,000",
  },
  {
    internalID: "63dadbcba2b499000ea289e2",
    title: "Collin with Magnifying Glass, Alberta, Canada",
    artist: {
      name: "Rodney Smith",
    },
    partner: {
      name: "Robert Klein Gallery",
    },
    price: "$10,000 - 40,000",
  },
  {
    internalID: "62b214a7a80d77000d868046",
    title: "Youth",
    artist: {
      name: "Luke Smalley",
    },
    partner: {
      name: "CLAMP",
    },
    price: "$1,800",
  },
  {
    internalID: "59c28e258b3b816480e9fb0e",
    title: "Tatiana in Black Slip 2",
    artist: {
      name: "Richard Learoyd",
    },
    partner: {
      name: "Sotheby's",
    },
    price: "",
  },
  {
    internalID: "5b9806767606af002684f0b8",
    title: "Long Black",
    artist: {
      name: "Richard Learoyd",
    },
    partner: {
      name: "Phillips",
    },
    price: "",
  },
  {
    internalID: "5f19fbf199ba690011470ffe",
    title: "Fragment",
    artist: {
      name: "Richard Learoyd",
    },
    partner: {
      name: "Pace Gallery",
    },
    price: "",
  },
  {
    internalID: "63dacd25feb14f000df4d272",
    title: "U.A. Walker, New York",
    artist: {
      name: "Hiroshi Sugimoto",
    },
    partner: {
      name: "Obscura Gallery",
    },
    price: "$2,250 - 3,250",
  },
  {
    internalID: "6351bf3f835f69000eefbe55",
    title: "Obliteration after Modigliani",
    artist: {
      name: "Richard Learoyd",
    },
    partner: {
      name: "Fraenkel Gallery",
    },
    price: "",
  },
  {
    internalID: "5b16e95b8b0c1413a6cdf588",
    title: "David Standing on Water No. 1, Sherwood Island, Connecticut",
    artist: {
      name: "Rodney Smith",
    },
    partner: {
      name: "Gilman Contemporary",
    },
    price: "$15,000 - 45,000",
  },
  {
    internalID: "63dadb64feb14f000bddaf3a",
    title: "Kiton Man, The Knole Estate, Long Island, New York",
    artist: {
      name: "Rodney Smith",
    },
    partner: {
      name: "Robert Klein Gallery",
    },
    price: "$10,000 - 40,000",
  },
  {
    internalID: "58fb5c39cd530e4d3dbbbdb3",
    title: "Kate Moss, Nepal, British Vogue",
    artist: {
      name: "Arthur Elgort",
    },
    partner: {
      name: "Atlas Gallery",
    },
    price: "$12,000 - 30,000",
  },
]

export const ArtworksList: React.FC = () => {
  const handleItemPress = item => {
    console.log("[Debug] Item pressed", item)
  }

  return (
    <GridColumns>
      {TEMP_ARTWORKS.map(artwork => {
        return <ArtworkItem item={artwork} onItemPress={handleItemPress} />
      })}
    </GridColumns>
  )
}
