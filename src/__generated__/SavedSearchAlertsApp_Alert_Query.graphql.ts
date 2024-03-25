/**
 * @generated SignedSource<<e39a2fc0411330f2e0007f06a0066b17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SavedSearchAlertsApp_Alert_Query$variables = {
  alertID: string;
};
export type SavedSearchAlertsApp_Alert_Query$data = {
  readonly me: {
    readonly alert: {
      readonly artistIDs: ReadonlyArray<string | null | undefined> | null | undefined;
      readonly artworksConnection: {
        readonly counts: {
          readonly total: any | null | undefined;
        } | null | undefined;
      } | null | undefined;
      readonly internalID: string;
      readonly subtitle: string;
      readonly title: string;
    } | null | undefined;
  } | null | undefined;
};
export type SavedSearchAlertsApp_Alert_Query = {
  response: SavedSearchAlertsApp_Alert_Query$data;
  variables: SavedSearchAlertsApp_Alert_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "alertID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "alertID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistIDs",
  "storageKey": null
},
v4 = [
  "artistIDs"
],
v5 = {
  "alias": "title",
  "args": [
    {
      "kind": "Literal",
      "name": "only",
      "value": (v4/*: any*/)
    }
  ],
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": "displayName(only:[\"artistIDs\"])"
},
v6 = {
  "alias": "subtitle",
  "args": [
    {
      "kind": "Literal",
      "name": "except",
      "value": (v4/*: any*/)
    }
  ],
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": "displayName(except:[\"artistIDs\"])"
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "FilterArtworksCounts",
  "kind": "LinkedField",
  "name": "counts",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "total",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchAlertsApp_Alert_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Alert",
            "kind": "LinkedField",
            "name": "alert",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "FilterArtworksConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
                  (v8/*: any*/)
                ],
                "storageKey": "artworksConnection(first:1)"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SavedSearchAlertsApp_Alert_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Alert",
            "kind": "LinkedField",
            "name": "alert",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "FilterArtworksConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": "artworksConnection(first:1)"
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "49202e5f880c7ed9962a0739460ca0bf",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertsApp_Alert_Query",
    "operationKind": "query",
    "text": "query SavedSearchAlertsApp_Alert_Query(\n  $alertID: String!\n) {\n  me {\n    alert(id: $alertID) {\n      internalID\n      artistIDs\n      title: displayName(only: [artistIDs])\n      subtitle: displayName(except: [artistIDs])\n      artworksConnection(first: 1) {\n        counts {\n          total\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5b88cfa50f696b25465ab2196d3c2fd0";

export default node;
