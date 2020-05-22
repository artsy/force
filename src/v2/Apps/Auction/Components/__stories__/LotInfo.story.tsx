import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { LotInfo } from "../LotInfo"

storiesOf("Apps/Auction/Components", module).add("LotInfo", () => {
  return (
    <Section>
      <LotInfo
        relay={null as any}
        artwork={{
          " $refType": null as any,
          internalID: "artworkid",
          date: "1938/1939",
          imageUrl:
            "https://d32dm0rphc51dk.cloudfront.net/7oGWacsWm7L5NS6gSVp-KA/square.jpg",
          artistNames:
            "PaJaMa, Jared French, Paul Cadmus, Margaret Hoening French",
          title: "Paul Cadmus and Margaret French, Fire Island",
        }}
        saleArtwork={{
          lotLabel: "23B",
          counts: { bidderPositions: 3 },
          " $refType": null as any,
          minimumNextBid: { cents: 100000, amount: "1,000", display: "$1,000" },
        }}
      />
    </Section>
  )
})
