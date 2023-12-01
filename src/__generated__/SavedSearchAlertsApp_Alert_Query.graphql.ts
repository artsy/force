/**
 * @generated SignedSource<<a18716ffe9a1de2936016639bbd19841>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SavedSearchAlertsApp_Alert_Query$variables = {
  searchCriteriaID: string;
};
export type SavedSearchAlertsApp_Alert_Query$data = {
  readonly me: {
    readonly savedSearch: {
      readonly artistIDs: ReadonlyArray<string> | null | undefined;
      readonly internalID: string;
      readonly userAlertSettings: {
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
    "name": "searchCriteriaID"
  }
],
v1 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "id",
      "variableName": "searchCriteriaID"
    }
  ],
  "concreteType": "SearchCriteria",
  "kind": "LinkedField",
  "name": "savedSearch",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistIDs",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SavedSearchUserAlertSettings",
      "kind": "LinkedField",
      "name": "userAlertSettings",
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
    }
  ],
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
          (v1/*: any*/)
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "48fca4eb1e2e09efa701f574fe7619cc",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertsApp_Alert_Query",
    "operationKind": "query",
    "text": "query SavedSearchAlertsApp_Alert_Query(\n  $searchCriteriaID: ID!\n) {\n  me {\n    savedSearch(id: $searchCriteriaID) {\n      internalID\n      artistIDs\n      userAlertSettings {\n        name\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3152f9c9bcc26ce920b71cd52732a3d4";

export default node;
