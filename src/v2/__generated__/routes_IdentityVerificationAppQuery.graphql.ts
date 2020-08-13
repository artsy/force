/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_IdentityVerificationAppQueryVariables = {
    id: string;
};
export type routes_IdentityVerificationAppQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationApp_me">;
    } | null;
};
export type routes_IdentityVerificationAppQueryRawResponse = {
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
export type routes_IdentityVerificationAppQuery = {
    readonly response: routes_IdentityVerificationAppQueryResponse;
    readonly variables: routes_IdentityVerificationAppQueryVariables;
    readonly rawResponse: routes_IdentityVerificationAppQueryRawResponse;
};



/*
query routes_IdentityVerificationAppQuery(
  $id: String!
) {
  me {
    ...IdentityVerificationApp_me_1Bmzm5
    id
  }
}

fragment IdentityVerificationApp_me_1Bmzm5 on Me {
  internalID
  identityVerification(id: $id) {
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
    "name": "routes_IdentityVerificationAppQuery",
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
            "args": (v1/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "routes_IdentityVerificationAppQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "IdentityVerification",
            "kind": "LinkedField",
            "name": "identityVerification",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    "id": null,
    "metadata": {},
    "name": "routes_IdentityVerificationAppQuery",
    "operationKind": "query",
    "text": "query routes_IdentityVerificationAppQuery(\n  $id: String!\n) {\n  me {\n    ...IdentityVerificationApp_me_1Bmzm5\n    id\n  }\n}\n\nfragment IdentityVerificationApp_me_1Bmzm5 on Me {\n  internalID\n  identityVerification(id: $id) {\n    internalID\n    userID\n    state\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '4874a6318b9369d2f685932d57fa41c5';
export default node;
