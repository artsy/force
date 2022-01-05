/* tslint:disable */
/* eslint-disable */

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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v5 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterValidTestQuery",
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
            "name": "Register_sale"
          }
        ],
        "storageKey": "sale(id:\"example-auction-id\")"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RegisterValidTestQuery",
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
            "kind": "ScalarField",
            "name": "slug",
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
          (v2/*: any*/)
        ],
        "storageKey": "sale(id:\"example-auction-id\")"
      },
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
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "sale.id": (v3/*: any*/),
        "me.id": (v3/*: any*/),
        "sale.slug": (v4/*: any*/),
        "sale.internalID": (v4/*: any*/),
        "sale.status": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "sale.requireIdentityVerification": (v5/*: any*/),
        "me.internalID": (v4/*: any*/),
        "me.identityVerified": (v5/*: any*/)
      }
    },
    "name": "RegisterValidTestQuery",
    "operationKind": "query",
    "text": "query RegisterValidTestQuery {\n  sale(id: \"example-auction-id\") {\n    ...Register_sale\n    id\n  }\n  me {\n    ...Register_me\n    id\n  }\n}\n\nfragment Register_me on Me {\n  internalID\n  identityVerified\n}\n\nfragment Register_sale on Sale {\n  slug\n  internalID\n  status\n  requireIdentityVerification\n}\n"
  }
};
})();
(node as any).hash = 'e845527731162b24c2e711b3b4a4f4f3';
export default node;
