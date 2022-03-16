/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useRefreshUserDataQueryVariables = {};
export type useRefreshUserDataQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionBidRoute_me">;
    } | null;
};
export type useRefreshUserDataQuery = {
    readonly response: useRefreshUserDataQueryResponse;
    readonly variables: useRefreshUserDataQueryVariables;
};



/*
query useRefreshUserDataQuery {
  me {
    ...AuctionBidRoute_me
    id
  }
}

fragment AuctionBidRoute_me on Me {
  internalID
  hasQualifiedCreditCards
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useRefreshUserDataQuery",
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
            "name": "AuctionBidRoute_me"
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
    "name": "useRefreshUserDataQuery",
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
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasQualifiedCreditCards",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "37da86cc057552e5bc68d8f8f554a780",
    "id": null,
    "metadata": {},
    "name": "useRefreshUserDataQuery",
    "operationKind": "query",
    "text": "query useRefreshUserDataQuery {\n  me {\n    ...AuctionBidRoute_me\n    id\n  }\n}\n\nfragment AuctionBidRoute_me on Me {\n  internalID\n  hasQualifiedCreditCards\n}\n"
  }
};
(node as any).hash = '43aae92130e1a27bccb0a9451b12d83b';
export default node;
