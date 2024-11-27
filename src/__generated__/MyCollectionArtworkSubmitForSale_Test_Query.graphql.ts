/**
 * @generated SignedSource<<d84a9c16bb6ca80375bb5be8d4e8f41a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistTargetSupplyPriority = "FALSE" | "TRUE" | "%future added value";
export type MyCollectionArtworkSubmitForSale_Test_Query$variables = Record<PropertyKey, never>;
export type MyCollectionArtworkSubmitForSale_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSubmitForSale_artwork">;
  } | null | undefined;
};
export type MyCollectionArtworkSubmitForSale_Test_Query$rawResponse = {
  readonly artwork: {
    readonly artist: {
      readonly id: string;
      readonly internalID: string;
      readonly slug: string;
      readonly targetSupply: {
        readonly priority: ArtistTargetSupplyPriority | null | undefined;
      };
    } | null | undefined;
    readonly consignmentSubmission: {
      readonly internalID: string | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly internalID: string;
    readonly marketPriceInsights: {
      readonly demandRank: number | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type MyCollectionArtworkSubmitForSale_Test_Query = {
  rawResponse: MyCollectionArtworkSubmitForSale_Test_Query$rawResponse;
  response: MyCollectionArtworkSubmitForSale_Test_Query$data;
  variables: MyCollectionArtworkSubmitForSale_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionArtworkSubmitForSale_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionArtworkSubmitForSale_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionArtworkSubmitForSale_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "shallow",
                "value": true
              }
            ],
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistTargetSupply",
                "kind": "LinkedField",
                "name": "targetSupply",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "priority",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "artist(shallow:true)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkConsignmentSubmission",
            "kind": "LinkedField",
            "name": "consignmentSubmission",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkPriceInsights",
            "kind": "LinkedField",
            "name": "marketPriceInsights",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "demandRank",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "87ff1d8f986f1599cc89fd388edbc9b7",
    "id": null,
    "metadata": {},
    "name": "MyCollectionArtworkSubmitForSale_Test_Query",
    "operationKind": "query",
    "text": "query MyCollectionArtworkSubmitForSale_Test_Query {\n  artwork(id: \"artwork-id\") {\n    ...MyCollectionArtworkSubmitForSale_artwork\n    id\n  }\n}\n\nfragment MyCollectionArtworkSubmitForSale_artwork on Artwork {\n  internalID\n  artist(shallow: true) {\n    internalID\n    slug\n    targetSupply {\n      priority\n    }\n    id\n  }\n  consignmentSubmission {\n    internalID\n  }\n  marketPriceInsights {\n    demandRank\n  }\n}\n"
  }
};
})();

(node as any).hash = "cdad8af3e8fa51c1ec8a4ebfc9acf42d";

export default node;
