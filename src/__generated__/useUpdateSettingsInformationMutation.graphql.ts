/**
 * @generated SignedSource<<8a7ac7dfee398a39711ead3c73a0ebf0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurrencyPreference = "EUR" | "GBP" | "USD" | "%future added value";
export type LengthUnitPreference = "CM" | "IN" | "%future added value";
export type UpdateMyProfileInput = {
  artworksPerYear?: string | null;
  bio?: string | null;
  clientMutationId?: string | null;
  collectorLevel?: number | null;
  completedOnboarding?: boolean | null;
  currencyPreference?: CurrencyPreference | null;
  email?: string | null;
  emailFrequency?: string | null;
  gender?: string | null;
  iconUrl?: string | null;
  industry?: string | null;
  isCollector?: boolean | null;
  lengthUnitPreference?: LengthUnitPreference | null;
  location?: EditableLocation | null;
  name?: string | null;
  notes?: string | null;
  otherRelevantPositions?: string | null;
  password?: string | null;
  phone?: string | null;
  phoneCountryCode?: string | null;
  phoneNumber?: string | null;
  priceRangeMax?: number | null;
  priceRangeMin?: number | null;
  privacy?: string | null;
  profession?: string | null;
  receiveLotOpeningSoonNotification?: boolean | null;
  receiveNewSalesNotification?: boolean | null;
  receiveNewWorksNotification?: boolean | null;
  receiveOrderNotification?: boolean | null;
  receiveOutbidNotification?: boolean | null;
  receivePartnerShowNotification?: boolean | null;
  receivePromotionNotification?: boolean | null;
  receivePurchaseNotification?: boolean | null;
  receiveSaleOpeningClosingNotification?: boolean | null;
  receiveViewingRoomNotification?: boolean | null;
  shareFollows?: boolean | null;
};
export type EditableLocation = {
  address?: string | null;
  address2?: string | null;
  city?: string | null;
  coordinates?: ReadonlyArray<number> | null;
  country?: string | null;
  countryCode?: string | null;
  postalCode?: string | null;
  state?: string | null;
  stateCode?: string | null;
  summary?: string | null;
};
export type useUpdateSettingsInformationMutation$variables = {
  input: UpdateMyProfileInput;
};
export type useUpdateSettingsInformationMutation$data = {
  readonly updateMyUserProfile: {
    readonly me: {
      readonly email: string | null;
      readonly name: string | null;
      readonly phoneNumber: {
        readonly display: string | null;
        readonly originalNumber: string | null;
        readonly regionCode: string | null;
      } | null;
      readonly priceRangeMax: number | null;
      readonly priceRangeMin: number | null;
      readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsInformation_me">;
    } | null;
    readonly userOrError: {
      readonly mutationError?: {
        readonly detail: string | null;
        readonly error: string | null;
        readonly fieldErrors: ReadonlyArray<{
          readonly message: string;
          readonly name: string;
        } | null> | null;
        readonly message: string;
        readonly type: string | null;
      } | null;
      readonly user?: {
        readonly internalID: string;
      } | null;
    } | null;
  } | null;
};
export type useUpdateSettingsInformationMutation = {
  response: useUpdateSettingsInformationMutation$data;
  variables: useUpdateSettingsInformationMutation$variables;
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
  "name": "email",
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
  "alias": null,
  "args": null,
  "concreteType": "PhoneNumberType",
  "kind": "LinkedField",
  "name": "phoneNumber",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "regionCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "NATIONAL"
        }
      ],
      "kind": "ScalarField",
      "name": "display",
      "storageKey": "display(format:\"NATIONAL\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "originalNumber",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "priceRangeMin",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "priceRangeMax",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v9 = {
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
        (v8/*: any*/),
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
            (v3/*: any*/),
            (v8/*: any*/)
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
v10 = {
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SettingsEditSettingsInformation_me"
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
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
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "UpdateMyProfileMutationSuccess",
                "abstractKey": null
              },
              (v9/*: any*/)
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "paddleNumber",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "priceRange",
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/),
              (v10/*: any*/)
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
                      (v7/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "UpdateMyProfileMutationSuccess",
                "abstractKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dfe330fe06ae5e2676293a9887aa1969",
    "id": null,
    "metadata": {},
    "name": "useUpdateSettingsInformationMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateSettingsInformationMutation(\n  $input: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $input) {\n    me {\n      ...SettingsEditSettingsInformation_me\n      email\n      name\n      phoneNumber {\n        regionCode\n        display(format: NATIONAL)\n        originalNumber\n      }\n      priceRangeMin\n      priceRangeMax\n      id\n    }\n    userOrError {\n      __typename\n      ... on UpdateMyProfileMutationSuccess {\n        user {\n          internalID\n          id\n        }\n      }\n      ... on UpdateMyProfileMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n          error\n          fieldErrors {\n            name\n            message\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment SettingsEditSettingsInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phoneNumber {\n    regionCode\n    display(format: NATIONAL)\n    originalNumber\n  }\n  priceRange\n  priceRangeMin\n  priceRangeMax\n}\n"
  }
};
})();

(node as any).hash = "f8de9f88d9339ef766c0b79d4ace2978";

export default node;
