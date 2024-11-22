/**
 * @generated SignedSource<<9353aa75be833a2a22db6b71d3dfd3a6>>
 * @relayHash 5f93d561466837d7b5cb526e2f0d4caf
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5f93d561466837d7b5cb526e2f0d4caf

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PageApp_Test_Query$variables = Record<PropertyKey, never>;
export type PageApp_Test_Query$data = {
  readonly page: {
    readonly " $fragmentSpreads": FragmentRefs<"PageApp_page">;
  };
};
export type PageApp_Test_Query = {
  response: PageApp_Test_Query$data;
  variables: PageApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PageApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PageApp_page"
          }
        ],
        "storageKey": "page(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PageApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
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
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "content",
            "storageKey": "content(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "published",
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
        "storageKey": "page(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": "5f93d561466837d7b5cb526e2f0d4caf",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "page": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Page"
        },
        "page.content": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "page.id": (v1/*: any*/),
        "page.internalID": (v1/*: any*/),
        "page.name": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "page.published": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        }
      }
    },
    "name": "PageApp_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fb8c6643c53847e5ba946f1ce0a0205c";

export default node;
