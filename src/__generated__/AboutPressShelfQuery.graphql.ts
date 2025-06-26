/**
 * @generated SignedSource<<d1f1a5c321e00901127c09f3930c8730>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AboutPressShelfQuery$variables = Record<PropertyKey, never>;
export type AboutPressShelfQuery$data = {
  readonly page: {
    readonly content: string | null | undefined;
  };
};
export type AboutPressShelfQuery = {
  response: AboutPressShelfQuery$data;
  variables: AboutPressShelfQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "in-the-media"
  }
],
v1 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "MARKDOWN"
    }
  ],
  "kind": "ScalarField",
  "name": "content",
  "storageKey": "content(format:\"MARKDOWN\")"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AboutPressShelfQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": "page(id:\"in-the-media\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AboutPressShelfQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
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
        "storageKey": "page(id:\"in-the-media\")"
      }
    ]
  },
  "params": {
    "cacheID": "f449d556059d037ed7f02bbb040a96c9",
    "id": null,
    "metadata": {},
    "name": "AboutPressShelfQuery",
    "operationKind": "query",
    "text": "query AboutPressShelfQuery {\n  page(id: \"in-the-media\") {\n    content(format: MARKDOWN)\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fe98544c8eadfd72cb97ac73f3a2d464";

export default node;
