/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SubGroupStatus = "SUBSCRIBED" | "UNSUBSCRIBED" | "%future added value";
export type updateNotificationPreferencesMutationInput = {
    authenticationToken?: string | null;
    clientMutationId?: string | null;
    subscriptionGroups: Array<NotificationPreferenceInput>;
};
export type NotificationPreferenceInput = {
    name: string;
    status: SubGroupStatus;
};
export type useEditNotificationPreferencesMutationVariables = {
    input: updateNotificationPreferencesMutationInput;
};
export type useEditNotificationPreferencesMutationResponse = {
    readonly updateNotificationPreferences: {
        readonly clientMutationId: string | null;
    } | null;
};
export type useEditNotificationPreferencesMutation = {
    readonly response: useEditNotificationPreferencesMutationResponse;
    readonly variables: useEditNotificationPreferencesMutationVariables;
};



/*
mutation useEditNotificationPreferencesMutation(
  $input: updateNotificationPreferencesMutationInput!
) {
  updateNotificationPreferences(input: $input) {
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
    "concreteType": "updateNotificationPreferencesMutationPayload",
    "kind": "LinkedField",
    "name": "updateNotificationPreferences",
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
    "name": "useEditNotificationPreferencesMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useEditNotificationPreferencesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8e045f8ecea20e507b87e6c0e9456a6a",
    "id": null,
    "metadata": {},
    "name": "useEditNotificationPreferencesMutation",
    "operationKind": "mutation",
    "text": "mutation useEditNotificationPreferencesMutation(\n  $input: updateNotificationPreferencesMutationInput!\n) {\n  updateNotificationPreferences(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();
(node as any).hash = '4796a39f28e7655ed5eeaabfa43b012c';
export default node;
