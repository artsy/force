/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionRoutes_ConfirmRegistrationRouteQueryVariables = {
    slug: string;
};
export type auctionRoutes_ConfirmRegistrationRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionConfirmRegistrationRoute_me">;
    } | null;
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionConfirmRegistrationRoute_sale">;
    } | null;
};
export type auctionRoutes_ConfirmRegistrationRouteQuery = {
    readonly response: auctionRoutes_ConfirmRegistrationRouteQueryResponse;
    readonly variables: auctionRoutes_ConfirmRegistrationRouteQueryVariables;
};



/*
query auctionRoutes_ConfirmRegistrationRouteQuery(
  $slug: String!
) {
  me {
    ...AuctionConfirmRegistrationRoute_me
    id
  }
  sale(id: $slug) @principalField {
    ...AuctionConfirmRegistrationRoute_sale
    id
  }
}

fragment AuctionConfirmRegistrationRoute_me on Me {
  internalID
  identityVerified
  hasQualifiedCreditCards
  phoneNumber {
    originalNumber
  }
}

fragment AuctionConfirmRegistrationRoute_sale on Sale {
  slug
  name
  internalID
  status
  isClosed
  isLiveOpen
  requireIdentityVerification
  bidder {
    qualifiedForBidding
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionRoutes_ConfirmRegistrationRouteQuery",
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
            "name": "AuctionConfirmRegistrationRoute_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionConfirmRegistrationRoute_sale"
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
    "name": "auctionRoutes_ConfirmRegistrationRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "identityVerified",
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
            "concreteType": "PhoneNumberType",
            "kind": "LinkedField",
            "name": "phoneNumber",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "originalNumber",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isClosed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isLiveOpen",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "requireIdentityVerification",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidder",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "qualifiedForBidding",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "48421e72673d81723c79485421121572",
    "id": null,
    "metadata": {},
    "name": "auctionRoutes_ConfirmRegistrationRouteQuery",
    "operationKind": "query",
    "text": "query auctionRoutes_ConfirmRegistrationRouteQuery(\n  $slug: String!\n) {\n  me {\n    ...AuctionConfirmRegistrationRoute_me\n    id\n  }\n  sale(id: $slug) @principalField {\n    ...AuctionConfirmRegistrationRoute_sale\n    id\n  }\n}\n\nfragment AuctionConfirmRegistrationRoute_me on Me {\n  internalID\n  identityVerified\n  hasQualifiedCreditCards\n  phoneNumber {\n    originalNumber\n  }\n}\n\nfragment AuctionConfirmRegistrationRoute_sale on Sale {\n  slug\n  name\n  internalID\n  status\n  isClosed\n  isLiveOpen\n  requireIdentityVerification\n  bidder {\n    qualifiedForBidding\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '9da61080e7b4edf8b1e25aa8110ad72f';
export default node;
