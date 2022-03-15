/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useRefreshUserDataQueryVariables = {};
export type useRefreshUserDataQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2BidRoute_me">;
    } | null;
};
export type useRefreshUserDataQuery = {
    readonly response: useRefreshUserDataQueryResponse;
    readonly variables: useRefreshUserDataQueryVariables;
};



/*
query useRefreshUserDataQuery {
  me {
    ...Auction2BidRoute_me
    id
  }
}

fragment Auction2BidRoute_me on Me {
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
            "name": "Auction2BidRoute_me"
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
    "cacheID": "c6ac5618feb5983f599b96580c5c2ed8",
    "id": null,
    "metadata": {},
    "name": "useRefreshUserDataQuery",
    "operationKind": "query",
    "text": "query useRefreshUserDataQuery {\n  me {\n    ...Auction2BidRoute_me\n    id\n  }\n}\n\nfragment Auction2BidRoute_me on Me {\n  internalID\n  hasQualifiedCreditCards\n}\n"
  }
};
(node as any).hash = '2f85f96d4d43f4ca16183723b292b548';
export default node;
