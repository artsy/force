/**
 * @generated SignedSource<<5547f08ccbad9c710f3ddf3ca5d14760>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsPage_Test_Query$variables = Record<PropertyKey, never>;
export type Order2DetailsPage_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsPage_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsPage_Test_Query$rawResponse = {
  readonly me: {
    readonly id: string;
    readonly order: {
      readonly code: string;
      readonly displayTexts: {
        readonly message: string | null | undefined;
        readonly title: string;
      };
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsPage_Test_Query = {
  rawResponse: Order2DetailsPage_Test_Query$rawResponse;
  response: Order2DetailsPage_Test_Query$data;
  variables: Order2DetailsPage_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
  }
],
v1 = {
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
    "name": "Order2DetailsPage_Test_Query",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2DetailsPage_order"
              }
            ],
            "storageKey": "order(id:\"123\")"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Order2DetailsPage_Test_Query",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "code",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "DisplayTexts",
                "kind": "LinkedField",
                "name": "displayTexts",
                "plural": false,
                "selections": [
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
                    "name": "message",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"123\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ffc71040de61e36fb3cc2d6e595a613c",
    "id": null,
    "metadata": {},
    "name": "Order2DetailsPage_Test_Query",
    "operationKind": "query",
    "text": "query Order2DetailsPage_Test_Query {\n  me {\n    order(id: \"123\") {\n      ...Order2DetailsPage_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DetailsHeader_order on Order {\n  code\n  displayTexts {\n    title\n  }\n}\n\nfragment Order2DetailsMessage_order on Order {\n  displayTexts {\n    message\n  }\n}\n\nfragment Order2DetailsPage_order on Order {\n  ...Order2DetailsHeader_order\n  ...Order2DetailsMessage_order\n}\n"
  }
};
})();

(node as any).hash = "b68af50676405f31177c883fe9ef437a";

export default node;
