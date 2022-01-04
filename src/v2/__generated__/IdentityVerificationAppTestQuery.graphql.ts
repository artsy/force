/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationAppTestQueryVariables = {};
export type IdentityVerificationAppTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationApp_me">;
    } | null;
};
export type IdentityVerificationAppTestQueryRawResponse = {
    readonly me: ({
        readonly internalID: string;
        readonly email: string | null;
        readonly identityVerification: ({
            readonly internalID: string;
            readonly userID: string;
            readonly state: string;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type IdentityVerificationAppTestQuery = {
    readonly response: IdentityVerificationAppTestQueryResponse;
    readonly variables: IdentityVerificationAppTestQueryVariables;
    readonly rawResponse: IdentityVerificationAppTestQueryRawResponse;
};



/*
query IdentityVerificationAppTestQuery {
  me {
    ...IdentityVerificationApp_me_3zaPSf
    id
  }
}

fragment IdentityVerificationApp_me_3zaPSf on Me {
  internalID
  email
  identityVerification(id: "idv-id") {
    internalID
    userID
    state
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "idv-id"
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
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IdentityVerificationAppTestQuery",
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
            "args": (v0/*: any*/),
            "kind": "FragmentSpread",
            "name": "IdentityVerificationApp_me"
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
    "name": "IdentityVerificationAppTestQuery",
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
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "IdentityVerification",
            "kind": "LinkedField",
            "name": "identityVerification",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "userID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "identityVerification(id:\"idv-id\")"
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
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v3/*: any*/),
        "me.internalID": (v4/*: any*/),
        "me.email": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.identityVerification": {
          "type": "IdentityVerification",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.identityVerification.internalID": (v4/*: any*/),
        "me.identityVerification.userID": (v5/*: any*/),
        "me.identityVerification.state": (v5/*: any*/),
        "me.identityVerification.id": (v3/*: any*/)
      }
    },
    "name": "IdentityVerificationAppTestQuery",
    "operationKind": "query",
    "text": "query IdentityVerificationAppTestQuery {\n  me {\n    ...IdentityVerificationApp_me_3zaPSf\n    id\n  }\n}\n\nfragment IdentityVerificationApp_me_3zaPSf on Me {\n  internalID\n  email\n  identityVerification(id: \"idv-id\") {\n    internalID\n    userID\n    state\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ce0e064167e6a0c0679bcbb559733078';
export default node;
