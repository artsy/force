/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type consignRoutes_thankYouQueryVariables = {
    id: string;
};
export type consignRoutes_thankYouQueryResponse = {
    readonly submission: {
        readonly " $fragmentRefs": FragmentRefs<"ThankYou_submission">;
    } | null;
};
export type consignRoutes_thankYouQuery = {
    readonly response: consignRoutes_thankYouQueryResponse;
    readonly variables: consignRoutes_thankYouQueryVariables;
};



/*
query consignRoutes_thankYouQuery(
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
    "name": "consignRoutes_thankYouQuery",
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
    "name": "consignRoutes_thankYouQuery",
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
    "cacheID": "9c05c74ea6ce8693cbe4ba45aa8dc550",
    "id": null,
    "metadata": {},
    "name": "consignRoutes_thankYouQuery",
    "operationKind": "query",
    "text": "query consignRoutes_thankYouQuery(\n  $id: ID!\n) {\n  submission(id: $id) {\n    ...ThankYou_submission\n    id\n  }\n}\n\nfragment ThankYou_submission on ConsignmentSubmission {\n  userEmail\n}\n"
  }
};
})();
(node as any).hash = 'ab797b5b655fbe2ba27d6f9943a23cfe';
export default node;
