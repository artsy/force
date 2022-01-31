/**
 * @generated SignedSource<<19b409ae9f52b749d1e3775e69ae0a03>>
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
export type useUnsubscribeEmailPreferencesMutation$variables = {
  input: UpdateMyProfileInput;
};
export type useUnsubscribeEmailPreferencesMutation$data = {
  readonly updateMyUserProfile: {
    readonly me: {
      readonly " $fragmentSpreads": FragmentRefs<"UnsubscribeLoggedIn_me">;
    } | null;
  } | null;
};
export type useUnsubscribeEmailPreferencesMutation = {
  variables: useUnsubscribeEmailPreferencesMutation$variables;
  response: useUnsubscribeEmailPreferencesMutation$data;
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
    "name": "useUnsubscribeEmailPreferencesMutation",
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
                "name": "UnsubscribeLoggedIn_me"
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
    "name": "useUnsubscribeEmailPreferencesMutation",
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
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "emailFrequency",
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
    "cacheID": "a31d5673604b39f9a260a7b637bd7b14",
    "id": null,
    "metadata": {},
    "name": "useUnsubscribeEmailPreferencesMutation",
    "operationKind": "mutation",
    "text": "mutation useUnsubscribeEmailPreferencesMutation(\n  $input: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $input) {\n    me {\n      ...UnsubscribeLoggedIn_me\n      id\n    }\n  }\n}\n\nfragment UnsubscribeLoggedIn_me on Me {\n  id\n  emailFrequency\n}\n"
  }
};
})();

(node as any).hash = "2b71b5c016896697c16439f70bf00256";

export default node;
