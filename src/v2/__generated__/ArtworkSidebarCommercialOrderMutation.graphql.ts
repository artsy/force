/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceCreateOrderWithArtworkInput = {
    artworkId: string;
    clientMutationId?: string | null;
    editionSetId?: string | null;
    quantity?: number | null;
};
export type ArtworkSidebarCommercialOrderMutationVariables = {
    input: CommerceCreateOrderWithArtworkInput;
};
export type ArtworkSidebarCommercialOrderMutationResponse = {
    readonly commerceCreateOrderWithArtwork: {
        readonly orderOrError: {
            readonly __typename: "CommerceOrderWithMutationSuccess";
            readonly order?: {
                readonly internalID: string;
                readonly mode: CommerceOrderModeEnum | null;
            };
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            };
        };
    } | null;
};
export type ArtworkSidebarCommercialOrderMutation = {
    readonly response: ArtworkSidebarCommercialOrderMutationResponse;
    readonly variables: ArtworkSidebarCommercialOrderMutationVariables;
};



/*
mutation ArtworkSidebarCommercialOrderMutation(
  $input: CommerceCreateOrderWithArtworkInput!
) {
  commerceCreateOrderWithArtwork(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationSuccess {
        __typename
        order {
          __typename
          internalID
          mode
          id
        }
      }
      ... on CommerceOrderWithMutationFailure {
        error {
          type
          code
          data
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "CommerceCreateOrderWithArtworkInput!"
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
  "name": "mode",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceApplicationError",
      "kind": "LinkedField",
      "name": "error",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "data",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrderWithMutationFailure"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarCommercialOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceCreateOrderWithArtworkPayload",
        "kind": "LinkedField",
        "name": "commerceCreateOrderWithArtwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess"
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkSidebarCommercialOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceCreateOrderWithArtworkPayload",
        "kind": "LinkedField",
        "name": "commerceCreateOrderWithArtwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
                "type": "CommerceOrderWithMutationSuccess"
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
    "id": null,
    "metadata": {},
    "name": "ArtworkSidebarCommercialOrderMutation",
    "operationKind": "mutation",
    "text": "mutation ArtworkSidebarCommercialOrderMutation(\n  $input: CommerceCreateOrderWithArtworkInput!\n) {\n  commerceCreateOrderWithArtwork(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          internalID\n          mode\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6b2e5dd752fba19c297673f91af2ced6';
export default node;
