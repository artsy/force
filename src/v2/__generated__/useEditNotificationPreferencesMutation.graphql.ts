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
    channel: string;
    id: string;
    name: string;
    status: SubGroupStatus;
};
export type useEditNotificationPreferencesMutationVariables = {
    input: updateNotificationPreferencesMutationInput;
};
export type useEditNotificationPreferencesMutationResponse = {
    readonly updateNotificationPreferences: {
        readonly notificationPreferences: ReadonlyArray<{
            readonly id: string;
            readonly name: string;
            readonly channel: string;
            readonly status: SubGroupStatus;
        }>;
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
    notificationPreferences {
      id
      name
      channel
      status
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
        "concreteType": "NotificationPreference",
        "kind": "LinkedField",
        "name": "notificationPreferences",
        "plural": true,
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "channel",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          }
        ],
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
    "cacheID": "05796965738e62feb0ef874b03da06fa",
    "id": null,
    "metadata": {},
    "name": "useEditNotificationPreferencesMutation",
    "operationKind": "mutation",
    "text": "mutation useEditNotificationPreferencesMutation(\n  $input: updateNotificationPreferencesMutationInput!\n) {\n  updateNotificationPreferences(input: $input) {\n    notificationPreferences {\n      id\n      name\n      channel\n      status\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8c71aa73bdbe0de2fb1536c56e536690';
export default node;
