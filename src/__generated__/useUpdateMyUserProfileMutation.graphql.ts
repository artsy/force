/**
 * @generated SignedSource<<fb1802e5dc6ca78e72ad018c28769d22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
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
export type useUpdateMyUserProfileMutation$variables = {
  input: UpdateMyProfileInput;
};
export type useUpdateMyUserProfileMutation$data = {
  readonly updateMyUserProfile: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type useUpdateMyUserProfileMutation = {
  response: useUpdateMyUserProfileMutation$data;
  variables: useUpdateMyUserProfileMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateMyProfilePayload",
    "kind": "LinkedField",
    "name": "updateMyUserProfile",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateMyUserProfileMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateMyUserProfileMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a26a005d1ab78e7ddbeda4115be42bb2",
    "id": null,
    "metadata": {},
    "name": "useUpdateMyUserProfileMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateMyUserProfileMutation(\n  $input: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "69ea3f3647ec583546e80aa54ebcdbe4";

export default node;
