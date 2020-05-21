import { storiesOf } from "@storybook/react"
import React from "react"
import { PartnerBlock } from "../Partner/PartnerBlock"
import { PartnerInline } from "../Partner/PartnerInline"

storiesOf("Publishing/Partner", module)
  .add("Partner Block", () => {
    return (
      <div>
        <PartnerBlock
          url="https://artsy.net"
          logo="https://artsy-media-uploads.s3.amazonaws.com/kq-CcNCHEgAuPadHtOveeg%2FPlanetArt_Black.png"
        />
        <br />
        <PartnerBlock
          url="https://artsy.net"
          logo="https://artsy-media-uploads.s3.amazonaws.com/p1yI3-MMHb3QKB5qw-1Q3w%2Fvv.png"
        />
      </div>
    )
  })
  .add("Partner Inline", () => {
    return (
      <div>
        <PartnerInline
          url="https://artsy.net"
          logo="https://artsy-media-uploads.s3.amazonaws.com/kq-CcNCHEgAuPadHtOveeg%2FPlanetArt_Black.png"
        />
        <br />
        <PartnerInline
          url="https://artsy.net"
          logo="https://artsy-media-uploads.s3.amazonaws.com/p1yI3-MMHb3QKB5qw-1Q3w%2Fvv.png"
        />
      </div>
    )
  })
