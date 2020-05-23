import { MockRouter } from "v2/DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as artistRoutes } from "../Artist/routes"

storiesOf("Apps/Artist", module)
  .add("Artist (less data)", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/jimmy-nelson"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist (Loie Hollowell)", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/loie-hollowell"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist (no career achievements)", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/zhang-kechun"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist (some data)", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/jordan-nassar"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist (Delacroix)", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/eugene-delacroix"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist (No artworks)", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/yudith-levin"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist (Banksy)", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/banksy"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist-- CV", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso/cv"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist-- Shows", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso/shows"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist-- Works for Sale", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso/works-for-sale"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist-- Auction Results", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso/auction-results"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist-- Articles", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso/articles"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist-- Consign", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/alex-katz/consign"
      />
    )
  })
  .add("Artist-- Consign - nina", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/nina-chanel-abney/consign"
      />
    )
  })
  .add("Artist-- Consign - no recently sold", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/genieve-figgis/consign"
      />
    )
  })
