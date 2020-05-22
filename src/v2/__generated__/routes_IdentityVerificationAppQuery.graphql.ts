/* tslint:disable */

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
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
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
    "name": "routes_IdentityVerificationAppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
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
            "args": (v1/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_IdentityVerificationAppQuery",
    "argumentDefinitions": (v0/*: any*/),
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
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "identityVerification",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "IdentityVerification",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
              (v3/*: any*/)
            ]
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_IdentityVerificationAppQuery",
    "id": null,
    "text": "query routes_IdentityVerificationAppQuery(\n  $id: String!\n) {\n  me {\n    ...IdentityVerificationApp_me_1Bmzm5\n    id\n  }\n}\n\nfragment IdentityVerificationApp_me_1Bmzm5 on Me {\n  internalID\n  identityVerification(id: $id) {\n    internalID\n    userID\n    state\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '4874a6318b9369d2f685932d57fa41c5';
export default node;
