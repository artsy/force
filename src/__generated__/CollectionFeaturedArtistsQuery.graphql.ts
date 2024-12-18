/**
 * @generated SignedSource<<38ff5b516f1c432ad55da99c92273b2d>>
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
export type CollectionFeaturedArtistsQuery$variables = {
  aggregations?:
    | ReadonlyArray<ArtworkAggregation | null | undefined>
    | null
    | undefined
  slug: string
}
export type CollectionFeaturedArtistsQuery$data = {
  readonly marketingCollection:
    | {
        readonly artworksConnection:
          | {
              readonly " $fragmentSpreads": FragmentRefs<"CollectionFeaturedArtists_artworks">
            }
          | null
          | undefined
        readonly " $fragmentSpreads": FragmentRefs<"CollectionFeaturedArtists_collection">
      }
    | null
    | undefined
}
export type CollectionFeaturedArtistsQuery = {
  response: CollectionFeaturedArtistsQuery$data
  variables: CollectionFeaturedArtistsQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "aggregations",
    },
    v1 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "slug",
    },
    v2 = [
      {
        kind: "Variable",
        name: "slug",
        variableName: "slug",
      },
    ],
    v3 = [
      {
        kind: "Variable",
        name: "aggregations",
        variableName: "aggregations",
      },
      {
        kind: "Literal",
        name: "first",
        value: 20,
      },
      {
        kind: "Literal",
        name: "includeMediumFilterInAggregation",
        value: true,
      },
      {
        kind: "Literal",
        name: "sort",
        value: "-decayed_merch",
      },
    ],
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "slug",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: "Fragment",
      metadata: null,
      name: "CollectionFeaturedArtistsQuery",
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: "MarketingCollection",
          kind: "LinkedField",
          name: "marketingCollection",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "CollectionFeaturedArtists_collection",
            },
            {
              alias: null,
              args: v3 /*: any*/,
              concreteType: "FilterArtworksConnection",
              kind: "LinkedField",
              name: "artworksConnection",
              plural: false,
              selections: [
                {
                  args: null,
                  kind: "FragmentSpread",
                  name: "CollectionFeaturedArtists_artworks",
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
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: "Operation",
      name: "CollectionFeaturedArtistsQuery",
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: "MarketingCollection",
          kind: "LinkedField",
          name: "marketingCollection",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "category",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "credit",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "description",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "featuredArtistExclusionIds",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "headerImage",
              storageKey: null,
            },
            v4 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: "MarketingCollectionQuery",
              kind: "LinkedField",
              name: "query",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "artistIDs",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v5 /*: any*/,
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
              name: "showHeaderArtworksRail",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "showFeaturedArtists",
              storageKey: null,
            },
            {
              alias: null,
              args: v3 /*: any*/,
              concreteType: "FilterArtworksConnection",
              kind: "LinkedField",
              name: "artworksConnection",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Artist",
                  kind: "LinkedField",
                  name: "merchandisableArtists",
                  plural: true,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "internalID",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "href",
                      storageKey: null,
                    },
                    v5 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "name",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "initials",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "formattedNationalityAndBirthday",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "ArtistCounts",
                      kind: "LinkedField",
                      name: "counts",
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "artworks",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "forSaleArtworks",
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "Artwork",
                      kind: "LinkedField",
                      name: "coverArtwork",
                      plural: false,
                      selections: [
                        {
                          alias: "avatar",
                          args: null,
                          concreteType: "Image",
                          kind: "LinkedField",
                          name: "image",
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: [
                                {
                                  kind: "Literal",
                                  name: "height",
                                  value: 45,
                                },
                                {
                                  kind: "Literal",
                                  name: "width",
                                  value: 45,
                                },
                              ],
                              concreteType: "CroppedImageUrl",
                              kind: "LinkedField",
                              name: "cropped",
                              plural: false,
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  kind: "ScalarField",
                                  name: "src",
                                  storageKey: null,
                                },
                                {
                                  alias: null,
                                  args: null,
                                  kind: "ScalarField",
                                  name: "srcSet",
                                  storageKey: null,
                                },
                              ],
                              storageKey: "cropped(height:45,width:45)",
                            },
                          ],
                          storageKey: null,
                        },
                        v4 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    v4 /*: any*/,
                  ],
                  storageKey: null,
                },
                v4 /*: any*/,
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "0f79c5f093926765695fbad77844b546",
      id: null,
      metadata: {},
      name: "CollectionFeaturedArtistsQuery",
      operationKind: "query",
      text: 'query CollectionFeaturedArtistsQuery(\n  $slug: String!\n  $aggregations: [ArtworkAggregation]\n) {\n  marketingCollection(slug: $slug) {\n    ...CollectionFeaturedArtists_collection\n    artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, first: 20, sort: "-decayed_merch") {\n      ...CollectionFeaturedArtists_artworks\n      id\n    }\n    id\n  }\n}\n\nfragment CollectionFeaturedArtists_artworks on FilterArtworksConnection {\n  merchandisableArtists {\n    ...EntityHeaderArtist_artist\n    internalID\n    name\n    id\n  }\n}\n\nfragment CollectionFeaturedArtists_collection on MarketingCollection {\n  category\n  credit\n  description\n  featuredArtistExclusionIds\n  headerImage\n  id\n  query {\n    artistIDs\n  }\n  slug\n  title\n  showHeaderArtworksRail\n  showFeaturedArtists\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n',
    },
  }
})()
;(node as any).hash = "58e9521ba0fd35c82fd1662321aec59e"

export default node
