import { storiesOf } from "@storybook/react"
import React from "react"

import { IconArtist } from "../Icon/IconArtist"
import { IconBlockquote } from "../Icon/IconBlockquote"
import { IconClearFormatting } from "../Icon/IconClearFormatting"
import { IconDrag } from "../Icon/IconDrag"
import { IconEditEmbed } from "../Icon/IconEditEmbed"
import { IconEditImages } from "../Icon/IconEditImages"
import { IconEditSection } from "../Icon/IconEditSection"
import { IconEditText } from "../Icon/IconEditText"
import { IconEditVideo } from "../Icon/IconEditVideo"
import { IconExpand } from "../Icon/IconExpand"
import { IconHamburger } from "../Icon/IconHamburger"
import { IconHeroImage } from "../Icon/IconHeroImage"
import { IconHeroVideo } from "../Icon/IconHeroVideo"
import { IconImageFullscreen } from "../Icon/IconImageFullscreen"
import { IconImageSet } from "../Icon/IconImageSet"
import { IconLayoutFullscreen } from "../Icon/IconLayoutFullscreen"
import { IconLayoutSplit } from "../Icon/IconLayoutSplit"
import { IconLayoutText } from "../Icon/IconLayoutText"
import { IconLink } from "../Icon/IconLink"
import { IconOrderedList } from "../Icon/IconOrderedList"
import { IconPlus } from "../Icon/IconPlus"
import { IconRemove } from "../Icon/IconRemove"
import { IconSocialEmail } from "../Icon/IconSocialEmail"
import { IconSocialFacebook } from "../Icon/IconSocialFacebook"
import { IconSocialTwitter } from "../Icon/IconSocialTwitter"
import { IconUnorderedList } from "../Icon/IconUnorderedList"
import { IconVideoFullscreen } from "../Icon/IconVideoFullscreen"
import { IconVideoMute } from "../Icon/IconVideoMute"
import { IconVideoPause } from "../Icon/IconVideoPause"
import { IconVideoPlay } from "../Icon/IconVideoPlay"
import { IconVideoUnmute } from "../Icon/IconVideoUnmute"
import { Typography } from "./TypographyExamples"

storiesOf("Publishing/Typography", module)
  .add("Icons", () => {
    return (
      <div>
        <div style={{ width: 50 }}>
          <IconImageSet />
          <p>ImageSet</p>
        </div>
        <div style={{ width: 50 }}>
          <IconImageFullscreen />
          <p>Image Fullscreen</p>
        </div>
        <div style={{ width: 50 }}>
          <IconRemove />
          <p>Remove</p>
        </div>
        <div style={{ width: 50 }}>
          <IconExpand />
          <p>Expand</p>
        </div>
        <div style={{ width: 50 }}>
          <IconDrag />
          <p>Drag</p>
        </div>
        <div style={{ width: 50 }}>
          <IconHamburger />
          <p>Hamburger</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLayoutSplit />
          <p>Layout Split</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLayoutText />
          <p>Layout Text</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLayoutFullscreen />
          <p>Layout Fullscreen</p>
        </div>
        <div style={{ width: 50 }}>
          <IconPlus />
          <p>Plus</p>
        </div>
        <div style={{ width: 50 }}>
          <IconHeroVideo />
          <p>Hero Video</p>
        </div>
        <div style={{ width: 50 }}>
          <IconHeroImage />
          <p>Hero Image</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditEmbed />
          <p>Edit Embed</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditImages />
          <p>Edit Images</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditText />
          <p>Edit Text</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditVideo />
          <p>Edit Video</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditSection />
          <p>Edit Section</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditSection isClosing />
          <p>Edit Section isClosing</p>
        </div>
        <div style={{ width: 50 }}>
          <IconSocialTwitter />
          <p>Twitter</p>
        </div>
        <div style={{ width: 50 }}>
          <IconSocialEmail />
          <p>Email</p>
        </div>
        <div style={{ width: 50 }}>
          <IconSocialFacebook />
          <p>Facebook</p>
        </div>
        <div style={{ width: 50 }}>
          <IconArtist />
          <p>Artist</p>
        </div>
        <div style={{ width: 50 }}>
          <IconBlockquote />
          <p>Blockquote</p>
        </div>
        <div style={{ width: 50 }}>
          <IconClearFormatting />
          <p>Clear Formatting</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLink />
          <p>Link</p>
        </div>
        <div style={{ width: 50 }}>
          <IconOrderedList />
          <p>Ordered List</p>
        </div>
        <div style={{ width: 50 }}>
          <IconUnorderedList />
          <p>Unordered List</p>
        </div>
        <div style={{ width: 50 }}>
          <IconVideoFullscreen />
          <p>Video Fullscreen</p>
        </div>
        <div style={{ width: 50 }}>
          <IconVideoMute />
          <p>Video Mute</p>
        </div>
        <div style={{ width: 50 }}>
          <IconVideoPause />
          <p>Video Pause</p>
        </div>
        <div style={{ width: 50 }}>
          <IconVideoPlay />
          <p>Video Play</p>
        </div>
        <div style={{ width: 50 }}>
          <IconVideoUnmute />
          <p>Video Unmute</p>
        </div>
      </div>
    )
  })
  .add("Typography", () => {
    return <Typography />
  })
