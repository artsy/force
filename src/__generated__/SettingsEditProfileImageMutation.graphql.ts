/**
 * @generated SignedSource<<14bd91a28a34ff8f1078bc121cc99af7>>
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
  phoneCountryCode?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  priceRangeMax?: number | null | undefined;
  priceRangeMin?: number | null | undefined;
  privacy?: string | null | undefined;
  profession?: string | null | undefined;
  promptedForUpdate?: boolean | null | undefined;
  receiveLotOpeningSoonNotification?: boolean | null | undefined;
  receiveNewSalesNotification?: boolean | null | undefined;
  receiveNewWorksNotification?: boolean | null | undefined;
  receiveOrderNotification?: boolean | null | undefined;
  receiveOutbidNotification?: boolean | null | undefined;
  receivePartnerOfferNotification?: boolean | null | undefined;
  receivePartnerShowNotification?: boolean | null | undefined;
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
  coordinates?: ReadonlyArray<number> | null | undefined;
  country?: string | null | undefined;
  countryCode?: string | null | undefined;
  postalCode?: string | null | undefined;
  state?: string | null | undefined;
  stateCode?: string | null | undefined;
  summary?: string | null | undefined;
};
export type SettingsEditProfileImageMutation$variables = {
  input: UpdateMyProfileInput;
};
export type SettingsEditProfileImageMutation$data = {
  readonly updateMyUserProfile: {
    readonly me: {
      readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileImage_me">;
    } | null | undefined;
  } | null | undefined;
};
export type SettingsEditProfileImageMutation = {
  response: SettingsEditProfileImageMutation$data;
  variables: SettingsEditProfileImageMutation$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsEditProfileImageMutation",
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
                "name": "SettingsEditProfileImage_me"
              }
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
    "name": "SettingsEditProfileImageMutation",
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
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "internalID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "versions",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 100
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 100
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "src",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "srcSet",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "cropped(height:100,width:100)"
                  }
                ],
                "storageKey": null
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6bbbbd4ec273faa7c1c4536be25a9885",
    "id": null,
    "metadata": {},
    "name": "SettingsEditProfileImageMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsEditProfileImageMutation(\n  $input: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $input) {\n    me {\n      ...SettingsEditProfileImage_me\n      id\n    }\n  }\n}\n\nfragment CollectorProfileHeaderAvatar_me on Me {\n  initials\n  icon {\n    internalID\n    versions\n    cropped(height: 100, width: 100) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment SettingsEditProfileImage_me on Me {\n  ...CollectorProfileHeaderAvatar_me\n  initials\n  icon {\n    internalID\n    versions\n    cropped(height: 100, width: 100) {\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "047659de763fafcefe281a3e8b5a050d";

export default node;
