/**
 * @generated SignedSource<<bd42a90da64d2b1af275d0497a8a0772>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type order2Routes_DetailsQuery$variables = {
  orderID: string;
};
export type order2Routes_DetailsQuery$data = {
  readonly viewer: {
    readonly me: {
      readonly order: {
        readonly internalID: string;
        readonly mode: OrderModeEnum;
      } | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsRoute_viewer">;
  } | null | undefined;
};
export type order2Routes_DetailsQuery = {
  response: order2Routes_DetailsQuery$data;
  variables: order2Routes_DetailsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID"
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
  "name": "mode",
  "storageKey": null
},
v4 = {
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
    "name": "order2Routes_DetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "orderID",
                "variableName": "orderID"
              }
            ],
            "kind": "FragmentSpread",
            "name": "Order2DetailsRoute_viewer"
          },
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
                "concreteType": "Order",
                "kind": "LinkedField",
                "name": "order",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
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
    "name": "order2Routes_DetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
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
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "12ea1257a0d04fdaa567bb12affe47ac",
    "id": null,
    "metadata": {},
    "name": "order2Routes_DetailsQuery",
    "operationKind": "query",
    "text": "query order2Routes_DetailsQuery(\n  $orderID: String!\n) {\n  viewer {\n    ...Order2DetailsRoute_viewer_3HPek8\n    me {\n      order(id: $orderID) {\n        internalID\n        mode\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment Order2DetailsHeader_order on Order {\n  code\n  displayTexts {\n    title\n  }\n}\n\nfragment Order2DetailsMessage_order on Order {\n  displayTexts {\n    message\n  }\n}\n\nfragment Order2DetailsPage_order on Order {\n  ...Order2DetailsHeader_order\n  ...Order2DetailsMessage_order\n}\n\nfragment Order2DetailsRoute_viewer_3HPek8 on Viewer {\n  me {\n    order(id: $orderID) {\n      ...Order2DetailsPage_order\n      internalID\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "22bf40218da5d62cf30cd9ce83538d6b";

export default node;
