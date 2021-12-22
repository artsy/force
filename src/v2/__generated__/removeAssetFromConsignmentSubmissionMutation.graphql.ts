/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RemoveAssetFromConsignmentSubmissionInput = {
    assetType?: string | null;
    clientMutationId?: string | null;
    filename?: string | null;
    geminiToken: string;
    sessionID?: string | null;
    size?: string | null;
    submissionID: string;
};
export type removeAssetFromConsignmentSubmissionMutationVariables = {
    input: RemoveAssetFromConsignmentSubmissionInput;
};
export type removeAssetFromConsignmentSubmissionMutationResponse = {
    readonly removeAssetFromConsignmentSubmission: {
        readonly asset: {
            readonly submissionID: string | null;
        } | null;
    } | null;
};
export type removeAssetFromConsignmentSubmissionMutation = {
    readonly response: removeAssetFromConsignmentSubmissionMutationResponse;
    readonly variables: removeAssetFromConsignmentSubmissionMutationVariables;
};



/*
mutation removeAssetFromConsignmentSubmissionMutation(
  $input: RemoveAssetFromConsignmentSubmissionInput!
) {
  removeAssetFromConsignmentSubmission(input: $input) {
    asset {
      submissionID
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
    "name": "input",
    "type": "RemoveAssetFromConsignmentSubmissionInput!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "submissionID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "removeAssetFromConsignmentSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveAssetFromConsignmentSubmissionPayload",
        "kind": "LinkedField",
        "name": "removeAssetFromConsignmentSubmission",
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
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "removeAssetFromConsignmentSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveAssetFromConsignmentSubmissionPayload",
        "kind": "LinkedField",
        "name": "removeAssetFromConsignmentSubmission",
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
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "removeAssetFromConsignmentSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation removeAssetFromConsignmentSubmissionMutation(\n  $input: RemoveAssetFromConsignmentSubmissionInput!\n) {\n  removeAssetFromConsignmentSubmission(input: $input) {\n    asset {\n      submissionID\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '50e3ef2df2d3259bba7146897b6984b9';
export default node;
