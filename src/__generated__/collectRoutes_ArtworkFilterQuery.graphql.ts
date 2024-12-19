/**
 * @generated SignedSource<<53fd146381976e3965a9fe9f7c7c298f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type collectRoutes_ArtworkFilterQuery$variables = Record<
  PropertyKey,
  never
>
export type collectRoutes_ArtworkFilterQuery$data = {
  readonly marketingCollections: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Collect_marketingCollections">
  }>
}
export type collectRoutes_ArtworkFilterQuery = {
  response: collectRoutes_ArtworkFilterQuery$data
  variables: collectRoutes_ArtworkFilterQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      kind: "Literal",
      name: "slugs",
      value: [
        "contemporary",
        "painting",
        "street-art",
        "photography",
        "emerging-art",
        "20th-century-art",
      ],
    },
  ]
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "collectRoutes_ArtworkFilterQuery",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: "MarketingCollection",
          kind: "LinkedField",
          name: "marketingCollections",
          plural: true,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "Collect_marketingCollections",
            },
          ],
          storageKey:
            'marketingCollections(slugs:["contemporary","painting","street-art","photography","emerging-art","20th-century-art"])',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "collectRoutes_ArtworkFilterQuery",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: "MarketingCollection",
          kind: "LinkedField",
          name: "marketingCollections",
          plural: true,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "slug",
              storageKey: null,
            },
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
              name: "thumbnail",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey:
            'marketingCollections(slugs:["contemporary","painting","street-art","photography","emerging-art","20th-century-art"])',
        },
      ],
    },
    params: {
      cacheID: "b21c427347731dd46b812f2a087622e3",
      id: null,
      metadata: {},
      name: "collectRoutes_ArtworkFilterQuery",
      operationKind: "query",
      text: 'query collectRoutes_ArtworkFilterQuery {\n  marketingCollections(slugs: ["contemporary", "painting", "street-art", "photography", "emerging-art", "20th-century-art"]) {\n    ...Collect_marketingCollections\n    id\n  }\n}\n\nfragment Collect_marketingCollections on MarketingCollection {\n  ...CollectionsHubsNav_marketingCollections\n}\n\nfragment CollectionsHubsNav_marketingCollections on MarketingCollection {\n  slug\n  title\n  thumbnail\n}\n',
    },
  }
})()

;(node as any).hash = "993a2dc7cffc255512c7a37f83686348"

export default node
