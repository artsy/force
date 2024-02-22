/**
 * @generated SignedSource<<32b06feea6bd77ed950333fb37cd1cbe>>
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
      readonly internalID: string;
      readonly settings: {
        readonly name: string | null | undefined;
      };
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
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "AlertSettings",
  "kind": "LinkedField",
  "name": "settings",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
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
              (v4/*: any*/)
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
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4782c640d6aaeada6c04914b18ff7a3a",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertsApp_Alert_Query",
    "operationKind": "query",
    "text": "query SavedSearchAlertsApp_Alert_Query(\n  $alertID: String!\n) {\n  me {\n    alert(id: $alertID) {\n      internalID\n      artistIDs\n      settings {\n        name\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bddc8eb33c85689d519ba4151cd04187";

export default node;
