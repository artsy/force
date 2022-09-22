/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceCreateOfferOrderWithArtworkInput = {
    artworkId: string;
    clientMutationId?: string | null | undefined;
    editionSetId?: string | null | undefined;
    findActiveOrCreate?: boolean | null | undefined;
    quantity?: number | null | undefined;
};
export type ArtworkSidebar2CommercialButtonsOfferOrderMutationVariables = {
    input: CommerceCreateOfferOrderWithArtworkInput;
};
export type ArtworkSidebar2CommercialButtonsOfferOrderMutationResponse = {
    readonly commerceCreateOfferOrderWithArtwork: {
        readonly orderOrError: {
            readonly __typename: "CommerceOrderWithMutationSuccess";
            readonly order?: {
                readonly internalID: string;
                readonly mode: CommerceOrderModeEnum | null;
            } | undefined;
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            } | undefined;
        };
    } | null;
};
export type ArtworkSidebar2CommercialButtonsOfferOrderMutation = {
    readonly response: ArtworkSidebar2CommercialButtonsOfferOrderMutationResponse;
    readonly variables: ArtworkSidebar2CommercialButtonsOfferOrderMutationVariables;
};



/*
mutation ArtworkSidebar2CommercialButtonsOfferOrderMutation(
  $input: CommerceCreateOfferOrderWithArtworkInput!
) {
  commerceCreateOfferOrderWithArtwork(input: $input) {
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
  "type": "CommerceOrderWithMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebar2CommercialButtonsOfferOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceCreateOfferOrderWithArtworkPayload",
        "kind": "LinkedField",
        "name": "commerceCreateOfferOrderWithArtwork",
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
                "type": "CommerceOrderWithMutationSuccess",
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
    "name": "ArtworkSidebar2CommercialButtonsOfferOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceCreateOfferOrderWithArtworkPayload",
        "kind": "LinkedField",
        "name": "commerceCreateOfferOrderWithArtwork",
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
                "type": "CommerceOrderWithMutationSuccess",
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
    "cacheID": "d96964d1467f888b9d545026db4ee183",
    "id": null,
    "metadata": {},
    "name": "ArtworkSidebar2CommercialButtonsOfferOrderMutation",
    "operationKind": "mutation",
    "text": "mutation ArtworkSidebar2CommercialButtonsOfferOrderMutation(\n  $input: CommerceCreateOfferOrderWithArtworkInput!\n) {\n  commerceCreateOfferOrderWithArtwork(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          internalID\n          mode\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7e67ab48e542c4e23c191637a6274c96';
export default node;
