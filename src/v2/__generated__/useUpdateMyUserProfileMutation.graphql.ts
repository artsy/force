/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
    priceRangeMax?: number | null;
    priceRangeMin?: number | null;
    privacy?: string | null;
    profession?: string | null;
    receiveLotOpeningSoonNotification?: boolean | null;
    receiveNewSalesNotification?: boolean | null;
    receiveNewWorksNotification?: boolean | null;
    receiveOutbidNotification?: boolean | null;
    receivePromotionNotification?: boolean | null;
    receivePurchaseNotification?: boolean | null;
    receiveSaleOpeningClosingNotification?: boolean | null;
    shareFollows?: boolean | null;
};
export type EditableLocation = {
    address?: string | null;
    address2?: string | null;
    city?: string | null;
    country?: string | null;
    postalCode?: string | null;
    state?: string | null;
    stateCode?: string | null;
    summary?: string | null;
};
export type useUpdateMyUserProfileMutationVariables = {
    input: UpdateMyProfileInput;
};
export type useUpdateMyUserProfileMutationResponse = {
    readonly updateMyUserProfile: {
        readonly clientMutationId: string | null;
        readonly me: {
            readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileYourGalleryIntro_me">;
        } | null;
    } | null;
};
export type useUpdateMyUserProfileMutation = {
    readonly response: useUpdateMyUserProfileMutationResponse;
    readonly variables: useUpdateMyUserProfileMutationVariables;
};



/*
mutation useUpdateMyUserProfileMutation(
  $input: UpdateMyProfileInput!
) {
  updateMyUserProfile(input: $input) {
    clientMutationId
    me {
      ...SettingsEditProfileYourGalleryIntro_me
      id
    }
  }
}

fragment SettingsEditProfileYourGalleryIntro_me on Me {
  inquiryIntroduction
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
  "name": "clientMutationId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateMyUserProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "kind": "LinkedField",
        "name": "updateMyUserProfile",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                "name": "SettingsEditProfileYourGalleryIntro_me"
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
    "name": "useUpdateMyUserProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "kind": "LinkedField",
        "name": "updateMyUserProfile",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                "name": "inquiryIntroduction",
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
    "cacheID": "b84f5b19e450bba97fe3c6f5e0f7f415",
    "id": null,
    "metadata": {},
    "name": "useUpdateMyUserProfileMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateMyUserProfileMutation(\n  $input: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $input) {\n    clientMutationId\n    me {\n      ...SettingsEditProfileYourGalleryIntro_me\n      id\n    }\n  }\n}\n\nfragment SettingsEditProfileYourGalleryIntro_me on Me {\n  inquiryIntroduction\n}\n"
  }
};
})();
(node as any).hash = 'edc3801caa91842ffe2a71d69e00c4ff';
export default node;
