/**
 * @generated SignedSource<<b0cf1ee3eb2b82f608d43cae9ca84b4c>>
 * @relayHash b21c427347731dd46b812f2a087622e3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b21c427347731dd46b812f2a087622e3

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectRoutes_ArtworkFilterQuery$variables = Record<PropertyKey, never>;
export type collectRoutes_ArtworkFilterQuery$data = {
  readonly marketingCollections: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Collect_marketingCollections">;
  }>;
};
export type collectRoutes_ArtworkFilterQuery = {
  response: collectRoutes_ArtworkFilterQuery$data;
  variables: collectRoutes_ArtworkFilterQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "slugs",
    "value": [
      "contemporary",
      "painting",
      "street-art",
      "photography",
      "emerging-art",
      "20th-century-art"
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "collectRoutes_ArtworkFilterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollections",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Collect_marketingCollections"
          }
        ],
        "storageKey": "marketingCollections(slugs:[\"contemporary\",\"painting\",\"street-art\",\"photography\",\"emerging-art\",\"20th-century-art\"])"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "collectRoutes_ArtworkFilterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollections",
        "plural": true,
        "selections": [
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
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "thumbnail",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "marketingCollections(slugs:[\"contemporary\",\"painting\",\"street-art\",\"photography\",\"emerging-art\",\"20th-century-art\"])"
      }
    ]
  },
  "params": {
    "id": "b21c427347731dd46b812f2a087622e3",
    "metadata": {},
    "name": "collectRoutes_ArtworkFilterQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "993a2dc7cffc255512c7a37f83686348";

export default node;
