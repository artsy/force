/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2ConfirmRegistrationRouteTestQueryVariables = {};
export type Auction2ConfirmRegistrationRouteTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2ConfirmRegistrationRoute_me">;
    } | null;
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2ConfirmRegistrationRoute_sale">;
    } | null;
};
export type Auction2ConfirmRegistrationRouteTestQuery = {
    readonly response: Auction2ConfirmRegistrationRouteTestQueryResponse;
    readonly variables: Auction2ConfirmRegistrationRouteTestQueryVariables;
};



/*
query Auction2ConfirmRegistrationRouteTestQuery {
  me {
    ...Auction2ConfirmRegistrationRoute_me
    id
  }
  sale(id: "foo") {
    ...Auction2ConfirmRegistrationRoute_sale
    id
  }
}

fragment Auction2ConfirmRegistrationRoute_me on Me {
  internalID
  identityVerified
  hasQualifiedCreditCards
}

fragment Auction2ConfirmRegistrationRoute_sale on Sale {
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
    "name": "Auction2ConfirmRegistrationRouteTestQuery",
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
            "name": "Auction2ConfirmRegistrationRoute_me"
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
            "name": "Auction2ConfirmRegistrationRoute_sale"
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
    "name": "Auction2ConfirmRegistrationRouteTestQuery",
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
    "cacheID": "57754a404dd7f1b97f5acb0e554b0c04",
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
        "me.identityVerified": (v3/*: any*/),
        "me.internalID": (v4/*: any*/),
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
    "name": "Auction2ConfirmRegistrationRouteTestQuery",
    "operationKind": "query",
    "text": "query Auction2ConfirmRegistrationRouteTestQuery {\n  me {\n    ...Auction2ConfirmRegistrationRoute_me\n    id\n  }\n  sale(id: \"foo\") {\n    ...Auction2ConfirmRegistrationRoute_sale\n    id\n  }\n}\n\nfragment Auction2ConfirmRegistrationRoute_me on Me {\n  internalID\n  identityVerified\n  hasQualifiedCreditCards\n}\n\nfragment Auction2ConfirmRegistrationRoute_sale on Sale {\n  slug\n  name\n  internalID\n  status\n  isClosed\n  isLiveOpen\n  requireIdentityVerification\n  bidder {\n    qualifiedForBidding\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '86887c1636b2d44047d261b41712aaef';
export default node;
