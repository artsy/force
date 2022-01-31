/**
 * @generated SignedSource<<ed4fefd5fb2a10b60a5e94d6e2c68ce4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useInquiryContextQuery$variables = {};
export type useInquiryContextQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"useInquiryContext_me">;
  } | null;
};
export type useInquiryContextQuery = {
  variables: useInquiryContextQuery$variables;
  response: useInquiryContextQuery$data;
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
    "name": "useInquiryContextQuery",
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
            "name": "useInquiryContext_me"
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
    "name": "useInquiryContextQuery",
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
            "args": null,
            "kind": "ScalarField",
            "name": "collectorLevel",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "profession",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shareFollows",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2879f4614eb61ed0475a21159c962f1c",
    "id": null,
    "metadata": {},
    "name": "useInquiryContextQuery",
    "operationKind": "query",
    "text": "query useInquiryContextQuery {\n  me {\n    ...useInquiryContext_me\n    id\n  }\n}\n\nfragment useInquiryContext_me on Me {\n  collectorLevel\n  location {\n    city\n    id\n  }\n  phone\n  profession\n  shareFollows\n}\n"
  }
};
})();

(node as any).hash = "abdeb51f6987f798b5afaae059bfdd57";

export default node;
