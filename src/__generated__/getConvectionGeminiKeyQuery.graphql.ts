/**
 * @generated SignedSource<<42dcbe7ee743922776511896d1e58505>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type getConvectionGeminiKeyQuery$variables = Record<PropertyKey, never>;
export type getConvectionGeminiKeyQuery$data = {
  readonly system: {
    readonly services: {
      readonly convection: {
        readonly geminiTemplateKey: string;
      };
    } | null | undefined;
  } | null | undefined;
};
export type getConvectionGeminiKeyQuery = {
  response: getConvectionGeminiKeyQuery$data;
  variables: getConvectionGeminiKeyQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "System",
    "kind": "LinkedField",
    "name": "system",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Services",
        "kind": "LinkedField",
        "name": "services",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConvectionService",
            "kind": "LinkedField",
            "name": "convection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "geminiTemplateKey",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "getConvectionGeminiKeyQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "getConvectionGeminiKeyQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d2759d79e2c03e7a4f20054093419f41",
    "id": null,
    "metadata": {},
    "name": "getConvectionGeminiKeyQuery",
    "operationKind": "query",
    "text": "query getConvectionGeminiKeyQuery {\n  system {\n    services {\n      convection {\n        geminiTemplateKey\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a7ffae2e10d304400de8792a31ce20ff";

export default node;
