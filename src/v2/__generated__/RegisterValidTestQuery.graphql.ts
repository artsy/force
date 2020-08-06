/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RegisterValidTestQueryVariables = {};
export type RegisterValidTestQueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"Register_sale">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"Register_me">;
    } | null;
};
export type RegisterValidTestQueryRawResponse = {
    readonly sale: ({
        readonly slug: string;
        readonly internalID: string;
        readonly status: string | null;
        readonly requireIdentityVerification: boolean | null;
        readonly id: string | null;
    }) | null;
    readonly me: ({
        readonly internalID: string;
        readonly identityVerified: boolean | null;
        readonly id: string | null;
    }) | null;
};
export type RegisterValidTestQuery = {
    readonly response: RegisterValidTestQueryResponse;
    readonly variables: RegisterValidTestQueryVariables;
    readonly rawResponse: RegisterValidTestQueryRawResponse;
};



/*
query RegisterValidTestQuery {
  sale(id: "example-auction-id") {
    ...Register_sale
    id
  }
  me {
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
    "kind": "Literal",
    "name": "id",
    "value": "example-auction-id"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RegisterValidTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": "sale(id:\"example-auction-id\")",
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Register_sale",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Register_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RegisterValidTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": "sale(id:\"example-auction-id\")",
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "status",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "requireIdentityVerification",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "identityVerified",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RegisterValidTestQuery",
    "id": null,
    "text": "query RegisterValidTestQuery {\n  sale(id: \"example-auction-id\") {\n    ...Register_sale\n    id\n  }\n  me {\n    ...Register_me\n    id\n  }\n}\n\nfragment Register_me on Me {\n  internalID\n  identityVerified\n}\n\nfragment Register_sale on Sale {\n  slug\n  internalID\n  status\n  requireIdentityVerification\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a4c265e5981c01e987b8ac249f776df2';
export default node;
