/**
 * @generated SignedSource<<24ce69c9a9da895e08330f26d66ca4de>>
 * @relayHash 53b49286981715cbc6bbd45a3f554854
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 53b49286981715cbc6bbd45a3f554854

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddAssetToConsignmentSubmissionInput = {
  assetType?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  externalSubmissionId?: string | null | undefined;
  filename?: string | null | undefined;
  geminiToken?: string | null | undefined;
  sessionID?: string | null | undefined;
  size?: string | null | undefined;
  source?: UploadSource | null | undefined;
  submissionID?: string | null | undefined;
};
export type UploadSource = {
  bucket?: string | null | undefined;
  key?: string | null | undefined;
};
export type addAssetToConsignmentMutation$variables = {
  input: AddAssetToConsignmentSubmissionInput;
};
export type addAssetToConsignmentMutation$data = {
  readonly addAssetToConsignmentSubmission: {
    readonly asset: {
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type addAssetToConsignmentMutation = {
  response: addAssetToConsignmentMutation$data;
  variables: addAssetToConsignmentMutation$variables;
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
    "id": "53b49286981715cbc6bbd45a3f554854",
    "metadata": {},
    "name": "addAssetToConsignmentMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "aea8b17459481b03abe5183958a36ad0";

export default node;
