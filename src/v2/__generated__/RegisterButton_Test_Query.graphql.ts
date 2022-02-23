/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RegisterButton_Test_QueryVariables = {};
export type RegisterButton_Test_QueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"RegisterButton_sale">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"RegisterButton_me">;
    } | null;
};
export type RegisterButton_Test_Query = {
    readonly response: RegisterButton_Test_QueryResponse;
    readonly variables: RegisterButton_Test_QueryVariables;
};



/*
query RegisterButton_Test_Query {
  sale(id: "foo") {
    ...RegisterButton_sale
    id
  }
  me {
    ...RegisterButton_me
    id
  }
}

fragment RegisterButton_me on Me {
  identityVerified
  hasCreditCards
  pendingIdentityVerification {
    internalID
    id
  }
}

fragment RegisterButton_sale on Sale {
  bidder {
    qualifiedForBidding
    id
  }
  isAuction
  isClosed
  isLiveOpen
  isRegistrationClosed
  liveURLIfOpen
  requireIdentityVerification
  registrationStatus {
    internalID
    id
  }
  slug
  status
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
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterButton_Test_Query",
    "selections": [
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
            "name": "RegisterButton_sale"
          }
        ],
        "storageKey": "sale(id:\"foo\")"
      },
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
            "name": "RegisterButton_me"
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
    "name": "RegisterButton_Test_Query",
    "selections": [
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
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isAuction",
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
            "name": "isRegistrationClosed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveURLIfOpen",
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
            "name": "registrationStatus",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
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
            "name": "status",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "sale(id:\"foo\")"
      },
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
            "name": "identityVerified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasCreditCards",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "IdentityVerification",
            "kind": "LinkedField",
            "name": "pendingIdentityVerification",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e31c8cddf96c9e16f0bb574d47ee6198",
    "id": null,
    "metadata": {},
    "name": "RegisterButton_Test_Query",
    "operationKind": "query",
    "text": "query RegisterButton_Test_Query {\n  sale(id: \"foo\") {\n    ...RegisterButton_sale\n    id\n  }\n  me {\n    ...RegisterButton_me\n    id\n  }\n}\n\nfragment RegisterButton_me on Me {\n  identityVerified\n  hasCreditCards\n  pendingIdentityVerification {\n    internalID\n    id\n  }\n}\n\nfragment RegisterButton_sale on Sale {\n  bidder {\n    qualifiedForBidding\n    id\n  }\n  isAuction\n  isClosed\n  isLiveOpen\n  isRegistrationClosed\n  liveURLIfOpen\n  requireIdentityVerification\n  registrationStatus {\n    internalID\n    id\n  }\n  slug\n  status\n}\n"
  }
};
})();
(node as any).hash = 'a917f6128fb6b1c5f780c7ce6aea2808';
export default node;
