/**
 * @generated SignedSource<<91947e3600ad727b2f41138802f5d151>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RequestConditionReportInput = {
  clientMutationId?: string | null | undefined;
  saleArtworkID: string;
};
export type RequestConditionReportMutation$variables = {
  input: RequestConditionReportInput;
};
export type RequestConditionReportMutation$data = {
  readonly requestConditionReport: {
    readonly conditionReportRequest: {
      readonly internalID: string;
    };
  } | null | undefined;
};
export type RequestConditionReportMutation = {
  response: RequestConditionReportMutation$data;
  variables: RequestConditionReportMutation$variables;
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
    "concreteType": "RequestConditionReportPayload",
    "kind": "LinkedField",
    "name": "requestConditionReport",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ConditionReportRequest",
        "kind": "LinkedField",
        "name": "conditionReportRequest",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
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
    "name": "RequestConditionReportMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RequestConditionReportMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6f7779c4698ec556295c193d58013649",
    "id": null,
    "metadata": {},
    "name": "RequestConditionReportMutation",
    "operationKind": "mutation",
    "text": "mutation RequestConditionReportMutation(\n  $input: RequestConditionReportInput!\n) {\n  requestConditionReport(input: $input) {\n    conditionReportRequest {\n      internalID\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "99b29530296311d1183354c3082e3055";

export default node;
