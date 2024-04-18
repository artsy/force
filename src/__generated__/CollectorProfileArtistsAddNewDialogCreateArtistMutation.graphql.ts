/**
 * @generated SignedSource<<75ad7e738b3fc94318f433b3641c181a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateArtistMutationInput = {
  birthday?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  deathday?: string | null | undefined;
  displayName: string;
  firstName?: string | null | undefined;
  isPersonalArtist?: boolean | null | undefined;
  lastName?: string | null | undefined;
  middleName?: string | null | undefined;
  nationality?: string | null | undefined;
};
export type CollectorProfileArtistsAddNewDialogCreateArtistMutation$variables = {
  input: CreateArtistMutationInput;
};
export type CollectorProfileArtistsAddNewDialogCreateArtistMutation$data = {
  readonly createArtist: {
    readonly artistOrError: {
      readonly artist?: {
        readonly internalID: string;
      } | null | undefined;
      readonly mutationError?: {
        readonly error: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type CollectorProfileArtistsAddNewDialogCreateArtistMutation = {
  response: CollectorProfileArtistsAddNewDialogCreateArtistMutation$data;
  variables: CollectorProfileArtistsAddNewDialogCreateArtistMutation$variables;
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
          "name": "error",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CreateArtistFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectorProfileArtistsAddNewDialogCreateArtistMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateArtistMutationPayload",
        "kind": "LinkedField",
        "name": "createArtist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artistOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CreateArtistSuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
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
    "name": "CollectorProfileArtistsAddNewDialogCreateArtistMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateArtistMutationPayload",
        "kind": "LinkedField",
        "name": "createArtist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artistOrError",
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
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
                "type": "CreateArtistSuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "02e1599e0d5f8e13ac2096803774034a",
    "id": null,
    "metadata": {},
    "name": "CollectorProfileArtistsAddNewDialogCreateArtistMutation",
    "operationKind": "mutation",
    "text": "mutation CollectorProfileArtistsAddNewDialogCreateArtistMutation(\n  $input: CreateArtistMutationInput!\n) {\n  createArtist(input: $input) {\n    artistOrError {\n      __typename\n      ... on CreateArtistSuccess {\n        artist {\n          internalID\n          id\n        }\n      }\n      ... on CreateArtistFailure {\n        mutationError {\n          error\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "61c04b87940639f451f30bfb197e2984";

export default node;
