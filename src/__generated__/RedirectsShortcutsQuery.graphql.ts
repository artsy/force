/**
 * @generated SignedSource<<06163617d4b01bd907e7d44af7136e40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RedirectsShortcutsQuery$variables = {
  id: string;
};
export type RedirectsShortcutsQuery$data = {
  readonly shortcut: {
    readonly long: string;
  } | null | undefined;
};
export type RedirectsShortcutsQuery = {
  response: RedirectsShortcutsQuery$data;
  variables: RedirectsShortcutsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "long",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RedirectsShortcutsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Shortcut",
        "kind": "LinkedField",
        "name": "shortcut",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "RedirectsShortcutsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Shortcut",
        "kind": "LinkedField",
        "name": "shortcut",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "cacheID": "2e2efedde085b45ab0c1f9d01c5b5c52",
    "id": null,
    "metadata": {},
    "name": "RedirectsShortcutsQuery",
    "operationKind": "query",
    "text": "query RedirectsShortcutsQuery(\n  $id: ID!\n) {\n  shortcut(id: $id) {\n    long\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0b36c3e62f952385b056ec9f6eb3db09";

export default node;
