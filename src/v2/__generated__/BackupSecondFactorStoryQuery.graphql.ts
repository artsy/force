/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BackupSecondFactorStoryQueryVariables = {};
export type BackupSecondFactorStoryQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"BackupSecondFactor_me">;
    } | null;
};
export type BackupSecondFactorStoryQuery = {
    readonly response: BackupSecondFactorStoryQueryResponse;
    readonly variables: BackupSecondFactorStoryQueryVariables;
};



/*
query BackupSecondFactorStoryQuery {
  me {
    ...BackupSecondFactor_me
    id
  }
}

fragment BackupSecondFactor_me on Me {
  backupSecondFactors: secondFactors(kinds: [backup]) {
    __typename
    ... on BackupSecondFactor {
      __typename
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BackupSecondFactorStoryQuery",
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
            "name": "BackupSecondFactor_me"
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
    "name": "BackupSecondFactorStoryQuery",
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
            "alias": "backupSecondFactors",
            "args": [
              {
                "kind": "Literal",
                "name": "kinds",
                "value": [
                  "backup"
                ]
              }
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactors",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v0/*: any*/)
                ],
                "type": "BackupSecondFactor"
              }
            ],
            "storageKey": "secondFactors(kinds:[\"backup\"])"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "BackupSecondFactorStoryQuery",
    "operationKind": "query",
    "text": "query BackupSecondFactorStoryQuery {\n  me {\n    ...BackupSecondFactor_me\n    id\n  }\n}\n\nfragment BackupSecondFactor_me on Me {\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      __typename\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b02c76bcabfa9b410e04088e100d0412';
export default node;
