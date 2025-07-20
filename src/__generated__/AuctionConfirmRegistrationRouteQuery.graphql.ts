/**
 * @generated SignedSource<<944bea685fc132a341e765aa3b39cc3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionConfirmRegistrationRouteQuery$variables = Record<PropertyKey, never>;
export type AuctionConfirmRegistrationRouteQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionConfirmRegistrationRoute_me">;
  } | null | undefined;
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionConfirmRegistrationRoute_sale">;
  } | null | undefined;
};
export type AuctionConfirmRegistrationRouteQuery = {
  response: AuctionConfirmRegistrationRouteQuery$data;
  variables: AuctionConfirmRegistrationRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionConfirmRegistrationRouteQuery",
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
        "args": (v0/*: any*/),
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
        "storageKey": "sale(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuctionConfirmRegistrationRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isIdentityVerified",
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
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
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
          (v1/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "381079452b4bac26ac1173b0f2f5cada",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.hasQualifiedCreditCards": (v3/*: any*/),
        "me.id": (v4/*: any*/),
        "me.internalID": (v4/*: any*/),
        "me.isIdentityVerified": (v3/*: any*/),
        "me.phoneNumber": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PhoneNumberType"
        },
        "me.phoneNumber.originalNumber": (v5/*: any*/),
        "sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "sale.bidder": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "sale.bidder.id": (v4/*: any*/),
        "sale.bidder.qualifiedForBidding": (v3/*: any*/),
        "sale.id": (v4/*: any*/),
        "sale.internalID": (v4/*: any*/),
        "sale.isClosed": (v3/*: any*/),
        "sale.isLiveOpen": (v3/*: any*/),
        "sale.name": (v5/*: any*/),
        "sale.requireIdentityVerification": (v3/*: any*/),
        "sale.slug": (v4/*: any*/),
        "sale.status": (v5/*: any*/)
      }
    },
    "name": "AuctionConfirmRegistrationRouteQuery",
    "operationKind": "query",
    "text": "query AuctionConfirmRegistrationRouteQuery {\n  me {\n    ...AuctionConfirmRegistrationRoute_me\n    id\n  }\n  sale(id: \"foo\") {\n    ...AuctionConfirmRegistrationRoute_sale\n    id\n  }\n}\n\nfragment AuctionConfirmRegistrationRoute_me on Me {\n  internalID\n  isIdentityVerified\n  hasQualifiedCreditCards\n  phoneNumber {\n    originalNumber\n  }\n}\n\nfragment AuctionConfirmRegistrationRoute_sale on Sale {\n  slug\n  name\n  internalID\n  status\n  isClosed\n  isLiveOpen\n  requireIdentityVerification\n  bidder {\n    qualifiedForBidding\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5d0fe115da59415ae4063524673cd36d";

export default node;
