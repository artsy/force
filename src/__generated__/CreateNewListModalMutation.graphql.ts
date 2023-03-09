/**
 * @generated SignedSource<<ac008139a2dd606d3fe596d879f83ab1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type createCollectionInput = {
  clientMutationId?: string | null;
  name: string;
};
export type CreateNewListModalMutation$variables = {
  input: createCollectionInput;
};
export type CreateNewListModalMutation$data = {
  readonly createCollection: {
    readonly responseOrError: {
      readonly collection?: {
        readonly internalID: string;
        readonly name: string;
      } | null;
      readonly mutationError?: {
        readonly message: string;
      } | null;
    } | null;
  } | null;
};
export type CreateNewListModalMutation = {
  response: CreateNewListModalMutation$data;
  variables: CreateNewListModalMutation$variables;
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CreateCollectionFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateNewListModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "createCollectionPayload",
        "kind": "LinkedField",
        "name": "createCollection",
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
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CreateCollectionSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
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
    "name": "CreateNewListModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "createCollectionPayload",
        "kind": "LinkedField",
        "name": "createCollection",
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
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "collection",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
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
                "type": "CreateCollectionSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "07c9951a4d48e03ac90215cee0529e91",
    "id": null,
    "metadata": {},
    "name": "CreateNewListModalMutation",
    "operationKind": "mutation",
    "text": "mutation CreateNewListModalMutation(\n  $input: createCollectionInput!\n) {\n  createCollection(input: $input) {\n    responseOrError {\n      __typename\n      ... on CreateCollectionSuccess {\n        collection {\n          internalID\n          name\n          id\n        }\n      }\n      ... on CreateCollectionFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0aff09746bd0bfde046f4c0edecd2034";

export default node;
