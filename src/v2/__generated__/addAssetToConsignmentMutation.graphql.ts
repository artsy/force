/**
 * @generated SignedSource<<703956abb96be8e5a2b0fab5dd375038>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddAssetToConsignmentSubmissionInput = {
  assetType?: string | null;
  clientMutationId?: string | null;
  filename?: string | null;
  geminiToken: string;
  sessionID?: string | null;
  size?: string | null;
  submissionID: string;
};
export type addAssetToConsignmentMutation$variables = {
  input: AddAssetToConsignmentSubmissionInput;
};
export type addAssetToConsignmentMutation$data = {
  readonly addAssetToConsignmentSubmission: {
    readonly asset: {
      readonly id: string;
    } | null;
  } | null;
};
export type addAssetToConsignmentMutation = {
  variables: addAssetToConsignmentMutation$variables;
  response: addAssetToConsignmentMutation$data;
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
    "concreteType": "AddAssetToConsignmentSubmissionPayload",
    "kind": "LinkedField",
    "name": "addAssetToConsignmentSubmission",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ConsignmentSubmissionCategoryAsset",
        "kind": "LinkedField",
        "name": "asset",
        "plural": false,
        "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "addAssetToConsignmentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "addAssetToConsignmentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "53b49286981715cbc6bbd45a3f554854",
    "id": null,
    "metadata": {},
    "name": "addAssetToConsignmentMutation",
    "operationKind": "mutation",
    "text": "mutation addAssetToConsignmentMutation(\n  $input: AddAssetToConsignmentSubmissionInput!\n) {\n  addAssetToConsignmentSubmission(input: $input) {\n    asset {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aea8b17459481b03abe5183958a36ad0";

export default node;
