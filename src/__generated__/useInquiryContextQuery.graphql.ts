/**
 * @generated SignedSource<<821fabc5d08e52d716793323a8108942>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useInquiryContextQuery$variables = Record<PropertyKey, never>;
export type useInquiryContextQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"useInquiryContext_me">;
  } | null | undefined;
};
export type useInquiryContextQuery = {
  response: useInquiryContextQuery$data;
  variables: useInquiryContextQuery$variables;
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "postalCode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
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
            "name": "otherRelevantPositions",
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
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              {
                "kind": "Literal",
                "name": "interestType",
                "value": "ARTIST"
              }
            ],
            "concreteType": "UserInterestConnection",
            "kind": "LinkedField",
            "name": "userInterestsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              }
            ],
            "storageKey": "userInterestsConnection(first:1,interestType:\"ARTIST\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CollectorProfileType",
            "kind": "LinkedField",
            "name": "collectorProfile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastUpdatePromptAt",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f9c5f02861a409b0f3118ed353a711a9",
    "id": null,
    "metadata": {},
    "name": "useInquiryContextQuery",
    "operationKind": "query",
    "text": "query useInquiryContextQuery {\n  me {\n    ...useInquiryContext_me\n    id\n  }\n}\n\nfragment useInquiryContext_me on Me {\n  collectorLevel\n  location {\n    city\n    state\n    postalCode\n    country\n    id\n  }\n  otherRelevantPositions\n  profession\n  shareFollows\n  userInterestsConnection(interestType: ARTIST, first: 1) {\n    totalCount\n  }\n  collectorProfile {\n    lastUpdatePromptAt\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "abdeb51f6987f798b5afaae059bfdd57";

export default node;
