/* tslint:disable */

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
            readonly __typename: string | null;
        }) | null> | null;
        readonly id: string | null;
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
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "BackupSecondFactorModalContentQuery",
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
            "name": "BackupSecondFactorModalContent_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "BackupSecondFactorModalContentQuery",
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "type": "BackupSecondFactor",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "code",
                    "args": null,
                    "storageKey": null
                  }
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
    "name": "BackupSecondFactorModalContentQuery",
    "id": null,
    "text": "query BackupSecondFactorModalContentQuery {\n  me {\n    ...BackupSecondFactorModalContent_me\n    id\n  }\n}\n\nfragment BackupSecondFactorModalContent_me on Me {\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      code\n    }\n  }\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '6eb1007194d1ab59a7d88bf4892fd4b1';
export default node;
