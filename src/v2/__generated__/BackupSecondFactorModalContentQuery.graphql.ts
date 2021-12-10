/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BackupSecondFactorModalContentQueryVariables = {};
export type BackupSecondFactorModalContentQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"BackupSecondFactorModalContent_me">;
    } | null;
};
export type BackupSecondFactorModalContentQueryRawResponse = {
    readonly me: ({
        readonly backupSecondFactors: ReadonlyArray<({
            readonly __typename: "BackupSecondFactor";
            readonly code: string;
        } | {
            readonly __typename: string;
        }) | null> | null;
        readonly id: string;
    }) | null;
};
export type BackupSecondFactorModalContentQuery = {
    readonly response: BackupSecondFactorModalContentQueryResponse;
    readonly variables: BackupSecondFactorModalContentQueryVariables;
    readonly rawResponse: BackupSecondFactorModalContentQueryRawResponse;
};



/*
query BackupSecondFactorModalContentQuery {
  me {
    ...BackupSecondFactorModalContent_me
    id
  }
}

fragment BackupSecondFactorModalContent_me on Me {
  backupSecondFactors: secondFactors(kinds: [backup]) {
    __typename
    ... on BackupSecondFactor {
      code
    }
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BackupSecondFactorModalContentQuery",
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
            "name": "BackupSecondFactorModalContent_me"
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
    "name": "BackupSecondFactorModalContentQuery",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "code",
                    "storageKey": null
                  }
                ],
                "type": "BackupSecondFactor",
                "abstractKey": null
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
    "cacheID": "20d89a5ee545aa979e81962740a74e07",
    "id": null,
    "metadata": {},
    "name": "BackupSecondFactorModalContentQuery",
    "operationKind": "query",
    "text": "query BackupSecondFactorModalContentQuery {\n  me {\n    ...BackupSecondFactorModalContent_me\n    id\n  }\n}\n\nfragment BackupSecondFactorModalContent_me on Me {\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      code\n    }\n  }\n}\n"
  }
};
(node as any).hash = '6eb1007194d1ab59a7d88bf4892fd4b1';
export default node;
