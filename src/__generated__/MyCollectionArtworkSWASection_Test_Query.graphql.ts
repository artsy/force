/**
 * @generated SignedSource<<871b0e01969adf31363b44ec360b9f1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSWASection_Test_Query$variables = Record<PropertyKey, never>;
export type MyCollectionArtworkSWASection_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSWASection_artwork">;
  } | null | undefined;
};
export type MyCollectionArtworkSWASection_Test_Query$rawResponse = {
  readonly artwork: {
    readonly artist: {
      readonly id: string;
      readonly internalID: string;
      readonly slug: string;
    } | null | undefined;
    readonly consignmentSubmission: {
      readonly internalID: string | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly internalID: string;
  } | null | undefined;
};
export type MyCollectionArtworkSWASection_Test_Query = {
  rawResponse: MyCollectionArtworkSWASection_Test_Query$rawResponse;
  response: MyCollectionArtworkSWASection_Test_Query$data;
  variables: MyCollectionArtworkSWASection_Test_Query$variables;
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
    "name": "MyCollectionArtworkSWASection_Test_Query",
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
            "name": "MyCollectionArtworkSWASection_artwork"
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
    "name": "MyCollectionArtworkSWASection_Test_Query",
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
            "args": null,
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
              (v2/*: any*/)
            ],
            "storageKey": null
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
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "6790b277252c4de5378a94f04a174c5b",
    "id": null,
    "metadata": {},
    "name": "MyCollectionArtworkSWASection_Test_Query",
    "operationKind": "query",
    "text": "query MyCollectionArtworkSWASection_Test_Query {\n  artwork(id: \"artwork-id\") {\n    ...MyCollectionArtworkSWASection_artwork\n    id\n  }\n}\n\nfragment MyCollectionArtworkSWASection_artwork on Artwork {\n  internalID\n  artist {\n    internalID\n    slug\n    id\n  }\n  consignmentSubmission {\n    internalID\n  }\n}\n"
  }
};
})();

(node as any).hash = "954b24e31e85c83862ac93f3a699cc9c";

export default node;
