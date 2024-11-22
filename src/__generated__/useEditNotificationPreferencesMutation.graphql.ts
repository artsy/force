/**
 * @generated SignedSource<<af58af450e4ad425cfb571ec6e5e1740>>
 * @relayHash 8e045f8ecea20e507b87e6c0e9456a6a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8e045f8ecea20e507b87e6c0e9456a6a

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SubGroupInputStatus = "SUBSCRIBED" | "UNSUBSCRIBED" | "%future added value";
export type updateNotificationPreferencesMutationInput = {
  authenticationToken?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  subscriptionGroups: ReadonlyArray<NotificationPreferenceInput>;
};
export type NotificationPreferenceInput = {
  channel?: string | null | undefined;
  name: string;
  status: SubGroupInputStatus;
};
export type useEditNotificationPreferencesMutation$variables = {
  input: updateNotificationPreferencesMutationInput;
};
export type useEditNotificationPreferencesMutation$data = {
  readonly updateNotificationPreferences: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type useEditNotificationPreferencesMutation = {
  response: useEditNotificationPreferencesMutation$data;
  variables: useEditNotificationPreferencesMutation$variables;
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
    "id": "8e045f8ecea20e507b87e6c0e9456a6a",
    "metadata": {},
    "name": "useEditNotificationPreferencesMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "4796a39f28e7655ed5eeaabfa43b012c";

export default node;
