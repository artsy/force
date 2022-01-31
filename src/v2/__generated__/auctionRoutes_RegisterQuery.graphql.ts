/**
 * @generated SignedSource<<9d802ad1e4062865eceb05c3aa246bfe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type auctionRoutes_RegisterQuery$variables = {
  saleID: string;
};
export type auctionRoutes_RegisterQuery$data = {
  readonly sale: {
    readonly slug: string;
    readonly isAuction: boolean | null;
    readonly isRegistrationClosed: boolean | null;
    readonly isPreview: boolean | null;
    readonly isOpen: boolean | null;
    readonly registrationStatus: {
      readonly qualifiedForBidding: boolean | null;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"Register_sale">;
  } | null;
  readonly me: {
    readonly hasQualifiedCreditCards: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"Register_me">;
  } | null;
};
export type auctionRoutes_RegisterQuery$rawResponse = {
  readonly sale: {
    readonly slug: string;
    readonly isAuction: boolean | null;
    readonly isRegistrationClosed: boolean | null;
    readonly isPreview: boolean | null;
    readonly isOpen: boolean | null;
    readonly registrationStatus: {
      readonly qualifiedForBidding: boolean | null;
      readonly id: string;
    } | null;
    readonly internalID: string;
    readonly status: string | null;
    readonly requireIdentityVerification: boolean | null;
    readonly id: string;
  } | null;
  readonly me: {
    readonly hasQualifiedCreditCards: boolean | null;
    readonly internalID: string;
    readonly identityVerified: boolean | null;
    readonly id: string;
  } | null;
};
export type auctionRoutes_RegisterQuery = {
  variables: auctionRoutes_RegisterQuery$variables;
  response: auctionRoutes_RegisterQuery$data;
  rawResponse: auctionRoutes_RegisterQuery$rawResponse;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "saleID"
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
    "type": "Query",
    "abstractKey": null
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
    "cacheID": "f9689b52d0527881de508cb89e470fa4",
    "id": null,
    "metadata": {},
    "name": "auctionRoutes_RegisterQuery",
    "operationKind": "query",
    "text": "query auctionRoutes_RegisterQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) @principalField {\n    slug\n    isAuction\n    isRegistrationClosed\n    isPreview\n    isOpen\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    ...Register_sale\n    id\n  }\n  me {\n    hasQualifiedCreditCards\n    ...Register_me\n    id\n  }\n}\n\nfragment Register_me on Me {\n  internalID\n  identityVerified\n}\n\nfragment Register_sale on Sale {\n  slug\n  internalID\n  status\n  requireIdentityVerification\n}\n"
  }
};
})();

(node as any).hash = "2e36b2d57293f4499d55e0e52d3045e6";

export default node;
