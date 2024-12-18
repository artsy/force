/**
 * @generated SignedSource<<1a9e7612d4eb5d3490b8621f3b9098f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type CollectionsHubRailsQuery$variables = {
  slug: string
}
export type CollectionsHubRailsQuery$data = {
  readonly marketingCollection:
    | {
        readonly linkedCollections: ReadonlyArray<{
          readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubRails_linkedCollections">
        }>
      }
    | null
    | undefined
}
export type CollectionsHubRailsQuery = {
  response: CollectionsHubRailsQuery$data
  variables: CollectionsHubRailsQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "slug",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "slug",
        variableName: "slug",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "src",
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "srcSet",
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "width",
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "height",
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "internalID",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "CollectionsHubRailsQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "MarketingCollection",
          kind: "LinkedField",
          name: "marketingCollection",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "MarketingCollectionGroup",
              kind: "LinkedField",
              name: "linkedCollections",
              plural: true,
              selections: [
                {
                  args: null,
                  kind: "FragmentSpread",
                  name: "CollectionsHubRails_linkedCollections",
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
      name: "CollectionsHubRailsQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "MarketingCollection",
          kind: "LinkedField",
          name: "marketingCollection",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "MarketingCollectionGroup",
              kind: "LinkedField",
              name: "linkedCollections",
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "groupType",
                  storageKey: null,
                },
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: "MarketingCollection",
                  kind: "LinkedField",
                  name: "members",
                  plural: true,
                  selections: [
                    v3 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "slug",
                      storageKey: null,
                    },
                    v4 /*: any*/,
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
                      name: "priceGuidance",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "Image",
                      kind: "LinkedField",
                      name: "thumbnailImage",
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: [
                            {
                              kind: "Literal",
                              name: "height",
                              value: 244,
                            },
                            {
                              kind: "Literal",
                              name: "width",
                              value: 325,
                            },
                          ],
                          concreteType: "CroppedImageUrl",
                          kind: "LinkedField",
                          name: "cropped",
                          plural: false,
                          selections: [
                            v5 /*: any*/,
                            v6 /*: any*/,
                            v7 /*: any*/,
                            v8 /*: any*/,
                          ],
                          storageKey: "cropped(height:244,width:325)",
                        },
                      ],
                      storageKey: null,
                    },
                    v9 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "thumbnail",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "headerImage",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: [
                        {
                          kind: "Literal",
                          name: "aggregations",
                          value: ["TOTAL"],
                        },
                        {
                          kind: "Literal",
                          name: "first",
                          value: 3,
                        },
                        {
                          kind: "Literal",
                          name: "sort",
                          value: "-decayed_merch",
                        },
                      ],
                      concreteType: "FilterArtworksConnection",
                      kind: "LinkedField",
                      name: "artworksConnection",
                      plural: false,
                      selections: [
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
                                v9 /*: any*/,
                                {
                                  alias: null,
                                  args: [
                                    {
                                      kind: "Literal",
                                      name: "shallow",
                                      value: true,
                                    },
                                  ],
                                  concreteType: "Artist",
                                  kind: "LinkedField",
                                  name: "artist",
                                  plural: false,
                                  selections: [v2 /*: any*/, v3 /*: any*/],
                                  storageKey: "artist(shallow:true)",
                                },
                                v4 /*: any*/,
                                {
                                  alias: null,
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
                                          value: 150,
                                        },
                                        {
                                          kind: "Literal",
                                          name: "width",
                                          value: 150,
                                        },
                                      ],
                                      concreteType: "ResizedImageUrl",
                                      kind: "LinkedField",
                                      name: "resized",
                                      plural: false,
                                      selections: [
                                        v7 /*: any*/,
                                        v8 /*: any*/,
                                        v5 /*: any*/,
                                        v6 /*: any*/,
                                      ],
                                      storageKey:
                                        "resized(height:150,width:150)",
                                    },
                                  ],
                                  storageKey: null,
                                },
                                v3 /*: any*/,
                              ],
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                        v3 /*: any*/,
                      ],
                      storageKey:
                        'artworksConnection(aggregations:["TOTAL"],first:3,sort:"-decayed_merch")',
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v3 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "48a15cadece85a159760e99ed62aa156",
      id: null,
      metadata: {},
      name: "CollectionsHubRailsQuery",
      operationKind: "query",
      text: 'query CollectionsHubRailsQuery(\n  $slug: String!\n) {\n  marketingCollection(slug: $slug) {\n    linkedCollections {\n      ...CollectionsHubRails_linkedCollections\n    }\n    id\n  }\n}\n\nfragment ArtistSeriesEntity_member on MarketingCollection {\n  id\n  slug\n  headerImage\n  thumbnail\n  title\n  priceGuidance\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {\n    edges {\n      node {\n        internalID\n        artist(shallow: true) {\n          name\n          id\n        }\n        title\n        image {\n          resized(width: 150, height: 150) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    slug\n    ...ArtistSeriesEntity_member\n    id\n  }\n}\n\nfragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {\n  groupType\n  ...FeaturedCollectionsRails_collectionGroup\n  ...OtherCollectionsRail_collectionGroup\n  ...ArtistSeriesRail_collectionGroup\n}\n\nfragment FeaturedCollectionRailEntity_member on MarketingCollection {\n  id\n  slug\n  title\n  description\n  priceGuidance\n  thumbnailImage {\n    cropped(width: 325, height: 244) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...FeaturedCollectionRailEntity_member\n    internalID\n    id\n  }\n}\n\nfragment OtherCollectionEntity_member on MarketingCollection {\n  id\n  slug\n  thumbnail\n  title\n}\n\nfragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...OtherCollectionEntity_member\n    id\n  }\n}\n',
    },
  }
})()
;(node as any).hash = "d17d80a9b90246306415018a5a086e3a"

export default node
