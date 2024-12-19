/**
 * @generated SignedSource<<37ed818928ba9a3ad95b50557ade9be8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ShelfArtworkStoryQuery$variables = {
  id: string
}
export type ShelfArtworkStoryQuery$data = {
  readonly artwork:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">
      }
    | null
    | undefined
}
export type ShelfArtworkStoryQuery = {
  response: ShelfArtworkStoryQuery$data
  variables: ShelfArtworkStoryQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "id",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "id",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "href",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "endAt",
      storageKey: null,
    },
    v4 = [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "display",
        storageKey: null,
      },
    ],
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v6 = [
      {
        kind: "Literal",
        name: "shallow",
        value: true,
      },
    ],
    v7 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "lotID",
      storageKey: null,
    },
    v9 = [v7 /*: any*/, v5 /*: any*/]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "ShelfArtworkStoryQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Artwork",
          kind: "LinkedField",
          name: "artwork",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "ShelfArtwork_artwork",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "ShelfArtworkStoryQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Artwork",
          kind: "LinkedField",
          name: "artwork",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "isUnlisted",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "internalID",
              storageKey: null,
            },
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "title",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "date",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "CollectorSignals",
              kind: "LinkedField",
              name: "collectorSignals",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "primaryLabel",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "AuctionCollectorSignals",
                  kind: "LinkedField",
                  name: "auction",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "bidCount",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "lotClosesAt",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "liveBiddingStarted",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "registrationEndsAt",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "onlineBiddingExtended",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "PartnerOfferToCollector",
                  kind: "LinkedField",
                  name: "partnerOffer",
                  plural: false,
                  selections: [
                    v3 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: "Money",
                      kind: "LinkedField",
                      name: "priceWithDiscount",
                      plural: false,
                      selections: v4 /*: any*/,
                      storageKey: null,
                    },
                    v5 /*: any*/,
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: "sale_message",
              args: null,
              kind: "ScalarField",
              name: "saleMessage",
              storageKey: null,
            },
            {
              alias: "cultural_maker",
              args: null,
              kind: "ScalarField",
              name: "culturalMaker",
              storageKey: null,
            },
            {
              alias: null,
              args: v6 /*: any*/,
              concreteType: "Artist",
              kind: "LinkedField",
              name: "artist",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "ArtistTargetSupply",
                  kind: "LinkedField",
                  name: "targetSupply",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "isP1",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                v5 /*: any*/,
              ],
              storageKey: "artist(shallow:true)",
            },
            {
              alias: null,
              args: null,
              concreteType: "ArtworkPriceInsights",
              kind: "LinkedField",
              name: "marketPriceInsights",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "demandRank",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: v6 /*: any*/,
              concreteType: "Artist",
              kind: "LinkedField",
              name: "artists",
              plural: true,
              selections: [v5 /*: any*/, v2 /*: any*/, v7 /*: any*/],
              storageKey: "artists(shallow:true)",
            },
            {
              alias: "collecting_institution",
              args: null,
              kind: "ScalarField",
              name: "collectingInstitution",
              storageKey: null,
            },
            {
              alias: null,
              args: v6 /*: any*/,
              concreteType: "Partner",
              kind: "LinkedField",
              name: "partner",
              plural: false,
              selections: [v7 /*: any*/, v2 /*: any*/, v5 /*: any*/],
              storageKey: "partner(shallow:true)",
            },
            {
              alias: null,
              args: null,
              concreteType: "Sale",
              kind: "LinkedField",
              name: "sale",
              plural: false,
              selections: [
                v3 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "cascadingEndTimeIntervalMinutes",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "extendedBiddingIntervalMinutes",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "startAt",
                  storageKey: null,
                },
                {
                  alias: "is_auction",
                  args: null,
                  kind: "ScalarField",
                  name: "isAuction",
                  storageKey: null,
                },
                {
                  alias: "is_closed",
                  args: null,
                  kind: "ScalarField",
                  name: "isClosed",
                  storageKey: null,
                },
                v5 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "isOpen",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: "sale_artwork",
              args: null,
              concreteType: "SaleArtwork",
              kind: "LinkedField",
              name: "saleArtwork",
              plural: false,
              selections: [
                v8 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "lotLabel",
                  storageKey: null,
                },
                v3 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "extendedBiddingEndAt",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "formattedEndDateTime",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "SaleArtworkCounts",
                  kind: "LinkedField",
                  name: "counts",
                  plural: false,
                  selections: [
                    {
                      alias: "bidder_positions",
                      args: null,
                      kind: "ScalarField",
                      name: "bidderPositions",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: "highest_bid",
                  args: null,
                  concreteType: "SaleArtworkHighestBid",
                  kind: "LinkedField",
                  name: "highestBid",
                  plural: false,
                  selections: v4 /*: any*/,
                  storageKey: null,
                },
                {
                  alias: "opening_bid",
                  args: null,
                  concreteType: "SaleArtworkOpeningBid",
                  kind: "LinkedField",
                  name: "openingBid",
                  plural: false,
                  selections: v4 /*: any*/,
                  storageKey: null,
                },
                v5 /*: any*/,
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "SaleArtwork",
              kind: "LinkedField",
              name: "saleArtwork",
              plural: false,
              selections: [v8 /*: any*/, v5 /*: any*/],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "AttributionClass",
              kind: "LinkedField",
              name: "attributionClass",
              plural: false,
              selections: v9 /*: any*/,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "ArtworkMedium",
              kind: "LinkedField",
              name: "mediumType",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Gene",
                  kind: "LinkedField",
                  name: "filterGene",
                  plural: false,
                  selections: v9 /*: any*/,
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "artistNames",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "Image",
              kind: "LinkedField",
              name: "image",
              plural: false,
              selections: [
                {
                  alias: "src",
                  args: [
                    {
                      kind: "Literal",
                      name: "version",
                      value: ["larger", "large"],
                    },
                  ],
                  kind: "ScalarField",
                  name: "url",
                  storageKey: 'url(version:["larger","large"])',
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "width",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "height",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "blurhashDataURL",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v5 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "7451a24c4f972b36b43c52d74b879836",
      id: null,
      metadata: {},
      name: "ShelfArtworkStoryQuery",
      operationKind: "query",
      text: 'query ShelfArtworkStoryQuery(\n  $id: String!\n) {\n  artwork(id: $id) {\n    ...ShelfArtwork_artwork\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork_1ZRKfT on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork_1ZRKfT\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  collectorSignals {\n    primaryLabel\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: ["larger", "large"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n',
    },
  }
})()

;(node as any).hash = "2b561c42fea1a2bd72e8a250c35ad803"

export default node
