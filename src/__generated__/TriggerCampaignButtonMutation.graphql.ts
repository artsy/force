/**
 * @generated SignedSource<<6078e0f19be00b63742fee114f0849f6>>
 * @relayHash c6b918273677e3f4546257933d9b36ef
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c6b918273677e3f4546257933d9b36ef

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TriggerCampaignID = "ART_QUIZ" | "%future added value";
export type TriggerCampaignInput = {
  campaignID: TriggerCampaignID;
  clientMutationId?: string | null | undefined;
};
export type TriggerCampaignButtonMutation$variables = {
  input: TriggerCampaignInput;
};
export type TriggerCampaignButtonMutation$data = {
  readonly triggerCampaign: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type TriggerCampaignButtonMutation = {
  response: TriggerCampaignButtonMutation$data;
  variables: TriggerCampaignButtonMutation$variables;
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
    "concreteType": "TriggerCampaignPayload",
    "kind": "LinkedField",
    "name": "triggerCampaign",
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
    "name": "TriggerCampaignButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TriggerCampaignButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "c6b918273677e3f4546257933d9b36ef",
    "metadata": {},
    "name": "TriggerCampaignButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "d7069f6607d547baf215ec804b14d9bd";

export default node;
