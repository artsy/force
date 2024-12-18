/**
 * @generated SignedSource<<9f1c1fb2ee6b61f5bff358d878a483b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkAggregation =
  | "ARTIST"
  | "ARTIST_NATIONALITY"
  | "ARTIST_SERIES"
  | "ATTRIBUTION_CLASS"
  | "COLOR"
  | "DIMENSION_RANGE"
  | "FOLLOWED_ARTISTS"
  | "GALLERY"
  | "INSTITUTION"
  | "LOCATION_CITY"
  | "MAJOR_PERIOD"
  | "MATERIALS_TERMS"
  | "MEDIUM"
  | "MERCHANDISABLE_ARTISTS"
  | "PARTNER"
  | "PARTNER_CITY"
  | "PERIOD"
  | "PRICE_RANGE"
  | "SIMPLE_PRICE_HISTOGRAM"
  | "TOTAL"
  | "%future added value"
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value"
export type FilterArtworksInput = {
  acquireable?: boolean | null | undefined
  additionalGeneIDs?:
    | ReadonlyArray<string | null | undefined>
    | null
    | undefined
  after?: string | null | undefined
  aggregationPartnerCities?:
    | ReadonlyArray<string | null | undefined>
    | null
    | undefined
  aggregations?:
    | ReadonlyArray<ArtworkAggregation | null | undefined>
    | null
    | undefined
  artistID?: string | null | undefined
  artistIDs?: ReadonlyArray<string | null | undefined> | null | undefined
  artistNationalities?:
    | ReadonlyArray<string | null | undefined>
    | null
    | undefined
  artistSeriesID?: string | null | undefined
  artistSeriesIDs?: ReadonlyArray<string | null | undefined> | null | undefined
  atAuction?: boolean | null | undefined
  attributionClass?: ReadonlyArray<string | null | undefined> | null | undefined
  before?: string | null | undefined
  color?: string | null | undefined
  colors?: ReadonlyArray<string | null | undefined> | null | undefined
  dimensionRange?: string | null | undefined
  excludeArtworkIDs?:
    | ReadonlyArray<string | null | undefined>
    | null
    | undefined
  extraAggregationGeneIDs?:
    | ReadonlyArray<string | null | undefined>
    | null
    | undefined
  first?: number | null | undefined
  forSale?: boolean | null | undefined
  geneID?: string | null | undefined
  geneIDs?: ReadonlyArray<string | null | undefined> | null | undefined
  height?: string | null | undefined
  includeArtworksByFollowedArtists?: boolean | null | undefined
  includeMediumFilterInAggregation?: boolean | null | undefined
  inquireableOnly?: boolean | null | undefined
  keyword?: string | null | undefined
  keywordMatchExact?: boolean | null | undefined
  last?: number | null | undefined
  locationCities?: ReadonlyArray<string | null | undefined> | null | undefined
  majorPeriods?: ReadonlyArray<string | null | undefined> | null | undefined
  marketable?: boolean | null | undefined
  marketingCollectionID?: string | null | undefined
  materialsTerms?: ReadonlyArray<string | null | undefined> | null | undefined
  medium?: string | null | undefined
  offerable?: boolean | null | undefined
  page?: number | null | undefined
  partnerCities?: ReadonlyArray<string | null | undefined> | null | undefined
  partnerID?: string | null | undefined
  partnerIDs?: ReadonlyArray<string | null | undefined> | null | undefined
  period?: string | null | undefined
  periods?: ReadonlyArray<string | null | undefined> | null | undefined
  priceRange?: string | null | undefined
  saleID?: string | null | undefined
  size?: number | null | undefined
  sizes?: ReadonlyArray<ArtworkSizes | null | undefined> | null | undefined
  sort?: string | null | undefined
  tagID?: string | null | undefined
  width?: string | null | undefined
}
export type SuggestedArtworksShelfQuery$variables = {
  input?: FilterArtworksInput | null | undefined
}
export type SuggestedArtworksShelfQuery$data = {
  readonly artworksConnection:
    | {
        readonly counts:
          | {
              readonly total: any | null | undefined
            }
          | null
          | undefined
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly internalID: string
                        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
}
export type SuggestedArtworksShelfQuery = {
  response: SuggestedArtworksShelfQuery$data
  variables: SuggestedArtworksShelfQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "input",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "input",
        variableName: "input",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      concreteType: "FilterArtworksCounts",
      kind: "LinkedField",
      name: "counts",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "total",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "internalID",
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "href",
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "endAt",
      storageKey: null,
    },
    v6 = [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "display",
        storageKey: null,
      },
    ],
    v7 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v8 = [
      {
        kind: "Literal",
        name: "shallow",
        value: true,
      },
    ],
    v9 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v10 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "lotID",
      storageKey: null,
    },
    v11 = [v9 /*: any*/, v7 /*: any*/]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "SuggestedArtworksShelfQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "FilterArtworksConnection",
          kind: "LinkedField",
          name: "artworksConnection",
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: "FilterArtworksEdge",
              kind: "LinkedField",
              name: "edges",
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Artwork",
                  kind: "LinkedField",
                  name: "node",
                  plural: false,
                  selections: [
                    {
                      args: null,
                      kind: "FragmentSpread",
                      name: "ShelfArtwork_artwork",
                    },
                    v3 /*: any*/,
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
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
      name: "SuggestedArtworksShelfQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "FilterArtworksConnection",
          kind: "LinkedField",
          name: "artworksConnection",
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: "FilterArtworksEdge",
              kind: "LinkedField",
              name: "edges",
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Artwork",
                  kind: "LinkedField",
                  name: "node",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "isUnlisted",
                      storageKey: null,
                    },
                    v3 /*: any*/,
                    v4 /*: any*/,
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
                            v5 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              concreteType: "Money",
                              kind: "LinkedField",
                              name: "priceWithDiscount",
                              plural: false,
                              selections: v6 /*: any*/,
                              storageKey: null,
                            },
                            v7 /*: any*/,
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
                      args: v8 /*: any*/,
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
                        v7 /*: any*/,
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
                      args: v8 /*: any*/,
                      concreteType: "Artist",
                      kind: "LinkedField",
                      name: "artists",
                      plural: true,
                      selections: [v7 /*: any*/, v4 /*: any*/, v9 /*: any*/],
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
                      args: v8 /*: any*/,
                      concreteType: "Partner",
                      kind: "LinkedField",
                      name: "partner",
                      plural: false,
                      selections: [v9 /*: any*/, v4 /*: any*/, v7 /*: any*/],
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
                        v5 /*: any*/,
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
                        v7 /*: any*/,
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
                        v10 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "lotLabel",
                          storageKey: null,
                        },
                        v5 /*: any*/,
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
                          selections: v6 /*: any*/,
                          storageKey: null,
                        },
                        {
                          alias: "opening_bid",
                          args: null,
                          concreteType: "SaleArtworkOpeningBid",
                          kind: "LinkedField",
                          name: "openingBid",
                          plural: false,
                          selections: v6 /*: any*/,
                          storageKey: null,
                        },
                        v7 /*: any*/,
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
                      selections: [v10 /*: any*/, v7 /*: any*/],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "AttributionClass",
                      kind: "LinkedField",
                      name: "attributionClass",
                      plural: false,
                      selections: v11 /*: any*/,
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
                          selections: v11 /*: any*/,
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
                    v7 /*: any*/,
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v7 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "10243df7c2ea9743a5f6aba190e3e4fe",
      id: null,
      metadata: {},
      name: "SuggestedArtworksShelfQuery",
      operationKind: "query",
      text: 'query SuggestedArtworksShelfQuery(\n  $input: FilterArtworksInput\n) {\n  artworksConnection(input: $input) {\n    counts {\n      total\n    }\n    edges {\n      node {\n        ...ShelfArtwork_artwork\n        internalID\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork_1ZRKfT on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork_1ZRKfT\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  collectorSignals {\n    primaryLabel\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: ["larger", "large"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n',
    },
  }
})()
;(node as any).hash = "ed2824d5582f2da1d37b4df0343a3884"

export default node
