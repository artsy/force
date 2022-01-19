/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateMyProfileInput = {
    artworksPerYear?: string | null;
    bio?: string | null;
    clientMutationId?: string | null;
    collectorLevel?: number | null;
    completedOnboarding?: boolean | null;
    email?: string | null;
    emailFrequency?: string | null;
    gender?: string | null;
    iconUrl?: string | null;
    industry?: string | null;
    isCollector?: boolean | null;
    location?: EditableLocation | null;
    name?: string | null;
    notes?: string | null;
    otherRelevantPosition?: string | null;
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
(node as any).hash = '69ea3f3647ec583546e80aa54ebcdbe4';
export default node;
