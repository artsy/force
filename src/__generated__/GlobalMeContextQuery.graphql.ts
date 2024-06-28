/**
 * @generated SignedSource<<2d40a515a3e818f44ac4ff114162f3f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GlobalMeContextQuery$variables = Record<PropertyKey, never>;
export type GlobalMeContextQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"useCollectorSignals_me">;
  } | null | undefined;
};
export type GlobalMeContextQuery = {
  response: GlobalMeContextQuery$data;
  variables: GlobalMeContextQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
    "name": "GlobalMeContextQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "useCollectorSignals_me"
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
    "name": "GlobalMeContextQuery",
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 100
              }
            ],
            "concreteType": "PartnerOfferToCollectorConnection",
            "kind": "LinkedField",
            "name": "partnerOffersConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerOfferToCollectorEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerOfferToCollector",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artworkId",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endAt",
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "partnerOffersConnection(first:100)"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "09907f42bdef68bd03e1bf71f7b09a27",
    "id": null,
    "metadata": {},
    "name": "GlobalMeContextQuery",
    "operationKind": "query",
    "text": "query GlobalMeContextQuery {\n  me {\n    ...useCollectorSignals_me\n    id\n  }\n}\n\nfragment useCollectorSignals_me on Me {\n  partnerOffersConnection(first: 100) {\n    edges {\n      node {\n        artworkId\n        endAt\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "593f8e2c528c0ef40f5572c1879e7682";

export default node;
