/**
 * @generated SignedSource<<cfa79b8d68f6b8ea2d47057c2e4aa270>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SavedSearchAlertNameInputQuery$variables = {};
export type SavedSearchAlertNameInputQuery$data = {
  readonly previewSavedSearch: {
    readonly displayName: string;
  } | null;
};
export type SavedSearchAlertNameInputQuery = {
  response: SavedSearchAlertNameInputQuery$data;
  variables: SavedSearchAlertNameInputQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "attributes",
        "value": {
          "artistIDs": [
            "andy-warhol"
          ],
          "priceRange": "*-35000"
        }
      }
    ],
    "concreteType": "PreviewSavedSearch",
    "kind": "LinkedField",
    "name": "previewSavedSearch",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "displayName",
        "storageKey": null
      }
    ],
    "storageKey": "previewSavedSearch(attributes:{\"artistIDs\":[\"andy-warhol\"],\"priceRange\":\"*-35000\"})"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchAlertNameInputQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SavedSearchAlertNameInputQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "20d4554c6a9ed0a6ff366f2b0110c68a",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertNameInputQuery",
    "operationKind": "query",
    "text": "query SavedSearchAlertNameInputQuery {\n  previewSavedSearch(attributes: {artistIDs: [\"andy-warhol\"], priceRange: \"*-35000\"}) {\n    displayName\n  }\n}\n"
  }
};
})();

(node as any).hash = "20a485d1303bf39e85fe79ba570a0fa4";

export default node;
