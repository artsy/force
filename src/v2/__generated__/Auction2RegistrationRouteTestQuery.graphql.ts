/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2RegistrationRouteTestQueryVariables = {};
export type Auction2RegistrationRouteTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2RegistrationRoute_me">;
    } | null;
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2RegistrationRoute_sale">;
    } | null;
};
export type Auction2RegistrationRouteTestQuery = {
    readonly response: Auction2RegistrationRouteTestQueryResponse;
    readonly variables: Auction2RegistrationRouteTestQueryVariables;
};



/*
query Auction2RegistrationRouteTestQuery {
  me {
    ...Auction2RegistrationRoute_me
    id
  }
  sale(id: "foo") {
    ...Auction2RegistrationRoute_sale
    id
  }
}

fragment Auction2RegistrationRoute_me on Me {
  internalID
  identityVerified
}

fragment Auction2RegistrationRoute_sale on Sale {
  slug
  name
  internalID
  status
  requireIdentityVerification
  isClosed
  isLiveOpen
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
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
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
    "name": "Auction2RegistrationRouteTestQuery",
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
            "name": "Auction2RegistrationRoute_me"
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
            "name": "Auction2RegistrationRoute_sale"
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
    "name": "Auction2RegistrationRouteTestQuery",
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
            "name": "requireIdentityVerification",
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
    "cacheID": "bd6688796d80da1399177589d2f0deae",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v3/*: any*/),
        "me.identityVerified": (v4/*: any*/),
        "me.internalID": (v3/*: any*/),
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
        "sale.bidder.id": (v3/*: any*/),
        "sale.bidder.qualifiedForBidding": (v4/*: any*/),
        "sale.id": (v3/*: any*/),
        "sale.internalID": (v3/*: any*/),
        "sale.isClosed": (v4/*: any*/),
        "sale.isLiveOpen": (v4/*: any*/),
        "sale.name": (v5/*: any*/),
        "sale.requireIdentityVerification": (v4/*: any*/),
        "sale.slug": (v3/*: any*/),
        "sale.status": (v5/*: any*/)
      }
    },
    "name": "Auction2RegistrationRouteTestQuery",
    "operationKind": "query",
    "text": "query Auction2RegistrationRouteTestQuery {\n  me {\n    ...Auction2RegistrationRoute_me\n    id\n  }\n  sale(id: \"foo\") {\n    ...Auction2RegistrationRoute_sale\n    id\n  }\n}\n\nfragment Auction2RegistrationRoute_me on Me {\n  internalID\n  identityVerified\n}\n\nfragment Auction2RegistrationRoute_sale on Sale {\n  slug\n  name\n  internalID\n  status\n  requireIdentityVerification\n  isClosed\n  isLiveOpen\n  bidder {\n    qualifiedForBidding\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e1a54c3eda0bdb2368f4f6e098346b0c';
export default node;
