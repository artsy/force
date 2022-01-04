/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionRoutes_RegisterQueryVariables = {
    saleID: string;
};
export type auctionRoutes_RegisterQueryResponse = {
    readonly sale: {
        readonly slug: string;
        readonly isAuction: boolean | null;
        readonly isRegistrationClosed: boolean | null;
        readonly isPreview: boolean | null;
        readonly isOpen: boolean | null;
        readonly registrationStatus: {
            readonly qualifiedForBidding: boolean | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"Register_sale">;
    } | null;
    readonly me: {
        readonly hasQualifiedCreditCards: boolean | null;
        readonly " $fragmentRefs": FragmentRefs<"Register_me">;
    } | null;
};
export type auctionRoutes_RegisterQueryRawResponse = {
    readonly sale: ({
        readonly slug: string;
        readonly isAuction: boolean | null;
        readonly isRegistrationClosed: boolean | null;
        readonly isPreview: boolean | null;
        readonly isOpen: boolean | null;
        readonly registrationStatus: ({
            readonly qualifiedForBidding: boolean | null;
            readonly id: string | null;
        }) | null;
        readonly internalID: string;
        readonly status: string | null;
        readonly requireIdentityVerification: boolean | null;
        readonly id: string | null;
    }) | null;
    readonly me: ({
        readonly hasQualifiedCreditCards: boolean | null;
        readonly internalID: string;
        readonly identityVerified: boolean | null;
        readonly id: string | null;
    }) | null;
};
export type auctionRoutes_RegisterQuery = {
    readonly response: auctionRoutes_RegisterQueryResponse;
    readonly variables: auctionRoutes_RegisterQueryVariables;
    readonly rawResponse: auctionRoutes_RegisterQueryRawResponse;
};



/*
query auctionRoutes_RegisterQuery(
  $saleID: String!
) {
  sale(id: $saleID) @principalField {
    slug
    isAuction
    isRegistrationClosed
    isPreview
    isOpen
    registrationStatus {
      qualifiedForBidding
      id
    }
    ...Register_sale
    id
  }
  me {
    hasQualifiedCreditCards
    ...Register_me
    id
  }
}

fragment Register_me on Me {
  internalID
  identityVerified
}

fragment Register_sale on Sale {
  slug
  internalID
  status
  requireIdentityVerification
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "saleID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "saleID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAuction",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isRegistrationClosed",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPreview",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOpen",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "qualifiedForBidding",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasQualifiedCreditCards",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionRoutes_RegisterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "registrationStatus",
            "plural": false,
            "selections": [
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Register_sale"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Register_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "auctionRoutes_RegisterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "registrationStatus",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
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
          (v9/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "identityVerified",
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "auctionRoutes_RegisterQuery",
    "operationKind": "query",
    "text": "query auctionRoutes_RegisterQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) @principalField {\n    slug\n    isAuction\n    isRegistrationClosed\n    isPreview\n    isOpen\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    ...Register_sale\n    id\n  }\n  me {\n    hasQualifiedCreditCards\n    ...Register_me\n    id\n  }\n}\n\nfragment Register_me on Me {\n  internalID\n  identityVerified\n}\n\nfragment Register_sale on Sale {\n  slug\n  internalID\n  status\n  requireIdentityVerification\n}\n"
  }
};
})();
(node as any).hash = '2e36b2d57293f4499d55e0e52d3045e6';
export default node;
