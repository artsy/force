/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AddAssetToConsignmentSubmissionInput = {
    assetType?: string | null | undefined;
    clientMutationId?: string | null | undefined;
    externalSubmissionId?: string | null | undefined;
    filename?: string | null | undefined;
    geminiToken: string;
    sessionID?: string | null | undefined;
    size?: string | null | undefined;
    submissionID?: string | null | undefined;
};
export type addAssetToConsignmentMutationVariables = {
    input: AddAssetToConsignmentSubmissionInput;
};
export type addAssetToConsignmentMutationResponse = {
    readonly addAssetToConsignmentSubmission: {
        readonly asset: {
            readonly id: string;
        } | null;
    } | null;
};
export type addAssetToConsignmentMutation = {
    readonly response: addAssetToConsignmentMutationResponse;
    readonly variables: addAssetToConsignmentMutationVariables;
};



/*
mutation addAssetToConsignmentMutation(
  $input: AddAssetToConsignmentSubmissionInput!
) {
  addAssetToConsignmentSubmission(input: $input) {
    asset {
      id
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
(node as any).hash = 'aea8b17459481b03abe5183958a36ad0';
export default node;
