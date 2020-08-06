/* tslint:disable */

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
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "BackupSecondFactorStoryQuery",
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
            "name": "BackupSecondFactor_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "BackupSecondFactorStoryQuery",
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
            "kind": "LinkedField",
            "alias": "backupSecondFactors",
            "name": "secondFactors",
            "storageKey": "secondFactors(kinds:[\"backup\"])",
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
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "BackupSecondFactor",
                "selections": [
                  (v0/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "BackupSecondFactorStoryQuery",
    "id": null,
    "text": "query BackupSecondFactorStoryQuery {\n  me {\n    ...BackupSecondFactor_me\n    id\n  }\n}\n\nfragment BackupSecondFactor_me on Me {\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      __typename\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b02c76bcabfa9b410e04088e100d0412';
export default node;
