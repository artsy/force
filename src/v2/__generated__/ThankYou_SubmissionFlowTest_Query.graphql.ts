/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ThankYou_SubmissionFlowTest_QueryVariables = {
    id: string;
};
export type ThankYou_SubmissionFlowTest_QueryResponse = {
    readonly submission: {
        readonly " $fragmentRefs": FragmentRefs<"ThankYou_submission">;
    } | null;
};
export type ThankYou_SubmissionFlowTest_Query = {
    readonly response: ThankYou_SubmissionFlowTest_QueryResponse;
    readonly variables: ThankYou_SubmissionFlowTest_QueryVariables;
};



/*
query ThankYou_SubmissionFlowTest_Query(
  $id: ID!
) {
  submission(id: $id) {
    ...ThankYou_submission
    id
  }
}

fragment ThankYou_submission on ConsignmentSubmission {
  userEmail
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ThankYou_SubmissionFlowTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ThankYou_submission"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ThankYou_SubmissionFlowTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "userEmail",
            "storageKey": null
          },
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
    ]
  },
  "params": {
    "cacheID": "5afa45d0d92b831ca967657578b03215",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "submission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConsignmentSubmission"
        },
        "submission.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "submission.userEmail": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "ThankYou_SubmissionFlowTest_Query",
    "operationKind": "query",
    "text": "query ThankYou_SubmissionFlowTest_Query(\n  $id: ID!\n) {\n  submission(id: $id) {\n    ...ThankYou_submission\n    id\n  }\n}\n\nfragment ThankYou_submission on ConsignmentSubmission {\n  userEmail\n}\n"
  }
};
})();
(node as any).hash = '9cf66a86658ac2f8fe8738f4130dd240';
export default node;
