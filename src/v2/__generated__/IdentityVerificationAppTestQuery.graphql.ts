/* tslint:disable */

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
    "name": "IdentityVerificationAppTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
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
            "name": "IdentityVerificationApp_me",
            "args": (v0/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "IdentityVerificationAppTestQuery",
    "argumentDefinitions": [],
    "selections": [
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
            "kind": "LinkedField",
            "alias": null,
            "name": "identityVerification",
            "storageKey": "identityVerification(id:\"idv-id\")",
            "args": (v0/*: any*/),
            "concreteType": "IdentityVerification",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "userID",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "state",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "IdentityVerificationAppTestQuery",
    "id": null,
    "text": "query IdentityVerificationAppTestQuery {\n  me {\n    ...IdentityVerificationApp_me_3zaPSf\n    id\n  }\n}\n\nfragment IdentityVerificationApp_me_3zaPSf on Me {\n  internalID\n  identityVerification(id: \"idv-id\") {\n    internalID\n    userID\n    state\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '9e5f6cb15751616ff1e1d7394f00b245';
export default node;
