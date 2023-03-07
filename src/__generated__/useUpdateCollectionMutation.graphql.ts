/**
 * @generated SignedSource<<d72af48f81a121e785e5a885a7070319>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type updateCollectionInput = {
  clientMutationId?: string | null;
  id: string;
  name: string;
};
export type useUpdateCollectionMutation$variables = {
  input: updateCollectionInput;
};
export type useUpdateCollectionMutation$data = {
  readonly updateCollection: {
    readonly responseOrError: {
      readonly __typename: "UpdateCollectionFailure";
      readonly mutationError: {
        readonly message: string;
        readonly statusCode: number | null;
      } | null;
    } | {
      readonly __typename: "UpdateCollectionSuccess";
      readonly collection: {
        readonly internalID: string;
        readonly name: string;
      } | null;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null;
};
export type useUpdateCollectionMutation = {
  response: useUpdateCollectionMutation$data;
  variables: useUpdateCollectionMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "statusCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UpdateCollectionFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateCollectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateCollectionPayload",
        "kind": "LinkedField",
        "name": "updateCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "responseOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "collection",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "UpdateCollectionSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateCollectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateCollectionPayload",
        "kind": "LinkedField",
        "name": "updateCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "responseOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "collection",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
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
                ],
                "type": "UpdateCollectionSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c89ebb66ea67f9bc1f63e5bd913e145a",
    "id": null,
    "metadata": {},
    "name": "useUpdateCollectionMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateCollectionMutation(\n  $input: updateCollectionInput!\n) {\n  updateCollection(input: $input) {\n    responseOrError {\n      __typename\n      ... on UpdateCollectionSuccess {\n        collection {\n          internalID\n          name\n          id\n        }\n      }\n      ... on UpdateCollectionFailure {\n        mutationError {\n          message\n          statusCode\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dfbef87048814a5e7d99ec5bf20d7ad9";

export default node;
