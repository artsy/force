/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auction2Routes_ConfirmRegistrationRouteQueryVariables = {
    slug: string;
};
export type auction2Routes_ConfirmRegistrationRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2ConfirmRegistrationRoute_me">;
    } | null;
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2ConfirmRegistrationRoute_sale">;
    } | null;
};
export type auction2Routes_ConfirmRegistrationRouteQuery = {
    readonly response: auction2Routes_ConfirmRegistrationRouteQueryResponse;
    readonly variables: auction2Routes_ConfirmRegistrationRouteQueryVariables;
};



/*
query auction2Routes_ConfirmRegistrationRouteQuery(
  $slug: String!
) {
  me {
    ...Auction2ConfirmRegistrationRoute_me
    id
  }
  sale(id: $slug) @principalField {
    ...Auction2ConfirmRegistrationRoute_sale
    id
  }
}

fragment Auction2ConfirmRegistrationRoute_me on Me {
  internalID
  identityVerified
}

fragment Auction2ConfirmRegistrationRoute_sale on Sale {
  slug
  name
  internalID
  status
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
    "name": "auction2Routes_ConfirmRegistrationRouteQuery",
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
        "args": (v1/*: any*/),
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
    "name": "auction2Routes_ConfirmRegistrationRouteQuery",
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
    "cacheID": "96a19bd6306dce0f0e6ed8f2849b33b3",
    "id": null,
    "metadata": {},
    "name": "auction2Routes_ConfirmRegistrationRouteQuery",
    "operationKind": "query",
    "text": "query auction2Routes_ConfirmRegistrationRouteQuery(\n  $slug: String!\n) {\n  me {\n    ...Auction2ConfirmRegistrationRoute_me\n    id\n  }\n  sale(id: $slug) @principalField {\n    ...Auction2ConfirmRegistrationRoute_sale\n    id\n  }\n}\n\nfragment Auction2ConfirmRegistrationRoute_me on Me {\n  internalID\n  identityVerified\n}\n\nfragment Auction2ConfirmRegistrationRoute_sale on Sale {\n  slug\n  name\n  internalID\n  status\n  requireIdentityVerification\n  bidder {\n    qualifiedForBidding\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '595ad735b5af883197d056238e567e1a';
export default node;
