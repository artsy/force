/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type identityVerificationRoutes_IdentityVerificationAppQueryVariables = {
    id: string;
};
export type identityVerificationRoutes_IdentityVerificationAppQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationApp_me">;
    } | null;
};
export type identityVerificationRoutes_IdentityVerificationAppQueryRawResponse = {
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
export type identityVerificationRoutes_IdentityVerificationAppQuery = {
    readonly response: identityVerificationRoutes_IdentityVerificationAppQueryResponse;
    readonly variables: identityVerificationRoutes_IdentityVerificationAppQueryVariables;
    readonly rawResponse: identityVerificationRoutes_IdentityVerificationAppQueryRawResponse;
};



/*
query identityVerificationRoutes_IdentityVerificationAppQuery(
  $id: String!
) {
  me {
    ...IdentityVerificationApp_me_1Bmzm5
    id
  }
}

fragment IdentityVerificationApp_me_1Bmzm5 on Me {
  internalID
  email
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
    "name": "identityVerificationRoutes_IdentityVerificationAppQuery",
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
    "name": "identityVerificationRoutes_IdentityVerificationAppQuery",
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
            "name": "email",
            "storageKey": null
          },
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
    "name": "identityVerificationRoutes_IdentityVerificationAppQuery",
    "operationKind": "query",
    "text": "query identityVerificationRoutes_IdentityVerificationAppQuery(\n  $id: String!\n) {\n  me {\n    ...IdentityVerificationApp_me_1Bmzm5\n    id\n  }\n}\n\nfragment IdentityVerificationApp_me_1Bmzm5 on Me {\n  internalID\n  email\n  identityVerification(id: $id) {\n    internalID\n    userID\n    state\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1afc54ff423d5857bb56616148671525';
export default node;
