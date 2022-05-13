/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurrencyPreference = "EUR" | "GBP" | "USD" | "%future added value";
export type LengthUnitPreference = "CM" | "IN" | "%future added value";
export type UpdateMyProfileInput = {
    artworksPerYear?: string | null | undefined;
    bio?: string | null | undefined;
    clientMutationId?: string | null | undefined;
    collectorLevel?: number | null | undefined;
    completedOnboarding?: boolean | null | undefined;
    currencyPreference?: CurrencyPreference | null | undefined;
    email?: string | null | undefined;
    emailFrequency?: string | null | undefined;
    gender?: string | null | undefined;
    iconUrl?: string | null | undefined;
    industry?: string | null | undefined;
    isCollector?: boolean | null | undefined;
    lengthUnitPreference?: LengthUnitPreference | null | undefined;
    location?: EditableLocation | null | undefined;
    name?: string | null | undefined;
    notes?: string | null | undefined;
    otherRelevantPositions?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
    priceRangeMax?: number | null | undefined;
    priceRangeMin?: number | null | undefined;
    privacy?: string | null | undefined;
    profession?: string | null | undefined;
    receiveLotOpeningSoonNotification?: boolean | null | undefined;
    receiveNewSalesNotification?: boolean | null | undefined;
    receiveNewWorksNotification?: boolean | null | undefined;
    receiveOrderNotification?: boolean | null | undefined;
    receiveOutbidNotification?: boolean | null | undefined;
    receivePromotionNotification?: boolean | null | undefined;
    receivePurchaseNotification?: boolean | null | undefined;
    receiveSaleOpeningClosingNotification?: boolean | null | undefined;
    receiveViewingRoomNotification?: boolean | null | undefined;
    shareFollows?: boolean | null | undefined;
};
export type EditableLocation = {
    address?: string | null | undefined;
    address2?: string | null | undefined;
    city?: string | null | undefined;
    country?: string | null | undefined;
    postalCode?: string | null | undefined;
    state?: string | null | undefined;
    stateCode?: string | null | undefined;
    summary?: string | null | undefined;
};
export type useUpdateSettingsInformationMutationVariables = {
    input: UpdateMyProfileInput;
};
export type useUpdateSettingsInformationMutationResponse = {
    readonly updateMyUserProfile: {
        readonly me: {
            readonly name: string | null;
            readonly email: string | null;
            readonly phone: string | null;
            readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsInformation_me">;
        } | null;
        readonly userOrError: {
            readonly user?: {
                readonly internalID: string;
            } | null | undefined;
            readonly mutationError?: {
                readonly type: string | null;
                readonly message: string;
                readonly detail: string | null;
                readonly error: string | null;
                readonly fieldErrors: ReadonlyArray<{
                    readonly name: string;
                    readonly message: string;
                } | null> | null;
            } | null | undefined;
        } | null;
    } | null;
};
export type useUpdateSettingsInformationMutation = {
    readonly response: useUpdateSettingsInformationMutationResponse;
    readonly variables: useUpdateSettingsInformationMutationVariables;
};



/*
mutation useUpdateSettingsInformationMutation(
  $input: UpdateMyProfileInput!
) {
  updateMyUserProfile(input: $input) {
    me {
      ...SettingsEditSettingsInformation_me
      name
      email
      phone
      id
    }
    userOrError {
      __typename
      ... on UpdateMyProfileMutationSuccess {
        user {
          internalID
          id
        }
      }
      ... on UpdateMyProfileMutationFailure {
        mutationError {
          type
          message
          detail
          error
          fieldErrors {
            name
            message
          }
        }
      }
    }
  }
}

fragment SettingsEditSettingsInformation_me on Me {
  email
  name
  paddleNumber
  phone
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
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phone",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v7 = {
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
          "name": "type",
          "storageKey": null
        },
        (v6/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "detail",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "error",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "FieldErrorResults",
          "kind": "LinkedField",
          "name": "fieldErrors",
          "plural": true,
          "selections": [
            (v2/*: any*/),
            (v6/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UpdateMyProfileMutationFailure",
  "abstractKey": null
},
v8 = {
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
    "name": "useUpdateSettingsInformationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "kind": "LinkedField",
        "name": "updateMyUserProfile",
        "plural": false,
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
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SettingsEditSettingsInformation_me"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "UpdateMyProfileMutationSuccess",
                "abstractKey": null
              },
              (v7/*: any*/)
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
    "name": "useUpdateSettingsInformationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "kind": "LinkedField",
        "name": "updateMyUserProfile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "paddleNumber",
                "storageKey": null
              },
              (v4/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userOrError",
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
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "UpdateMyProfileMutationSuccess",
                "abstractKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3b677675af93b6b4796cb95699e6911f",
    "id": null,
    "metadata": {},
    "name": "useUpdateSettingsInformationMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateSettingsInformationMutation(\n  $input: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $input) {\n    me {\n      ...SettingsEditSettingsInformation_me\n      name\n      email\n      phone\n      id\n    }\n    userOrError {\n      __typename\n      ... on UpdateMyProfileMutationSuccess {\n        user {\n          internalID\n          id\n        }\n      }\n      ... on UpdateMyProfileMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n          error\n          fieldErrors {\n            name\n            message\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment SettingsEditSettingsInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phone\n}\n"
  }
};
})();
(node as any).hash = '75b2af000cf6f99e786ce594039695c4';
export default node;
